// Services page ka 3D scene (har service ka apna prop: rings, heart, ring light, party, film, drone, album).
// three.js r128 CDN se load hota hai, taaki project ke "three" version se kuch na tootein.

const THREE_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
const ENV_SRC = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/environments/RoomEnvironment.js'

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const old = document.querySelector(`script[data-svp="${src}"]`)
    if (old) {
      if (old.dataset.ready) return resolve()
      old.addEventListener('load', resolve)
      old.addEventListener('error', reject)
      return
    }
    const s = document.createElement('script')
    s.src = src
    s.async = false
    s.dataset.svp = src
    s.onload = () => { s.dataset.ready = '1'; resolve() }
    s.onerror = reject
    document.head.appendChild(s)
  })
}

export async function loadThree() {
  if (!window.THREE) await loadScript(THREE_SRC)
  if (!window.THREE.RoomEnvironment) await loadScript(ENV_SRC)
}

/**
 * canvas: <canvas> element
 * shared: { d: current section dataset, sp: scroll progress, cur: [[r,g,b] x3] }
 * returns: dispose function
 */
export function startScene(canvas, shared) {
  const THREE = window.THREE
  let raf = 0
  let dead = false
  const offs = []
  let R, S

  try {
    R = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    R.setPixelRatio(Math.min(devicePixelRatio, 2))
    R.toneMapping = THREE.ACESFilmicToneMapping
    R.toneMappingExposure = 1.1
    R.outputEncoding = THREE.sRGBEncoding
    S = new THREE.Scene()
    const C = new THREE.PerspectiveCamera(45, 1, .1, 100)
    C.position.z = 7
    if (THREE.RoomEnvironment) {
      const pm = new THREE.PMREMGenerator(R)
      S.environment = pm.fromScene(new THREE.RoomEnvironment()).texture
      pm.dispose()
    }
    S.add(new THREE.AmbientLight(0xffffff, .4))
    const k1 = new THREE.DirectionalLight(0xffffff, .8); k1.position.set(3, 5, 6); S.add(k1)
    const L1 = new THREE.DirectionalLight(0xff6a3d, 1.3)
    const L2 = new THREE.DirectionalLight(0x7b2ff7, 1.3)
    L1.position.set(6, 2, 4); L2.position.set(-6, -1, 4); S.add(L1, L2)
    const PI2 = Math.PI / 2
    const DS = THREE.DoubleSide

    function MS(c, r, m, o) { const p = { color: c, roughness: r, metalness: m }; for (const k in o) p[k] = o[k]; return new THREE.MeshStandardMaterial(p) }
    function MP(c, o) { const p = { color: c, roughness: .2, clearcoat: 1 }; for (const k in o) p[k] = o[k]; return new THREE.MeshPhysicalMaterial(p) }
    const gold = MS(0xd9a521, .22, 1)
    const dark = MS(0x1b1a1e, .45, .3)
    const chr = MS(0xdadde6, .2, 1)
    const rub = MS(0x101114, .9, 0)
    const acc = MS(0xff5d8f, .3, .3, { emissive: 0xff5d8f, emissiveIntensity: .5, side: DS })
    const stg = new THREE.Group(); S.add(stg)
    const props = {}
    function mk(n, s) { const g = new THREE.Group(); g.scale.setScalar(.0001); g.userData.s = s; stg.add(g); props[n] = g; return g }
    function add(g, geo, m, x, y, z) { const o = new THREE.Mesh(geo, m); o.position.set(x || 0, y || 0, z || 0); g.add(o); return o }
    function cyl(g, r, l, m, z, open) { const o = add(g, new THREE.CylinderGeometry(r, r, l, 64, 1, !!open), m, 0, 0, z); o.rotation.x = PI2; return o }
    function RB(w, h, d, r, bv) {
      const iw = w - 2 * bv, ih = h - 2 * bv, x = -iw / 2, y = -ih / 2, s = new THREE.Shape()
      s.moveTo(x + r, y); s.lineTo(x + iw - r, y); s.quadraticCurveTo(x + iw, y, x + iw, y + r); s.lineTo(x + iw, y + ih - r)
      s.quadraticCurveTo(x + iw, y + ih, x + iw - r, y + ih); s.lineTo(x + r, y + ih); s.quadraticCurveTo(x, y + ih, x, y + ih - r)
      s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y)
      const dp = d - 2 * bv
      const g = new THREE.ExtrudeGeometry(s, { depth: dp, bevelEnabled: true, bevelThickness: bv, bevelSize: bv, bevelSegments: 4, curveSegments: 10 })
      g.translate(0, 0, -dp / 2)
      return g
    }
    function gTex(c1, c2) {
      const cv = document.createElement('canvas'); cv.width = cv.height = 64
      const x = cv.getContext('2d'), gr = x.createLinearGradient(0, 0, 64, 64)
      gr.addColorStop(0, c1); gr.addColorStop(1, c2); x.fillStyle = gr; x.fillRect(0, 0, 64, 64)
      const t = new THREE.CanvasTexture(cv); t.encoding = THREE.sRGBEncoding
      return t
    }

    // ---- camera ----
    const cm = mk('cam', 1), rig = new THREE.Group()
    rig.scale.setScalar(.72); rig.position.set(0, -.3, -1.28); cm.add(rig)
    add(rig, RB(3.4, 2.2, 1.6, .24, .07), dark)
    const hs2 = new THREE.Shape()
    hs2.moveTo(.6, 0); hs2.lineTo(.32, .74); hs2.lineTo(-.42, .74); hs2.lineTo(-.68, .3); hs2.lineTo(-.68, 0)
    const hg = new THREE.ExtrudeGeometry(hs2, { depth: 1.2, bevelEnabled: true, bevelThickness: .05, bevelSize: .05, bevelSegments: 3 })
    hg.translate(0, 0, -.6); hg.rotateY(-PI2); add(rig, hg, MS(0x23252b, .38, .6), 0, 1.1, 0)
    add(rig, RB(.95, 2.2, .9, .3, .08), rub, -1.25, -.05, .82)
    add(rig, new THREE.CylinderGeometry(.3, .3, .22, 48), dark, 1.15, 1.2, .05)
    add(rig, new THREE.CylinderGeometry(.24, .24, .03, 48), chr, 1.15, 1.325, .05)
    cyl(rig, 1.02, .14, chr, .87); cyl(rig, .9, .4, dark, 1.15); cyl(rig, .98, 1, MS(0x0e0f12, .7, .1), 1.85)
    cyl(rig, 1, .03, chr, 1.34); cyl(rig, 1, .03, chr, 2.36)
    cyl(rig, .92, .3, dark, 2.51, 1); cyl(rig, .96, .55, MS(0x0e0f12, .7, .1), 2.93, 1); cyl(rig, .94, .07, acc, 3.24, 1)
    cyl(rig, .86, .55, dark, 3.48, 1); cyl(rig, .74, 1.3, MS(0x040405, .95, 0, { side: DS }), 3.05, 1)
    add(rig, new THREE.TorusGeometry(.8, .05, 16, 64), chr, 0, 0, 3.76)
    const dm = new THREE.SphereGeometry(2.2, 48, 16, 0, Math.PI * 2, 0, .343); dm.rotateX(PI2)
    add(rig, dm, MP(0x0b1630, { roughness: .03, transparent: true, opacity: .55, envMapIntensity: 2.5, side: DS, depthWrite: false }), 0, 0, 1.548)
    const dm2 = new THREE.SphereGeometry(1.4, 48, 16, 0, Math.PI * 2, 0, .4115); dm2.rotateX(PI2)
    const coM = MP(0x26165a, { metalness: .6, roughness: .08, envMapIntensity: 2, emissive: 0x8b5cf6, emissiveIntensity: .18 })
    add(rig, dm2, coM, 0, 0, 2.017)
    add(rig, new THREE.RingGeometry(.22, .56, 9, 1), dark, 0, 0, 3.15)
    add(rig, new THREE.CylinderGeometry(1.08, .9, .45, 64, 1, true), MS(0x0c0d10, .8, 0, { side: DS }), 0, 0, 3.98).rotation.x = PI2

    // ---- wedding rings ----
    const rings = mk('rings', 1.3)
    add(rings, new THREE.TorusGeometry(.62, .11, 32, 96), gold, -.3, 0, 0)
    add(rings, new THREE.TorusGeometry(.62, .11, 32, 96), gold, .3, 0, 0).rotation.x = PI2
    add(rings, new THREE.OctahedronGeometry(.15), MP(0xffffff, { roughness: .02, metalness: .1, emissive: 0xffffff, emissiveIntensity: .25 }), -.3, .78, 0)

    // ---- heart ----
    const heart = mk('heart', 1.5), hh = new THREE.Shape()
    hh.moveTo(.25, .25); hh.bezierCurveTo(.25, .25, .2, 0, 0, 0); hh.bezierCurveTo(-.3, 0, -.3, .35, -.3, .35)
    hh.bezierCurveTo(-.3, .55, -.15, .77, .25, .95); hh.bezierCurveTo(.65, .77, .8, .55, .8, .35)
    hh.bezierCurveTo(.8, .35, .8, 0, .5, 0); hh.bezierCurveTo(.35, 0, .25, .25, .25, .25)
    const hgm = new THREE.ExtrudeGeometry(hh, { depth: .3, bevelEnabled: true, bevelThickness: .1, bevelSize: .08, bevelSegments: 6 })
    hgm.translate(-.25, -.48, -.15)
    const rose = MP(0xe5566f, { roughness: .28 })
    add(heart, hgm, rose); add(heart, hgm, rose, 1, .9, -.3).scale.setScalar(.3); add(heart, hgm, rose, -1, -.5, .2).scale.setScalar(.22)

    // ---- ring light ----
    const rl = mk('ring', 1)
    add(rl, new THREE.TorusGeometry(.95, .1, 24, 96), MS(0xfff6e0, .4, 0, { emissive: 0xfff0cc, emissiveIntensity: 1.2 }), 0, .3, 0)
    add(rl, new THREE.CylinderGeometry(.04, .04, 1.8, 16), chr, 0, -.75, 0)
    add(rl, new THREE.CylinderGeometry(.5, .55, .06, 32), dark, 0, -1.65, 0)
    add(rl, new THREE.BoxGeometry(.42, .8, .06), dark, 0, .3, 0)
    add(rl, new THREE.CylinderGeometry(.07, .07, .08, 24), MS(0x0b1630, .1, .8), 0, .52, .05).rotation.x = PI2

    // ---- party ----
    const party = mk('party', 1), cf = []
    ;[[-.6, .5, 0xe5566f], [0, .85, 0xf0b429], [.6, .45, 0x4fb5a5]].forEach(function (b) {
      const s = add(party, new THREE.SphereGeometry(.42, 32, 24), MP(b[2], { roughness: .2 }), b[0], b[1], 0)
      s.scale.set(1, 1.22, 1)
      add(party, new THREE.CylinderGeometry(.008, .008, 1.3, 6), dark, b[0] * .7, b[1] - 1.1, 0)
    })
    const cmt = [0xe5566f, 0xf0b429, 0x4fb5a5, 0x7b8cde, 0xffffff].map(function (c) { return MS(c, .5, 0) })
    const cg = new THREE.BoxGeometry(.08, .02, .14)
    for (let i = 0; i < 45; i++) {
      const m = add(party, cg, cmt[i % 5], (Math.random() - .5) * 3.4, (Math.random() - .5) * 3.4, (Math.random() - .5) * 2)
      m.rotation.set(Math.random() * 6, Math.random() * 6, 0); cf.push(m)
    }

    // ---- clapperboard + reel ----
    const film = mk('film', 1.1), clap = new THREE.Group()
    clap.position.set(-.85, .45, 0); film.add(clap)
    add(film, new THREE.BoxGeometry(1.7, 1.1, .08), dark, 0, -.2, 0)
    add(film, new THREE.BoxGeometry(1.7, .26, .1), dark, 0, .34, 0)
    add(clap, new THREE.BoxGeometry(1.7, .26, .1), dark, .85, .13, 0)
    for (let j = 0; j < 5; j++) {
      const wm = MS(0xf7f3ee, .5, 0)
      add(film, new THREE.BoxGeometry(.18, .27, .11), wm, -.7 + j * .35, .34, 0)
      add(clap, new THREE.BoxGeometry(.18, .27, .11), wm, .32 + j * .35, .13, 0)
    }
    const rs = new THREE.Shape(); rs.absarc(0, 0, .62, 0, Math.PI * 2, false)
    for (let q2 = 0; q2 < 5; q2++) {
      const a2 = q2 / 5 * Math.PI * 2, hp = new THREE.Path()
      hp.absarc(Math.cos(a2) * .33, Math.sin(a2) * .33, .13, 0, Math.PI * 2, true); rs.holes.push(hp)
    }
    add(film, new THREE.ExtrudeGeometry(rs, { depth: .12, bevelEnabled: false, curveSegments: 32 }), MS(0x2a2c33, .35, .9), 1.5, -.1, -.06)

    // ---- drone ----
    const dr = mk('drone', 1.25), wh = MS(0xf2f2f4, .35, .1), rt = []
    add(dr, RB(1.1, .38, .9, .16, .05), wh)
    add(dr, new THREE.SphereGeometry(.42, 32, 16, 0, Math.PI * 2, 0, PI2), wh, 0, .18, 0).scale.set(1.1, .7, .9)
    ;[1, -1].forEach(function (s) { const a = add(dr, new THREE.BoxGeometry(1.9, .08, .13), dark, 0, .05, 0); a.rotation.y = s * Math.PI / 4 })
    ;[[.62, .62], [-.62, .62], [.62, -.62], [-.62, -.62]].forEach(function (p, i) {
      add(dr, new THREE.CylinderGeometry(.13, .13, .14, 24), dark, p[0], .1, p[1])
      const r = new THREE.Group(); r.position.set(p[0], .2, p[1])
      add(r, new THREE.BoxGeometry(1.1, .015, .09), MS(0x2a2c33, .5, .2))
      add(r, new THREE.BoxGeometry(1.1, .015, .09), MS(0x2a2c33, .5, .2)).rotation.y = PI2
      dr.add(r); rt.push(r)
      add(dr, new THREE.SphereGeometry(.045, 12, 8), new THREE.MeshBasicMaterial({ color: i < 2 ? 0x2ee6a6 : 0xff4d6d }), p[0] * 1.08, .02, p[1] * 1.08)
    })
    add(dr, new THREE.SphereGeometry(.22, 24, 16), dark, 0, -.3, .35)
    add(dr, new THREE.CylinderGeometry(.09, .09, .1, 24), MP(0x0b1630, { roughness: .05 }), 0, -.3, .55).rotation.x = PI2
    ;[[.3, .3], [-.3, .3], [.3, -.3], [-.3, -.3]].forEach(function (p) { add(dr, new THREE.CylinderGeometry(.02, .02, .32, 8), dark, p[0], -.28, p[1]) })

    // ---- album with page flip ----
    const al = mk('album', 1.25), cov = MS(0xefe4d2, .8, 0), pap = MS(0xfffdf8, .9, 0)
    const pt = [gTex('#f6c177', '#e8825a'), gTex('#a9c5e8', '#6f8fc9'), gTex('#f3a6a0', '#c2677a'), gTex('#b7dcc8', '#6aa58a')]
    function half(sx, k) {
      const g = new THREE.Group(); g.rotation.y = -sx * .35
      add(g, new THREE.BoxGeometry(1.1, 1.5, .06), cov, sx * .55, 0, -.03)
      add(g, new THREE.BoxGeometry(1, 1.4, .14), pap, sx * .55, 0, .07)
      add(g, new THREE.PlaneGeometry(.72, .52), new THREE.MeshBasicMaterial({ map: pt[k] }), sx * .55, .25, .145)
      add(g, new THREE.PlaneGeometry(.4, .3), new THREE.MeshBasicMaterial({ map: pt[k + 1] }), sx * .4, -.35, .145)
      al.add(g)
    }
    half(-1, 0); half(1, 2)
    const pf = new THREE.Group(); pf.position.z = .15; al.add(pf)
    add(pf, new THREE.PlaneGeometry(1, 1.4), new THREE.MeshStandardMaterial({ color: 0xfffdf8, roughness: .9, side: DS }), .5, 0, 0)
    add(pf, new THREE.PlaneGeometry(.7, .5), new THREE.MeshBasicMaterial({ map: pt[1], side: DS }), .5, .2, .004)

    // ---- soft floor shadow + orbiting polaroids ----
    const bc = document.createElement('canvas'); bc.width = bc.height = 128
    const bx = bc.getContext('2d'), bgr = bx.createRadialGradient(64, 64, 0, 64, 64, 64)
    bgr.addColorStop(0, 'rgba(40,30,70,.28)'); bgr.addColorStop(1, 'rgba(40,30,70,0)')
    bx.fillStyle = bgr; bx.fillRect(0, 0, 128, 128)
    add(stg, new THREE.PlaneGeometry(4, 4), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(bc), transparent: true, depthWrite: false }), 0, -1.65, 0).rotation.x = -PI2
    const pol = new THREE.Group(); S.add(pol)
    ;[['#f6c177', '#e8825a'], ['#f3a6a0', '#c2677a'], ['#a9c5e8', '#6f8fc9'], ['#b7dcc8', '#6aa58a'], ['#e6d3a8', '#b8913f'], ['#cfc4e8', '#8f7bc4']].forEach(function (c, i) {
      const g = new THREE.Group()
      g.add(new THREE.Mesh(new THREE.PlaneGeometry(.95, 1.15), new THREE.MeshBasicMaterial({ color: 0xfffdf8, side: DS })))
      const im = new THREE.Mesh(new THREE.PlaneGeometry(.8, .8), new THREE.MeshBasicMaterial({ map: gTex(c[0], c[1]), side: DS }))
      im.position.set(0, .1, .004); g.add(im)
      const a = i / 6 * Math.PI * 2
      g.position.set(Math.cos(a) * 4.7, Math.sin(i * 2.3) * 1.7, Math.sin(a) * 4.7)
      g.lookAt(0, g.position.y, 0); g.rotation.z += i % 2 ? .12 : -.12; pol.add(g)
    })

    // ---- mouse + resize ----
    let mx = 0, my = 0
    const onMouse = e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5 }
    addEventListener('mousemove', onMouse); offs.push(() => removeEventListener('mousemove', onMouse))
    const onResize = () => { R.setSize(innerWidth, innerHeight, false); C.aspect = innerWidth / innerHeight; C.updateProjectionMatrix() }
    onResize(); addEventListener('resize', onResize); offs.push(() => removeEventListener('resize', onResize))

    const clk = new THREE.Clock()
    const c0 = new THREE.Color(), c1 = new THREE.Color(), c2 = new THREE.Color()

    const loop = () => {
      if (dead) return
      raf = requestAnimationFrame(loop)
      const t = clk.getElapsedTime()
      const sp = shared.sp, d = shared.d, key = d.prop || 'cam', cur = shared.cur
      c0.setRGB(cur[0][0] / 255, cur[0][1] / 255, cur[0][2] / 255)
      c1.setRGB(cur[1][0] / 255, cur[1][1] / 255, cur[1][2] / 255)
      c2.setRGB(cur[2][0] / 255, cur[2][1] / 255, cur[2][2] / 255)
      L1.color.copy(c0); L2.color.copy(c2); acc.color.copy(c1); acc.emissive.copy(c1); coM.emissive.copy(c2)

      const wide = innerWidth > 700
      const tx = wide ? +(d.cx || 0) : 0
      const ty = wide ? +(d.cy || .2) : 1.9
      const sc = wide ? +(d.cs || .75) : .5
      const tz = wide ? +(d.cz || -1.5) : -1.5
      stg.position.x += (tx - stg.position.x) * .05
      stg.position.y += ((ty + Math.sin(t * 1.2) * .1) - stg.position.y) * .05
      stg.position.z += (tz - stg.position.z) * .05
      stg.scale.setScalar(stg.scale.x + (sc - stg.scale.x) * .05)
      const ry = tx > 0 ? -.5 : tx < 0 ? .5 : Math.sin(t * .5) * .3

      for (const n in props) {
        const g = props[n], ts = (n === key ? 1 : .0001) * g.userData.s
        g.scale.setScalar(g.scale.x + (ts - g.scale.x) * .08); g.visible = g.scale.x > .01
      }
      cm.rotation.y += ((ry + mx * .5 + Math.sin(sp * Math.PI * 6) * .2) - cm.rotation.y) * .06
      cm.rotation.x = my * .3 + .06
      rings.rotation.y = t * .7; rings.rotation.z = .35 + Math.sin(t) * .1
      heart.rotation.y = Math.sin(t * .9) * .8 + ry * .3; heart.rotation.z = Math.sin(t * 1.3) * .06
      rl.rotation.y = ry + mx * .4 + Math.sin(t * .6) * .25
      party.rotation.y = t * .25
      cf.forEach(function (m, i) { m.rotation.x += .03 + i % 3 * .01; m.rotation.y += .04; m.position.y -= .004; if (m.position.y < -1.7) m.position.y = 1.8 })
      film.rotation.y = ry * .8 + mx * .4 + Math.sin(t * .5) * .2; clap.rotation.z = Math.max(0, Math.sin(t * 2.4)) * .55
      rt.forEach(function (r) { r.rotation.y += .9 })
      dr.rotation.y = ry + mx * .5 + Math.sin(t * .5) * .3; dr.rotation.x = .15 + Math.cos(t * .8) * .05; dr.rotation.z = Math.sin(t) * .08; dr.position.y = Math.sin(t * 1.6) * .12
      al.rotation.y = ry * .6 + mx * .4; al.rotation.x = -.15 + my * .2
      pf.rotation.y = -(.35 + (Math.PI - .7) * (.5 + .5 * Math.sin(t * 1.1)))
      pol.position.copy(stg.position); pol.rotation.y = t * .12 + sp * 4
      R.render(S, C)
    }
    loop()
  } catch (e) {
    console.log('WebGL unavailable', e)
  }

  return () => {
    dead = true
    cancelAnimationFrame(raf)
    offs.forEach(f => f())
    try {
      S && S.traverse(o => {
        if (o.geometry) o.geometry.dispose()
        if (o.material) [].concat(o.material).forEach(m => { if (m.map) m.map.dispose(); m.dispose() })
      })
      R && R.dispose()
    } catch (e) { /* ignore */ }
  }
}