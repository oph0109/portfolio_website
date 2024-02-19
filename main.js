import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});



renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.position.setZ(1000);
  camera.position.setX(5);
  camera.position.setY(2);
})

renderer.render(scene,camera);

const pointLight = new THREE.PointLight(0xffffff, 100)

pointLight.position.set(6,0,-10);
scene.add(pointLight);

function addStar() {
  const geometry = new THREE.IcosahedronGeometry(.1, 0);
  const material = new THREE.MeshBasicMaterial( { color: 0xffffff })
  const star = new THREE.Mesh( geometry, material );
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloat(-250,250 ) );
  star.position.set(x, y, z);
  scene.add(star)
}
Array(5000).fill().forEach(addStar)


const moonTexture = new THREE.TextureLoader().load('images/moon.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(.5, 32, 32),
  new THREE.MeshStandardMaterial( {
      map: moonTexture,
  })
);

scene.add(moon);
moon.position.z = 0;
moon.position.x = .75;
moon.position.y = 5;

const earthTexture = new THREE.TextureLoader().load('images/earth.jpg');
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshStandardMaterial( {
      map: earthTexture,
  })
);
scene.add(earth);
earth.position.x = 0;
earth.position.y = 0;
earth.position.z = 0;

const sunTexture = new THREE.TextureLoader().load('images/sun.jpg');
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshBasicMaterial( {
      map: sunTexture,
  })
);
scene.add(sun);
sun.position.x = 6;
sun.position.y = 0;
sun.position.z = -20;




camera.position.setZ(-0.07);
camera.position.setX(5);
camera.position.setY(2);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.01;
  console.log(camera.position);
}
document.body.onscroll = moveCamera


const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  moon.rotation.z += .0009;
  moon.rotation.y += .0009;
  earth.rotation.z += .0009;
  earth.rotation.y += .0009;

  controls.update();
  renderer.render(scene,camera);
}

animate();