//Julian Soto's Solar System render.

import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 3000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#background'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(200);
camera.position.setX(0);

renderer.render(scene, camera);

// Create the sun
const sunGeometry = new THREE.SphereGeometry(47, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, emissive: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(0,0,0);

scene.add(sun);


//Mercury

// Create mercury's orbit group, using groups, because some planets have satelites and rings.
const mercuryOrbitGroup = new THREE.Group();
scene.add(mercuryOrbitGroup);

const mercuryGeometry = new THREE.SphereGeometry(0.19, 32, 32);
const mercuryMaterial = new THREE.MeshBasicMaterial({ color: 0xb7b8b9 });
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);

// Position the planet in the orbit
mercury.position.set(86, 0, 0); // Set the planet's initial position
mercuryOrbitGroup.add(mercury);

//venus

const venusOrbitGroup = new THREE.Group();
scene.add(venusOrbitGroup);

const venusGeometry = new THREE.SphereGeometry(0.4042, 32, 32);
const venusMaterial = new THREE.MeshBasicMaterial({ color: 0x928590 });
const venus = new THREE.Mesh(venusGeometry, venusMaterial);

venus.position.set(119, 0, 0); // Set the planet's initial position
venusOrbitGroup.add(venus);

//Earth

const earthOrbitGroup = new THREE.Group();
scene.add(earthOrbitGroup);

const textureLoader = new THREE.TextureLoader();

const earthTexture = textureLoader.load('./src/earth_dif.jpg');
const earthDepth = textureLoader.load('./src/earth_depth.jpg');
const earthSpecular = textureLoader.load('./src/earth_spec.jpg');

const earthGeometry = new THREE.SphereGeometry(0.4084, 32, 32);
const earthMaterial = new THREE.MeshPhongMaterial({map: earthTexture, bumpMap: earthDepth,specular: earthSpecular});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);

earth.position.set(147, 0, 0); // Set the planet's initial position
earthOrbitGroup.add(earth);

//MOON
// Create the Moon's orbit group
const moonOrbitGroup = new THREE.Group();
earthOrbitGroup.add(moonOrbitGroup); // Attach the Moon's orbit group to Earth's orbit group

// Create the Moon
const moonGeometry = new THREE.SphereGeometry(0.1, 32, 32); // Smaller sphere for the Moon
const moonMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);

// Position the Moon relative to Earth
moon.position.set(148, 1, 0); // Set the Moon's initial position
moonOrbitGroup.add(moon);

earthOrbitGroup.add(moonOrbitGroup); // Attach the Moon's orbit group to Earth's orbit group

//adding sun light to the scene

const sunLight = new THREE.PointLight(0xffffff, 5, 20); // Bright white light
sunLight.position.set(145, 0, 0); // Position at the center of the Sun
sunLight.castShadow = false; // Enable shadow casting if needed

// Add the light to the scene
scene.add(sunLight);

earthOrbitGroup.add(sunLight);


//mars

const marsOrbitGroup = new THREE.Group();
scene.add(marsOrbitGroup);

const marsGeometry = new THREE.SphereGeometry(0.229, 32, 32);
const marsMaterial = new THREE.MeshBasicMaterial({ color: 0x934838 });
const mars = new THREE.Mesh(marsGeometry, marsMaterial);

mars.position.set(199, 0, 0); // Set the planet's initial position
marsOrbitGroup.add(mars);


//jupiter

const jupiterOrbitGroup = new THREE.Group();
scene.add(jupiterOrbitGroup);

const jupiterGeometry = new THREE.SphereGeometry(4.72, 32, 32);
const jupiterMaterial = new THREE.MeshBasicMaterial({ color: 0xffb978 });
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);

jupiter.position.set(567, 0, 0); // Set the planet's initial position
jupiterOrbitGroup.add(jupiter);

//saturn

const saturnOrbitGroup = new THREE.Group();
scene.add(saturnOrbitGroup);

const saturnGeometry = new THREE.SphereGeometry(3.93, 32, 32);
const saturnMaterial = new THREE.MeshBasicMaterial({ color: 0xcdb99c });
const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);

saturn.position.set(1001, 0, 0); // Set the planet's initial position
saturnOrbitGroup.add(saturn);

// Create a torus geometry for Saturn's ring
const ringGeometry = new THREE.TorusGeometry(7, 1.5, 2, 100); // Adjust dimensions as needed
const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xd1a760 });
const saturnRing = new THREE.Mesh(ringGeometry, ringMaterial);

// Adjust the torus orientation to align with Saturn's equatorial plane
saturnRing.rotation.x = Math.PI / 2; // Rotate to lie flat
saturnRing.rotation.x += 0.3;
// Add the ring to Saturn's orbit group
saturnRing.position.set(1001, 0, 0); // Ensure correct position of Saturn
saturnOrbitGroup.add(saturnRing); // Attach the ring to the same group as Saturn


