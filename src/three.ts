import * as THREE from "three";

class BasicCanvas {
  readonly scene;
  readonly camera;
  private renderer;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.addCube();

    this.render();
  }

  private addCube(): void {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: "#FFFFFF" });
    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);
  }

  private render(): void {
    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
  }
}

const canvas = new BasicCanvas();
