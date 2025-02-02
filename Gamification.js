// Initialize Three.js scene, camera, and renderer  
const scene = new THREE.Scene();  
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);  
const renderer = new THREE.WebGLRenderer({ antialias: true });  

// Configure renderer  
renderer.setSize(window.innerWidth, window.innerHeight);  
renderer.setClearColor(0x000000); // Black background  
document.body.appendChild(renderer.domElement);  

// Position the camera  
camera.position.z = 5;  

// Load the PNG texture  
const textureLoader = new THREE.TextureLoader();  
const texture = textureLoader.load('gamification_creatives/maxi bar with hand.png');  

// Create a 3D object (a rotating plane)  
const geometry = new THREE.PlaneGeometry(4, 4); // Adjust size as needed  
const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });  
const proteinBar = new THREE.Mesh(geometry, material);  

scene.add(proteinBar);  

// Animation loop  
function animate() {  
  requestAnimationFrame(animate);  

  // Rotate the protein bar  
  proteinBar.rotation.z += 0.01; // Adjust speed here  

  renderer.render(scene, camera);  
}  

// Start the animation  
animate();  
