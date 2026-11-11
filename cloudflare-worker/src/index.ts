import { DurableObject } from 'cloudflare:workers';
import msgpack from 'msgpack-lite';

export interface Env {
  PORTFOLIO_HUB: DurableObjectNamespace<PortfolioHub>;
}

const MAX_WHISPERS = 30;
const DAY_MS = 24 * 60 * 60 * 1000;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.headers.get('Upgrade') === 'websocket') {
      const id = env.PORTFOLIO_HUB.idFromName('global-world');
      return env.PORTFOLIO_HUB.get(id).fetch(request);
    }

    return new Response(
      JSON.stringify({ ok: true, service: 'vansh-portfolio-hub', protocol: 'msgpack-ws' }),
      { headers: { 'content-type': 'application/json' } }
    );
  },
};

export class PortfolioHub extends DurableObject<Env> {
  private sql: SqlStorage;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.sql = ctx.storage.sql;

    this.sql.exec(`
      CREATE TABLE IF NOT EXISTS whispers (
        id TEXT PRIMARY KEY,
        message TEXT NOT NULL,
        countrycode TEXT NOT NULL,
        x REAL NOT NULL,
        y REAL NOT NULL,
        z REAL NOT NULL,
        updated_at INTEGER NOT NULL
      );
      CREATE TABLE IF NOT EXISTS circuit_scores (
        day_key INTEGER NOT NULL,
        uuid TEXT NOT NULL,
        tag TEXT NOT NULL,
        countrycode TEXT NOT NULL,
        duration INTEGER NOT NULL,
        PRIMARY KEY (day_key, uuid)
      );
      CREATE TABLE IF NOT EXISTS counters (
        key TEXT PRIMARY KEY,
        val INTEGER NOT NULL
      );
      INSERT OR IGNORE INTO counters (key, val) VALUES ('cookiesCount', 0);
      INSERT OR IGNORE INTO counters (key, val) VALUES ('cataclysmCount', 0);
    `);
  }

  async fetch(request: Request): Promise<Response> {
    if (request.headers.get('Upgrade') !== 'websocket') {
      return new Response('Expected WebSocket', { status: 426 });
    }

    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    this.ctx.acceptWebSocket(server);

    const initPayload = this.buildInitPayload();
    server.send(this.encode(initPayload));

    return new Response(null, { status: 101, webSocket: client });
  }

  async webSocketMessage(_ws: WebSocket, message: ArrayBuffer | string): Promise<void> {
    if (typeof message === 'string') return;
    let data: Record<string, unknown>;
    try {
      data = msgpack.decode(new Uint8Array(message)) as Record<string, unknown>;
    } catch {
      return;
    }

    const uuid = typeof data.uuid === 'string' ? data.uuid.slice(0, 64) : '';
    if (!uuid) return;

    switch (data.type) {
      case 'whispersInsert':
        this.handleWhisperInsert(uuid, data);
        break;
      case 'circuitInsert':
        this.handleCircuitInsert(uuid, data);
        break;
      case 'cookiesInsert':
        this.handleCookiesInsert(data);
        break;
      case 'cataclysmInsert':
        this.handleCataclysmInsert();
        break;
    }
  }

  private getCurrentDayResetAnchor(): number {
    const now = Date.now();
    return Math.floor(now / DAY_MS) * DAY_MS;
  }

  private buildInitPayload() {
    const whispers = this.sql
      .exec(
        'SELECT id, message, countrycode, x, y, z FROM whispers ORDER BY updated_at DESC LIMIT ?',
        MAX_WHISPERS
      )
      .toArray();

    const dayKey = this.getCurrentDayResetAnchor();
    const circuitLeaderboard = this.getLeaderboardTuples(dayKey);
    const cookiesCount = this.getCounter('cookiesCount');
    const cataclysmCount = this.getCounter('cataclysmCount');

    return {
      type: 'init',
      whispers,
      circuitResetTime: dayKey,
      circuitLeaderboard,
      cookiesCount,
      cataclysmCount,
      cataclysmProgress: (cataclysmCount % 100) / 100,
    };
  }

  private handleWhisperInsert(uuid: string, data: Record<string, unknown>): void {
    const rawMsg = typeof data.message === 'string' ? data.message.trim() : '';
    const cleanMsg = rawMsg.replace(/[<>]/g, '').slice(0, 30);
    if (!cleanMsg) return;

    const countrycode =
      typeof data.countryCode === 'string' ? data.countryCode.toLowerCase().slice(0, 4) : '';
    const x = clampCoord(Number(data.x));
    const y = clampCoord(Number(data.y), -10, 40);
    const z = clampCoord(Number(data.z));
    const now = Date.now();

    this.sql.exec(
      `INSERT INTO whispers (id, message, countrycode, x, y, z, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         message=excluded.message,
         countrycode=excluded.countrycode,
         x=excluded.x, y=excluded.y, z=excluded.z,
         updated_at=excluded.updated_at`,
      uuid,
      cleanMsg,
      countrycode,
      x,
      y,
      z,
      now
    );

    const extra = this.sql
      .exec(
        'SELECT id FROM whispers ORDER BY updated_at DESC LIMIT -1 OFFSET ?',
        MAX_WHISPERS
      )
      .toArray() as Array<{ id: string }>;

    if (extra.length > 0) {
      for (const row of extra) {
        this.sql.exec('DELETE FROM whispers WHERE id = ?', row.id);
      }
      this.broadcast({
        type: 'whispersDelete',
        whispers: extra.map((r) => ({ id: r.id })),
      });
    }

    this.broadcast({
      type: 'whispersInsert',
      whispers: [{ id: uuid, message: cleanMsg, countrycode, x, y, z }],
    });
  }

  private handleCircuitInsert(uuid: string, data: Record<string, unknown>): void {
    const rawTag = typeof data.tag === 'string' ? data.tag : '';
    const tag = rawTag.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 3);
    const duration = Math.round(Number(data.duration));
    if (tag.length !== 3 || !Number.isFinite(duration) || duration < 5000 || duration > 600000) {
      return;
    }

    const countrycode =
      typeof data.countryCode === 'string' ? data.countryCode.toLowerCase().slice(0, 4) : '';
    const dayKey = this.getCurrentDayResetAnchor();

    const existing = this.sql
      .exec('SELECT duration FROM circuit_scores WHERE day_key = ? AND uuid = ?', dayKey, uuid)
      .toArray() as Array<{ duration: number }>;

    if (existing.length === 0 || duration < existing[0].duration) {
      this.sql.exec(
        `INSERT INTO circuit_scores (day_key, uuid, tag, countrycode, duration)
         VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(day_key, uuid) DO UPDATE SET
           tag=excluded.tag,
           countrycode=excluded.countrycode,
           duration=excluded.duration`,
        dayKey,
        uuid,
        tag,
        countrycode,
        duration
      );
      this.broadcast({
        type: 'circuitUpdate',
        circuitLeaderboard: this.getLeaderboardTuples(dayKey),
      });
    }
  }

  private handleCookiesInsert(data: Record<string, unknown>): void {
    const inc = Math.min(25, Math.max(1, Math.floor(Number(data.amount) || 0)));
    const cookiesCount = this.incrementCounter('cookiesCount', inc);
    this.broadcast({ type: 'cookiesUpdate', cookiesCount });
  }

  private handleCataclysmInsert(): void {
    const cataclysmCount = this.incrementCounter('cataclysmCount', 1);
    this.broadcast({
      type: 'cataclysmUpdate',
      cataclysmCount,
      cataclysmProgress: (cataclysmCount % 100) / 100,
    });
  }

  private getLeaderboardTuples(dayKey: number): Array<[string, string, number]> {
    const rows = this.sql
      .exec(
        'SELECT tag, countrycode, duration FROM circuit_scores WHERE day_key = ? ORDER BY duration ASC LIMIT 10',
        dayKey
      )
      .toArray() as Array<{ tag: string; countrycode: string; duration: number }>;
    return rows.map((r) => [r.tag, r.countrycode, r.duration]);
  }

  private getCounter(key: string): number {
    const rows = this.sql
      .exec('SELECT val FROM counters WHERE key = ?', key)
      .toArray() as Array<{ val: number }>;
    return rows[0]?.val ?? 0;
  }

  private incrementCounter(key: string, amount: number): number {
    this.sql.exec('UPDATE counters SET val = val + ? WHERE key = ?', amount, key);
    return this.getCounter(key);
  }

  private broadcast(payload: unknown): void {
    const bin = this.encode(payload);
    for (const socket of this.ctx.getWebSockets()) {
      try {
        socket.send(bin);
      } catch {
        // Ignore closed socket
      }
    }
  }

  private encode(payload: unknown): Uint8Array {
    return msgpack.encode(payload);
  }
}

function clampCoord(val: number, min = -160, max = 160): number {
  if (!Number.isFinite(val)) return 0;
  return Math.max(min, Math.min(max, val));
}
