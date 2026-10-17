import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

// true karoge to camera body gradient colors me rangin ho jayegi (real-look ke liye false rakho)
const COLORED_BODY = false

// camera ke around float hone wali real images (public/images/ me)
const IMGS = [
  '/images/goldenphoto1.jpg',
  '/images/goldenphoto2.jpg',
  '/images/goldenphoto3.jpg',
  '/images/goldenphoto4.jpg',
  '/images/goldenphoto5.jpg',
  '/images/goldenphoto6.jpeg',
  '/images/goldenphoto7.jpg',
]

export default function Scene3D() {
  const ref = useRef(null)
  useEffect(() => {
    const cv = ref.current
    let raf = 0
    let cleanup = () => {}
    /* eslint-disable */
var P=[["#ff8a5c","#ff5d8f","#8b5cf6"],["#22b8e6","#4f7cff","#9b6bff"],["#1fcf9e","#1aa7e0","#6b7cff"],["#ffb020","#ff7a45","#f0467a"]];
var secs=[].slice.call(document.querySelectorAll('section'));
try{
var R=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true});
R.setPixelRatio(Math.min(devicePixelRatio,2));
R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.05;
if('outputColorSpace' in R)R.outputColorSpace=THREE.SRGBColorSpace;else R.outputEncoding=THREE.sRGBEncoding;
var S=new THREE.Scene(),C=new THREE.PerspectiveCamera(45,1,.1,100);C.position.z=7;
var U={t:{value:0},a:{value:new THREE.Color(P[0][0])},b:{value:new THREE.Color(P[0][1])},c:{value:new THREE.Color(P[0][2])},amp:{value:.35}};

S.environment=(function(){var pm=new THREE.PMREMGenerator(R);var tx=pm.fromScene(new RoomEnvironment()).texture;pm.dispose();return tx})();
S.add(new THREE.AmbientLight(0xffffff,.25));
var key=new THREE.DirectionalLight(0xffffff,.8);key.position.set(3,5,6);S.add(key);
var L1=new THREE.DirectionalLight(0xff6a3d,1.3),L2=new THREE.DirectionalLight(0x7b2ff7,1.3);L1.position.set(6,2,4);L2.position.set(-6,-1,4);S.add(L1,L2);
var PI2=Math.PI/2;
var maxAn=R.capabilities.getMaxAnisotropy(),tl=new THREE.TextureLoader(),texList=[];
function sRGB(t){if('colorSpace' in t)t.colorSpace=THREE.SRGBColorSpace;else t.encoding=THREE.sRGBEncoding;return t}
// image load + object-fit:cover crop for a given aspect ratio
function cover(url,asp){var t=tl.load(url,function(t){var ia=t.image.width/t.image.height;if(ia>asp){t.repeat.x=asp/ia;t.offset.x=(1-t.repeat.x)/2}else{t.repeat.y=ia/asp;t.offset.y=(1-t.repeat.y)/2}});sRGB(t);t.anisotropy=maxAn;texList.push(t);return t}
// ---- procedural textures (leather grip, knurled rings, mode dial)
function cTex(draw,w,h,rx,ry){var c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);var t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(rx,ry);t.anisotropy=maxAn;return t}
function leatherDraw(x,w,h){x.fillStyle='#808080';x.fillRect(0,0,w,h);for(var i=0;i<2600;i++){var g=90+Math.random()*90|0;x.fillStyle='rgb('+g+','+g+','+g+')';x.beginPath();x.arc(Math.random()*w,Math.random()*h,1+Math.random()*1.6,0,7);x.fill()}}
function ridgeDraw(x,w,h){x.fillStyle='#d0d0d0';x.fillRect(0,0,w,h);x.fillStyle='#303030';x.fillRect(0,0,w/2,h)}
function dialDraw(x,w,h){x.fillStyle='#17181c';x.fillRect(0,0,w,h);x.strokeStyle='#e0e0e0';x.fillStyle='#ececec';x.lineWidth=3;x.font='bold 28px sans-serif';x.textAlign='center';x.textBaseline='middle';var L=['P','A','S','M','AUTO','B'];for(var i=0;i<6;i++){var an=i/6*Math.PI*2-Math.PI/2;x.fillText(L[i],w/2+Math.cos(an)*w*.33,h/2+Math.sin(an)*h*.33)}x.beginPath();x.arc(w/2,h/2,w*.1,0,7);x.stroke()}
// ---- materials
var bodyM=new THREE.MeshPhysicalMaterial({color:0x1b1c21,roughness:.55,metalness:.2,emissive:0x000000,clearcoat:.25,clearcoatRoughness:.6,bumpMap:cTex(leatherDraw,128,128,2,2),bumpScale:.35});
var lensM=new THREE.MeshStandardMaterial({color:0x14151a,roughness:.42,metalness:.35,emissive:0x000000});
var grM=new THREE.MeshStandardMaterial({color:0x101114,roughness:.9,metalness:0,bumpMap:cTex(leatherDraw,256,256,3,7),bumpScale:1.2});
var lfM=new THREE.MeshStandardMaterial({color:0x101114,roughness:.9,metalness:0,bumpMap:cTex(leatherDraw,256,256,5,5),bumpScale:1.2});
var rbM=new THREE.MeshStandardMaterial({color:0x0f1013,roughness:.85,metalness:0});
function ridged(n){return new THREE.MeshStandardMaterial({color:0x0e0f12,roughness:.7,metalness:.1,bumpMap:cTex(ridgeDraw,64,8,n,1),bumpScale:2})}
var chromeM=new THREE.MeshStandardMaterial({color:0xdadde6,roughness:.2,metalness:1});
var dmM=new THREE.MeshStandardMaterial({color:0x2a2c33,roughness:.35,metalness:.9});
var accentM=new THREE.MeshStandardMaterial({color:0xff5d8f,emissive:0xff5d8f,emissiveIntensity:.55,roughness:.3,metalness:.3});
var redM=new THREE.MeshStandardMaterial({color:0xd1002a,roughness:.4,metalness:.2});
var whiteM=new THREE.MeshBasicMaterial({color:0xf2f2f2});
var lcdM=new THREE.MeshStandardMaterial({color:0x06080c,roughness:.12,metalness:.3,emissive:0x0b1018});
var dialM=new THREE.MeshStandardMaterial({map:sRGB(cTex(dialDraw,256,256,1,1)),roughness:.4,metalness:.5});
var glassM=new THREE.MeshPhysicalMaterial({color:0x05060a,roughness:.02,metalness:0,transparent:true,opacity:.28,clearcoat:1,clearcoatRoughness:0,envMapIntensity:2.6,depthWrite:false});
var vs='varying vec2 v;void main(){v=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}';
// lens front glass: dark coated glass, palette-tinted reflections
var gsh=new THREE.ShaderMaterial({uniforms:U,vertexShader:vs,fragmentShader:'uniform vec3 a,b,c;uniform float t;varying vec2 v;void main(){vec2 p=v-.5;float r=length(p)*2.,an=atan(p.y,p.x);float rings=.5+.5*sin(r*46.);vec3 col=vec3(.012,.016,.03);vec3 coat=mix(a,c,.5+.5*sin(an*2.+t*.8));col+=coat*pow(r,2.4)*.5;col+=mix(b,c,.5+.5*sin(an*3.-t))*smoothstep(.5,.92,r)*rings*.22;col+=vec3(1.)*(1.-smoothstep(0.,.2,length(p-vec2(-.2,.22))))*.6;col+=vec3(1.)*(1.-smoothstep(0.,.07,length(p-vec2(.2,-.2))))*.35;col*=1.-smoothstep(.86,1.02,r);gl_FragColor=vec4(col,1.);}'});
// ---- geometry helpers
function RB(w,h,d,r,bv){var iw=w-2*bv,ih=h-2*bv,x=-iw/2,y=-ih/2,s=new THREE.Shape();s.moveTo(x+r,y);s.lineTo(x+iw-r,y);s.quadraticCurveTo(x+iw,y,x+iw,y+r);s.lineTo(x+iw,y+ih-r);s.quadraticCurveTo(x+iw,y+ih,x+iw-r,y+ih);s.lineTo(x+r,y+ih);s.quadraticCurveTo(x,y+ih,x,y+ih-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);var dp=d-2*bv;var g=new THREE.ExtrudeGeometry(s,{depth:dp,bevelEnabled:true,bevelThickness:bv,bevelSize:bv,bevelSegments:4,curveSegments:10});g.translate(0,0,-dp/2);return g}
function humpG(){var s=new THREE.Shape();s.moveTo(.6,0);s.lineTo(.32,.74);s.lineTo(-.42,.74);s.lineTo(-.68,.3);s.lineTo(-.68,0);s.lineTo(.6,0);var g=new THREE.ExtrudeGeometry(s,{depth:1.2,bevelEnabled:true,bevelThickness:.05,bevelSize:.05,bevelSegments:3});g.translate(0,0,-.6);g.rotateY(-PI2);return g}
var cam=new THREE.Group(),rig=new THREE.Group();rig.scale.setScalar(.78);rig.position.set(0,-.3,-1.15);cam.add(rig);
function M(g,m,x,y,z,rx){var o=new THREE.Mesh(g,m);o.position.set(x,y,z);if(rx)o.rotation.x=rx;rig.add(o);return o}
function CY(r,len,m,z,x,y){return M(new THREE.CylinderGeometry(r,r,len,72),m,x||0,y||0,z,PI2)}
// ---- body, pentaprism, grip, leatherette
M(RB(3.4,2.2,1.6,.24,.07),bodyM,0,0,0);
M(humpG(),bodyM,0,1.1,0);
M(new THREE.BoxGeometry(.5,.04,.42),chromeM,0,1.93,-.08);
M(new THREE.BoxGeometry(.03,.03,.4),dmM,.2,1.96,-.08);M(new THREE.BoxGeometry(.03,.03,.4),dmM,-.2,1.96,-.08); // hot-shoe rails
M(RB(.85,.46,.22,.09,.03),rbM,0,1.4,-.78);
M(new THREE.PlaneGeometry(.5,.22),lcdM,0,1.4,-.893).rotation.y=Math.PI; // viewfinder glass
M(RB(.95,2.2,.9,.3,.08),rbM,-1.25,-.05,.82);
M(new THREE.PlaneGeometry(.78,1.9),grM,-1.25,-.05,1.276);
M(new THREE.PlaneGeometry(1.3,1.55),lfM,1.0,-.1,.806);
// ---- top plate controls
M(new THREE.CylinderGeometry(.3,.3,.22,64),ridged(24),1.15,1.2,.05);
M(new THREE.CylinderGeometry(.24,.24,.03,48),chromeM,1.15,1.325,.05);
M(new THREE.CircleGeometry(.235,48),dialM,1.15,1.341,.05,-PI2); // mode dial markings
M(new THREE.BoxGeometry(.03,.01,.12),whiteM,1.15,1.348,-.1);
M(new THREE.CylinderGeometry(.17,.17,.05,32),chromeM,-1.2,1.125,.42);
M(new THREE.CylinderGeometry(.11,.11,.1,32),rbM,-1.2,1.17,.42);
M(new THREE.CylinderGeometry(.17,.17,.12,48),ridged(18),-1.45,1.16,.1);
M(new THREE.BoxGeometry(.6,.03,.36),lcdM,-1.2,1.11,-.3);
// ---- strap lugs, lens mount, release button
var lug=new THREE.TorusGeometry(.11,.035,10,24);lug.rotateY(PI2);M(lug,chromeM,1.78,.85,0);M(lug,chromeM,-1.78,.85,0);
CY(1.02,.14,chromeM,.87);
CY(.88,.16,dmM,.88);
M(new THREE.CylinderGeometry(.06,.06,.05,24),redM,-.67,.67,.96,PI2);
M(new THREE.CylinderGeometry(.1,.1,.1,32),chromeM,1.45,-.55,.85,PI2);
M(new THREE.CylinderGeometry(.065,.065,.12,32),rbM,1.45,-.55,.87,PI2);
// ---- lens barrel: zoom ring, focus ring, accent ring, front glass
CY(.9,.4,lensM,1.15);
var zoomR=CY(.98,1.0,ridged(72),1.85);
CY(1.0,.03,chromeM,1.34);CY(1.0,.03,chromeM,2.36);
CY(.92,.28,lensM,2.5);
var focusR=CY(.96,.55,ridged(60),2.92);
CY(.94,.07,accentM,3.23);
CY(.86,.5,lensM,3.5);
M(new THREE.TorusGeometry(.79,.055,16,72),chromeM,0,0,3.77);
M(new THREE.BoxGeometry(.035,.012,.22),whiteM,0,.905,1.15);
var gl=new THREE.Mesh(new THREE.CircleGeometry(.74,72),gsh);gl.position.set(0,0,3.76);rig.add(gl);
M(new THREE.TorusGeometry(.74,.03,12,72),dmM,0,0,3.77);
// curved front element: real env reflections on top of the tinted coating
var capG=new THREE.SphereGeometry(2.5,64,24,0,Math.PI*2,0,.3);capG.rotateX(PI2);capG.translate(0,0,3.76-2.5*Math.cos(.3));
rig.add(new THREE.Mesh(capG,glassM));
// ---- rear: LCD with a real photo + glass, d-pad, buttons
var lcdP=new THREE.MeshBasicMaterial({map:cover(IMGS[0],1.8/1.25),toneMapped:false});
M(new THREE.PlaneGeometry(2.0,1.45),rbM,-.12,-.2,-.803).rotation.y=Math.PI;
M(new THREE.PlaneGeometry(1.8,1.25),lcdP,-.12,-.2,-.806).rotation.y=Math.PI;
M(new THREE.PlaneGeometry(1.8,1.25),glassM,-.12,-.2,-.812).rotation.y=Math.PI;
M(new THREE.CylinderGeometry(.27,.27,.05,48),dmM,1.3,-.35,-.82,PI2);
M(new THREE.CylinderGeometry(.13,.13,.06,32),rbM,1.3,-.35,-.835,PI2);
for(var q=0;q<3;q++)M(new THREE.CylinderGeometry(.06,.06,.04,20),chromeM,.98+q*.32,.55,-.82,PI2);
rig.traverse(function(o){if(o.material&&o.material.isMeshStandardMaterial)o.material.envMapIntensity=Math.max(o.material.envMapIntensity||1,1.4)});
cam.scale.setScalar(1);S.add(cam);

// ---- floating photo prints (polaroid-style paper + glossy photo on both sides)
var fr=new THREE.Group();
var paperM=new THREE.MeshStandardMaterial({color:0xf4f1ea,roughness:.85,metalness:0});
var paperG=new THREE.BoxGeometry(1.1,1.5,.02),picG=new THREE.PlaneGeometry(.94,1.12);
for(var i=0;i<7;i++){
  var tex=cover(IMGS[i%IMGS.length],.94/1.12);
  var pm=new THREE.MeshStandardMaterial({map:tex,roughness:.3,metalness:0,emissive:0xffffff,emissiveMap:tex,emissiveIntensity:.55,envMapIntensity:.6});
  var f=new THREE.Group();
  f.add(new THREE.Mesh(paperG,paperM));
  var front=new THREE.Mesh(picG,pm);front.position.set(0,.1,.0115);
  var back=new THREE.Mesh(picG,pm);back.position.set(0,.1,-.0115);back.rotation.y=Math.PI;
  f.add(front,back);
  var a=i/7*Math.PI*2,fy=Math.sin(i*2.1)*1.8;
  f.position.set(Math.cos(a)*5,fy,Math.sin(a)*5);
  f.lookAt(0,fy,0);
  f.rotateZ((i%3-1)*.08); // slight tilt like real prints
  f.userData.by=fy;f.userData.ph=i*1.7;
  fr.add(f);
}
S.add(fr);

var pa=[],pg=new THREE.BufferGeometry();for(var k=0;k<600;k++)pa.push((Math.random()-.5)*26,(Math.random()-.5)*16,(Math.random()-.5)*14);
pg.setAttribute('position',new THREE.Float32BufferAttribute(pa,3));
var pts=new THREE.Points(pg,new THREE.PointsMaterial({color:0x8b5cf6,size:.045,transparent:true,opacity:.35}));S.add(pts);
var c1=new THREE.Color(),c3=new THREE.Color();
var mx=0,my=0,sp=0,cols=[new THREE.Color(),new THREE.Color(),new THREE.Color()],ci=-1,root=document.documentElement;
var onMove=function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5};addEventListener('mousemove',onMove);
function rs(){R.setSize(innerWidth,innerHeight,false);C.aspect=innerWidth/innerHeight;C.updateProjectionMatrix()}rs();addEventListener('resize',rs);
var clk=new THREE.Clock();
(function loop(){raf=requestAnimationFrame(loop);var t=clk.getElapsedTime();U.t.value=t*.7;
var h=document.documentElement.scrollHeight-innerHeight,sy=h>0?scrollY/h:0;sp+=(sy-sp)*.07;
// palette by section in view
secs=[].slice.call(document.querySelectorAll('section'));if(!secs.length){R.render(S,C);return}
var mid=scrollY+innerHeight/2,idx=0;secs.forEach(function(s,i){if(s.offsetTop<=mid)idx=i});
var pi=+secs[idx].dataset.p;
if(pi!==ci){ci=pi;root.style.setProperty('--g1',P[pi][0]);root.style.setProperty('--g2',P[pi][1]);root.style.setProperty('--g3',P[pi][2])}
[U.a,U.b,U.c].forEach(function(u,i){cols[i].set(P[ci][i]);u.value.lerp(cols[i],.05)});
var wide=innerWidth>700,tx=0,ty=0,sc=1,tz=0,ry=0;
var dd=secs[idx].dataset;
if(wide){tx=+(dd.cx||0);ty=+(dd.cy||.3);}else{ty=1.9;}
sc=wide?+(dd.cs||.7):.55;tz=+(dd.cz||-3);
ry=tx>0?-.65:tx<0?.65:Math.sin(t*.5)*.3;
cam.position.x+=(tx-cam.position.x)*.05;cam.position.y+=((ty+Math.sin(t*1.2)*.12)-cam.position.y)*.05;cam.position.z+=(tz-cam.position.z)*.05;
cam.scale.setScalar(cam.scale.x+(sc-cam.scale.x)*.05);
cam.rotation.y+=((ry+mx*.5+Math.sin(sp*Math.PI*6)*.25)-cam.rotation.y)*.06;
cam.rotation.x+=((my*.4+.08)-cam.rotation.x)*.06;cam.rotation.z=Math.sin(t*.6)*.03;
zoomR.rotation.y=sp*8;focusR.rotation.y=-sp*14;
fr.position.copy(cam.position);fr.rotation.y=t*.15+sp*5;
fr.children.forEach(function(p){p.position.y=p.userData.by+Math.sin(t*.8+p.userData.ph)*.12}); // each print bobs gently
L1.color.copy(U.a.value);L2.color.copy(U.c.value);
accentM.color.copy(U.b.value);accentM.emissive.copy(U.b.value);
if(COLORED_BODY){bodyM.color.copy(U.a.value);bodyM.emissive.copy(U.a.value);bodyM.emissiveIntensity=.3;lensM.color.copy(U.c.value);lensM.emissive.copy(U.c.value);lensM.emissiveIntensity=.3}
pts.rotation.y=t*.02+sp;

R.render(S,C)})();

      cleanup = () => { cancelAnimationFrame(raf); removeEventListener('mousemove', onMove); removeEventListener('resize', rs); texList.forEach(function(t){t.dispose()}); R.dispose() }
    } catch (e) { console.log('WebGL unavailable', e) }
    return () => cleanup()
  }, [])
  return <canvas id="c" ref={ref} />
}