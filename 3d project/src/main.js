import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
}); 

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial( {color : 0xFFFF00, emissive: 0xFFFF00, emissiveIntensity: 0.5})
  const star = new THREE.Mesh( geometry, material);
  
  const [x, y , z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );

  star.position.set(x,y,z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('/bgmain.jpg');
scene.background = spaceTexture;

const geometry = new THREE.TorusGeometry(10, 3, 100, 100);
const material = new THREE.MeshStandardMaterial({ 
  color: 0x7B2CBF,
  wireframe: true
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const boxTexture = new THREE.TextureLoader().load('/choso.webp');
const boxGeometry = new THREE.BoxGeometry(7, 7, 7);
const boxMaterial = new THREE.MeshStandardMaterial({ 
  map: boxTexture,
  metalness: 0.3,
  roughness: 0.5
});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.z = 0;
scene.add(box);

function animate() {
  requestAnimationFrame( animate);

  controls.update();
  
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  renderer.render( scene, camera);
}

animate()