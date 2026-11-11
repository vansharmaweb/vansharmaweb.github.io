import * as THREE from 'three/webgpu'

export function createProjectSlideTexture(project, slideIndex = 0)
{
    const slide = project.slides?.[slideIndex] || project.slides?.[0] || {
        badge: 'VANSH SHARMA // PROJECT',
        headline: project.title,
        summary: 'Engineered by Vansh Sharma',
        bullets: [],
        tags: []
    }

    const canvas = document.createElement('canvas')
    canvas.width = 960
    canvas.height = 540
    const ctx = canvas.getContext('2d')
    const accent = project.accent || '#ffb800'

    // Background gradient
    const bg = ctx.createLinearGradient(0, 0, 960, 540)
    bg.addColorStop(0, '#14111c')
    bg.addColorStop(1, '#241b35')
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, 960, 540)

    // Subtle grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
    ctx.lineWidth = 1
    for(let x = 0; x < 960; x += 48)
    {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, 540)
        ctx.stroke()
    }
    for(let y = 0; y < 540; y += 48)
    {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(960, y)
        ctx.stroke()
    }

    // Outer frame
    ctx.strokeStyle = accent
    ctx.lineWidth = 8
    ctx.strokeRect(16, 16, 928, 508)

    // Top bar
    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)'
    ctx.fillRect(20, 20, 920, 58)
    ctx.fillStyle = accent
    ctx.font = 'bold 20px monospace'
    ctx.fillText(slide.badge, 44, 56)

    // Slide pill top-right
    ctx.fillStyle = '#94a3b8'
    ctx.font = 'bold 18px monospace'
    ctx.textAlign = 'right'
    ctx.fillText(`SLIDE ${slideIndex + 1}/${project.images.length}`, 912, 56)
    ctx.textAlign = 'left'

    // Headline
    ctx.fillStyle = '#ffffff'
    ctx.font = '900 48px Nunito, sans-serif'
    ctx.fillText(slide.headline, 44, 144, 872)

    // Summary wrapped
    ctx.fillStyle = '#cbd5e1'
    ctx.font = '600 24px Nunito, sans-serif'
    wrapText(ctx, slide.summary, 44, 194, 860, 34)

    // Highlights
    let bulletY = 286
    ctx.font = '600 21px Nunito, sans-serif'
    for(const bullet of (slide.bullets || []).slice(0, 3))
    {
        ctx.fillStyle = accent
        ctx.fillText('▸', 44, bulletY)
        ctx.fillStyle = '#f8fafc'
        ctx.fillText(bullet, 74, bulletY, 830)
        bulletY += 38
    }

    // Stack tags at bottom
    let tagX = 44
    ctx.font = 'bold 19px monospace'
    for(const tag of (slide.tags || []).slice(0, 5))
    {
        const w = ctx.measureText(tag).width + 30
        ctx.fillStyle = 'rgba(255, 255, 255, 0.09)'
        ctx.fillRect(tagX, 442, w, 44)
        ctx.strokeStyle = accent
        ctx.lineWidth = 2
        ctx.strokeRect(tagX, 442, w, 44)
        ctx.fillStyle = '#ffffff'
        ctx.fillText(tag, tagX + 15, 471)
        tagX += w + 14
    }

    const texture = new THREE.Texture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.flipY = false
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.generateMipmaps = false
    texture.needsUpdate = true
    return texture
}

export function createLabCardTexture(item, isMini = false)
{
    const canvas = document.createElement('canvas')
    canvas.width = isMini ? 320 : 960
    canvas.height = isMini ? 180 : 540
    const ctx = canvas.getContext('2d')
    const scale = isMini ? 1 / 3 : 1
    ctx.scale(scale, scale)

    const accent = item.accent || '#38bdf8'
    ctx.fillStyle = '#15121e'
    ctx.fillRect(0, 0, 960, 540)

    ctx.strokeStyle = accent
    ctx.lineWidth = 10
    ctx.strokeRect(18, 18, 924, 504)

    ctx.fillStyle = accent
    ctx.font = 'bold 22px monospace'
    ctx.fillText('// VANSH SYSTEMS & AI LAB', 48, 72)

    ctx.fillStyle = '#ffffff'
    ctx.font = '900 54px Nunito, sans-serif'
    ctx.fillText(item.title, 48, 165, 860)

    ctx.fillStyle = '#cbd5e1'
    ctx.font = '600 28px Nunito, sans-serif'
    wrapText(ctx, item.summary || '', 48, 236, 860, 40)

    let tagX = 48
    ctx.font = 'bold 22px monospace'
    for(const tag of (item.tags || []).slice(0, 4))
    {
        const w = ctx.measureText(tag).width + 34
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
        ctx.fillRect(tagX, 424, w, 52)
        ctx.strokeStyle = accent
        ctx.lineWidth = 3
        ctx.strokeRect(tagX, 424, w, 52)
        ctx.fillStyle = '#ffffff'
        ctx.fillText(tag, tagX + 17, 457)
        tagX += w + 16
    }

    const texture = new THREE.Texture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.flipY = false
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.generateMipmaps = false
    texture.needsUpdate = true
    return texture
}

