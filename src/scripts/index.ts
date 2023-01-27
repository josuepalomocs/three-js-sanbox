import * as THREE from "three";
import Audio from "./Audio";

class BasicCanvas {
  readonly scene;
  readonly camera;
  private renderer;

  private audio;

  private cube;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 15;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.audio = new Audio();
    this.camera.add(this.audio.getListener());

    this.cube = this.createCube();
    this.scene.add(this.cube);
    this.renderCube();
  }

  public playAudio() {
    this.audio.play();
  }

  private createCube(): THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial> {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: "#FFFFFF" });
    return new THREE.Mesh(geometry, material);
  }

  private renderCube(): void {
    requestAnimationFrame(this.renderCube.bind(this));
    this.cube.rotation.x += 0.008;
    this.cube.rotation.y += 0.005;
    this.renderer.render(this.scene, this.camera);
  }
}

const canvas = new BasicCanvas();

const playAudioButton = document.querySelector("#playAudio");

playAudioButton.addEventListener("click", () => {
  canvas.playAudio();
});
