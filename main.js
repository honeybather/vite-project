// Importing the entire 'three' module and aliasing it as THREE
import * as THREE from 'three';
import './style.css';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


//Creating a new Scene object
const scene = new THREE.Scene()

// Creat a Sphere 
      // geoemtry is like clay
const geoemtry = new THREE.SphereGeometry(3, 64, 64);
      // 3 = radius 64, 64 = width and height segments 
const material = new THREE.MeshStandardMaterial({
  color: '#00ff83',
  //material
  roughness: 0.2
})
const mesh = new THREE.Mesh(geoemtry, material);
scene.add(mesh)

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//Light
const light = new THREE.PointLight(0xffffff, 70, 100, 1.7)
light.position.set(0, 10, 10)
scene.add(light)


//Camera - PerspectiveCamera // at  a 45-degree field of view
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 20 // Positioned 20 units away from the scene
scene.add(camera)

//Render
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width , sizes.height)
renderer.render(scene, camera)
renderer.setPixelRatio(2)


//Creating OrbitControls to enable user interaction for camera movement 
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5


//Resizing
window.addEventListener('resize', () => {
  //Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  //Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})
// Loop 
const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

//Animations
const tl = gsap.timeline({defaults: {duration: 1}})
tl.fromTo(mesh.scale, {z: 0, x: 0, y: 0}, {z: 1, x: 1, y: 1})
tl.fromTo('nav', {y: '-100%'}, {y: '0%'})
tl.fromTo(".title", { opacity: 0 }, { opacity: 1 })

//Mouse animations 
let mouseDown = false
let rgb = []
window.addEventListener('mousedown', () => mouseDown = true)
window.addEventListener('mouseup', () => mouseDown = false)

window.addEventListener('mousemove', (e) => {
  if (mouseDown) {
    // Calculating RGB values based on mouse position relative to window size
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      150
    ]
    //Creating a new color and animating mesh material color change using GSAP
    let newColor = new THREE.Color('rgb(' + rgb.join(',') + ')')
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b
    })
  }
})
