import * as THREE from 'three/webgpu'

const text = `
██╗   ██╗ █████╗ ███╗   ██╗███████╗██╗  ██╗███████╗
██║   ██║██╔══██╗████╗  ██║██╔════╝██║  ██║██╔════╝
██║   ██║███████║██╔██╗ ██║███████╗███████║███████╗
╚██╗ ██╔╝██╔══██║██║╚██╗██║╚════██║██╔══██║╚════██║
 ╚████╔╝ ██║  ██║██║ ╚████║███████║██║  ██║███████║
  ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚══════╝

██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ 

╔═ Intro ═══════════════╗
║ Hey curious engineer! Welcome to Vansh Sharma's interactive 3D world.
║ Full-Stack & AI Systems Engineer · B.Tech CSE (AI/ML) @ PSIT Kanpur
╚═══════════════════════╝

╔═ Socials ═══════════════╗
║ Website   ⇒ https://vansharma.is-a.dev
║ Mail      ⇒ vansharmaweb@gmail.com
║ GitHub    ⇒ https://github.com/vansharmaweb
║ LinkedIn  ⇒ https://linkedin.com/in/vansharmaweb
║ Resume    ⇒ https://vansharma.is-a.dev/Vansh-Sharma.pdf
╚═══════════════════════╝

╔═ Debug ═══════════════╗
║ Add #debug at the end of the URL and reload to unlock Tweakpane.
║ Press [V] to toggle the free camera.
╚═══════════════════════╝

╔═ Tech Stack ══════════╗
║ Rendering ⇒ Three.js WebGPU + TSL (r${THREE.REVISION})
║ Physics   ⇒ Rapier3D WASM
║ Audio     ⇒ Howler.js (CC0 music by Kounine)
║ Template  ⇒ Built on Bruno Simon's MIT folio-2025 engine
╚═══════════════════════╝
`

let finalText = ''
const finalStyles = []
const stylesSet = {
    letter: 'color: #ffffff; font: 400 1em monospace;',
    pipe: 'color: #D66FFF; font: 400 1em monospace;',
}
let currentStyle = null
for(let i = 0; i < text.length; i++)
{
    const char = text[i]
    const style = char.match(/[╔║═╗╚╝]/) ? 'pipe' : 'letter'
    if(style !== currentStyle)
    {
        currentStyle = style
        finalText += '%c'
        finalStyles.push(stylesSet[currentStyle])
    }
    finalText += char
}

export default [
    finalText,
    ...finalStyles
]
