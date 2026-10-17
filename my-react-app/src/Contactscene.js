// Contact page ka 3D scene: envelope (flap khulta hai, letter upar uthta hai), polaroids, gold ring, sparkles.
// three.js ko servicesScene.js ka loadThree() load karta hai (r128, CDN), isliye project ka "three" version nahi tootega.
export function startContactScene(canvas) {
  const T = window.THREE
  let raf = 0, dead = false, R
  const offs = []
  try {
    R = new T.WebGLRenderer({ canvas, antialias: true, alpha: true })
    R.setPixelRatio(Math.min(devicePixelRatio, 2))
    const S = new T.Scene(), C = new T.PerspectiveCamera(45, 1, .1, 100)
    C.position.z = 8
    S.add(new T.AmbientLight(0xffffff, .65))
    const k = new T.DirectionalLight(0xffffff, .8); k.position.set(3, 5, 6); S.add(k)
    const L1 = new T.DirectionalLight(0xff8a5c, 1.1), L2 = new T.DirectionalLight(0x8b5cf6, 1.1)
    L1.position.set(6, 2, 4); L2.position.set(-6, -1, 4); S.add(L1, L2)
    const stage = new T.Group(); S.add(stage)
    const std = (c, r, m) => new T.MeshStandardMaterial({ color: c, roughness: r, metalness: m, side: T.DoubleSide })
    const tex = (a, b) => {
      const c = document.createElement('canvas'); c.width = c.height = 64
      const x = c.getContext('2d'), g = x.createLinearGradient(0, 0, 64, 64)
      g.addColorStop(0, a); g.addColorStop(1, b); x.fillStyle = g; x.fillRect(0, 0, 64, 64)
      return new T.CanvasTexture(c)
    }

    // envelope
    const env = new T.Group(); stage.add(env)
    env.add(new T.Mesh(new T.BoxGeometry(2.6, 1.7, .1), std(0xf3e6d0, .7, 0)))
    const pk = new T.Shape()
    pk.moveTo(-1.3, .85); pk.lineTo(0, -.1); pk.lineTo(1.3, .85); pk.lineTo(1.3, -.85); pk.lineTo(-1.3, -.85)
    const front = new T.Mesh(new T.ShapeGeometry(pk), std(0xe8d4b4, .75, 0)); front.position.z = .058; env.add(front)
    const lt = new T.Mesh(new T.PlaneGeometry(2.2, 1.3), new T.MeshBasicMaterial({ map: tex('#fff8ec', '#f3e6d0') }))
    lt.position.set(0, -.2, .053); env.add(lt)
    const ph = new T.Mesh(new T.PlaneGeometry(1.2, .7), new T.MeshBasicMaterial({ map: tex('#ff8a5c', '#8b5cf6') }))
    ph.position.set(0, .1, .001); lt.add(ph)
    const fl = new T.Group(); fl.position.set(0, .85, .07); env.add(fl)
    const fs = new T.Shape(); fs.moveTo(-1.3, 0); fs.lineTo(1.3, 0); fs.lineTo(0, -.95)
    fl.add(new T.Mesh(new T.ExtrudeGeometry(fs, { depth: .02, bevelEnabled: false }), std(0xd9a521, .3, .9)))
    const seal = new T.Mesh(new T.CylinderGeometry(.16, .16, .05, 32), std(0xff5d8f, .3, .3))
    seal.rotation.x = Math.PI / 2; seal.position.set(0, -.78, .05); fl.add(seal)

    // ring + sparkles
    const ring = new T.Mesh(new T.TorusGeometry(2.3, .025, 16, 120), std(0xd9a521, .25, 1)); ring.rotation.x = 1.2; stage.add(ring)
    const sg = new T.BufferGeometry(), sa = []
    for (let i = 0; i < 70; i++) sa.push((Math.random() - .5) * 8, (Math.random() - .5) * 5, (Math.random() - .5) * 5)
    sg.setAttribute('position', new T.Float32BufferAttribute(sa, 3))
    const sp = new T.Points(sg, new T.PointsMaterial({ color: 0xd9a521, size: .05, transparent: true, opacity: .7 })); stage.add(sp)

    // polaroids
    const pol = new T.Group(); stage.add(pol)
    ;[['#f6c177', '#e8825a'], ['#f3a6a0', '#c2677a'], ['#a9c5e8', '#6f8fc9'], ['#b7dcc8', '#6aa58a'], ['#cfc4e8', '#8f7bc4']].forEach((c, i) => {
      const g = new T.Group()
      g.add(new T.Mesh(new T.PlaneGeometry(.9, 1.1), new T.MeshBasicMaterial({ color: 0xfffdf8, side: T.DoubleSide })))
      const im = new T.Mesh(new T.PlaneGeometry(.76, .76), new T.MeshBasicMaterial({ map: tex(c[0], c[1]), side: T.DoubleSide }))
      im.position.set(0, .1, .004); g.add(im)
      g.userData.a = i / 5 * Math.PI * 2; pol.add(g)
    })

    let mx = 0, my = 0
    const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches
    const onMouse = e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5 }
    addEventListener('mousemove', onMouse); offs.push(() => removeEventListener('mousemove', onMouse))
    const size = () => {
      R.setSize(innerWidth, innerHeight, false); C.aspect = innerWidth / innerHeight; C.updateProjectionMatrix()
      const w = innerWidth > 860
      stage.position.set(w ? 3.1 : 0, w ? 0 : 2.5, 0); stage.scale.setScalar(w ? 1 : .6)
    }
    size(); addEventListener('resize', size); offs.push(() => removeEventListener('resize', size))

    const clk = new T.Clock()
    const loop = () => {
      if (dead) return
      raf = requestAnimationFrame(loop)
      const t = reduce ? 0 : clk.getElapsedTime()
      env.rotation.y += ((mx * .7 + Math.sin(t * .5) * .25) - env.rotation.y) * .06
      env.rotation.x += ((my * .35 - .1) - env.rotation.x) * .06
      env.position.y = Math.sin(t * 1.2) * .12
      const o = .5 + .5 * Math.sin(t * .9), r = Math.max(0, (o - .55) / .45)
      fl.rotation.x = .25 + o * 2.6
      lt.position.y = -.2 + r * r * .8
      ring.rotation.z = t * .3; sp.rotation.y = t * .05
      pol.children.forEach(g => {
        const a = g.userData.a + t * .35
        g.position.set(Math.cos(a) * 3.3, Math.sin(a * 2 + g.userData.a) * .9, Math.sin(a) * 3.3)
        g.lookAt(0, g.position.y, 0); g.rotation.z = .1
      })
      // scroll karne par scene halka fade ho jata hai (form padhne me dikkat na ho)
      canvas.style.opacity = Math.max(.15, 1 - scrollY / (innerHeight * .8))
      R.render(S, C)
    }
    loop()
  } catch (e) { console.log('WebGL unavailable', e) }

  return () => {
    dead = true
    cancelAnimationFrame(raf)
    offs.forEach(f => f())
    try { R && R.dispose() } catch (e) { /* ignore */ }
  }
}