//uranus

const uranusOrbitGroup = new THREE.Group();
scene.add(uranusOrbitGroup);

const uranusGeometry = new THREE.SphereGeometry(1.71, 32, 32);
const uranusMaterial = new THREE.MeshBasicMaterial({ color: 0x4fd0e7 });
const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);

uranus.position.set(1969, 0, 0); // Set the planet's initial position
uranusOrbitGroup.add(uranus);

//Neptune

const neptuneOrbitGroup = new THREE.Group();
scene.add(neptuneOrbitGroup);

const neptuneGeometry = new THREE.SphereGeometry(1.66, 32, 32);
const neptuneMaterial = new THREE.MeshBasicMaterial({ color: 0x25d9d });
const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);

neptune.position.set(3053, 0, 0); // Set the planet's initial position
neptuneOrbitGroup.add(neptune);


// grid

const gridHelper = new THREE.GridHelper(5000,50);
scene.add(gridHelper)


// Add a secondary camera for following Earth
const earthCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
earthCamera.position.set(0, 0, 5); // Initial position relative to Earth

// Add a 3rd camera for following Saturn
const saturnCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
saturnCamera.position.set(0, 0, 5); // Initial position relative to Saturn

// OrbitControls for Saturn camera
const controlsSaturn = new OrbitControls(saturnCamera, renderer.domElement);



// Variable to toggle between the main camera and the Earth-following camera
let activeCamera = camera;



// Setup
const controlsMain = new OrbitControls(camera, renderer.domElement);
controlsMain.enableDamping = true; // Smooth control damping
controlsMain.dampingFactor = 0.05;

const controlsEarth = new OrbitControls(earthCamera, renderer.domElement);
controlsEarth.enableDamping = true; // Smooth motion
controlsEarth.dampingFactor = 0.05;
controlsEarth.screenSpacePanning = false; // Prevent panning
controlsEarth.minDistance = 2; // Minimum zoom distance
controlsEarth.maxDistance = 20; // Maximum zoom distance

// Event listener to toggle between cameras and their controls
window.addEventListener('keydown', (event) => {
  if (event.key === '1') {
    activeCamera = camera; // Main camera
    controlsMain.enabled = true; // Enable main camera controls
    controlsEarth.enabled = false; // Disable Earth camera controls
    controlsSaturn.enabled = false;
  } else if (event.key === '2') {
    activeCamera = earthCamera; // Earth-following camera
    controlsMain.enabled = false; // Disable main camera controls
    controlsEarth.enabled = true; // Enable Earth camera controls
    controlsSaturn.enabled = false;
  } else if (event.key === '3') {
    activeCamera = saturnCamera; // Saturn-following camera
    controlsMain.enabled = false;
    controlsEarth.enabled = false;
    controlsSaturn.enabled = true;
  }
});


// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate planets around the Sun
  mercuryOrbitGroup.rotation.y += 0.0025;
  venusOrbitGroup.rotation.y += 0.00058;
  earth.rotation.y += 0.00365;
  earthOrbitGroup.rotation.y += 0.001;
  marsOrbitGroup.rotation.y += 0.00052;
  jupiterOrbitGroup.rotation.y += 0.00008451;
  saturnOrbitGroup.rotation.y += 0.0000339;
  uranusOrbitGroup.rotation.y += 0.0000119;
  neptuneOrbitGroup.rotation.y += 0.0000061;

  
  moonOrbitGroup.rotation.y += 0.000001; // Adjust speed as desired
  moonOrbitGroup.rotation.x += 0.000001;

  // Update the Earth-following camera's position to follow Earth
  const earthPosition = new THREE.Vector3();
  earth.getWorldPosition(earthPosition); // Get Earth's global position

  earthCamera.position.copy(earthPosition);
  earthCamera.position.z += 5; // Adjust to keep a distance behind Earth
  //earthCamera.lookAt(earthPosition); // Ensure the camera looks at Earth
  controlsEarth.target.copy(earthPosition); // Focus controls on Earth
  controlsEarth.update(); // Update controls
  
  // Update the Saturn-following camera's position to follow Saturn
  const saturnPosition = new THREE.Vector3();
  saturn.getWorldPosition(saturnPosition);
  //saturnRing.getWorldPosition(saturnPosition)
  saturnCamera.position.copy(saturnPosition);
  saturnCamera.position.z += 15; // Adjust offset for Saturn
  saturnCamera.lookAt(saturnPosition);



  // Render the scene using the active camera
  renderer.render(scene, activeCamera);
}

animate();