export function createCareerStoneTexture(title, subtitle)
{
    // CareerArea.js shader reads R channel for lit accent text and G channel for dark mask edge
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 128
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, 512, 128)

    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Subtle dark border mask via green channel
    ctx.strokeStyle = 'rgb(0, 255, 0)'
    ctx.lineWidth = 8
    ctx.font = '900 44px Nunito, sans-serif'
    ctx.strokeText(title, 256, 48, 480)

    // Main bright text via red channel
    ctx.fillStyle = 'rgb(255, 255, 0)'
    ctx.fillText(title, 256, 48, 480)

    ctx.font = '700 24px Nunito, sans-serif'
    ctx.fillStyle = 'rgb(255, 255, 0)'
    ctx.fillText(subtitle, 256, 94, 480)

    const texture = new THREE.Texture(canvas)
    texture.flipY = false
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.generateMipmaps = false
    texture.wrapS = THREE.ClampToEdgeWrapping
    texture.wrapT = THREE.ClampToEdgeWrapping
    texture.needsUpdate = true
    return texture
}

export function createTimeMachineTexture(mode = 'legacy')
{
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 384
    const ctx = canvas.getContext('2d')

    if(mode === 'legacy')
    {
        ctx.fillStyle = '#050a15'
        ctx.fillRect(0, 0, 512, 384)
        ctx.strokeStyle = '#ffb800'
        ctx.lineWidth = 8
        ctx.strokeRect(12, 12, 488, 360)
        ctx.fillStyle = '#ffb800'
        ctx.font = 'bold 20px monospace'
        ctx.fillText('TIME MACHINE // v1.0 ARCHIVE', 36, 62)
        ctx.fillStyle = '#ffffff'
        ctx.font = '900 44px Nunito, sans-serif'
        ctx.fillText('Vansh Classic', 36, 150)
        ctx.fillStyle = '#94a3b8'
        ctx.font = '600 24px Nunito, sans-serif'
        ctx.fillText('Original HTML5 + Groq Portfolio', 36, 200)
        ctx.fillStyle = '#ffb800'
        ctx.fillRect(36, 260, 260, 54)
        ctx.fillStyle = '#050a15'
        ctx.font = 'bold 22px monospace'
        ctx.fillText('PRESS ENTER TO OPEN', 52, 294)
    }
    else
    {
        ctx.fillStyle = '#0f172a'
        ctx.fillRect(0, 0, 512, 384)
        ctx.strokeStyle = '#10b981'
        ctx.lineWidth = 8
        ctx.strokeRect(12, 12, 488, 360)
        ctx.fillStyle = '#10b981'
        ctx.font = 'bold 20px monospace'
        ctx.fillText('DIGITAL GARDEN // ARCHIVE', 36, 62)
        ctx.fillStyle = '#ffffff'
        ctx.font = '900 42px Nunito, sans-serif'
        ctx.fillText('Blog & Shelves', 36, 150)
        ctx.fillStyle = '#cbd5e1'
        ctx.font = '600 22px Nunito, sans-serif'
        ctx.fillText('Field notes & CS study tracks', 36, 200)
    }

    const texture = new THREE.Texture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.minFilter = THREE.NearestFilter
    texture.magFilter = THREE.NearestFilter
    texture.generateMipmaps = false
    texture.needsUpdate = true
    return texture
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight)
{
    const words = text.split(' ')
    let line = ''
    let curY = y
    for(const word of words)
    {
        const testLine = line + word + ' '
        if(ctx.measureText(testLine).width > maxWidth && line !== '')
        {
            ctx.fillText(line.trim(), x, curY)
            line = word + ' '
            curY += lineHeight
        }
        else
        {
            line = testLine
        }
    }
    if(line)
        ctx.fillText(line.trim(), x, curY)
}
