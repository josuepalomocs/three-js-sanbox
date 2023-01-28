import * as THREE from "three";
import Audio from "./Audio";
import AudioVisualizer from "./AudioVisualizer";
import { Vector3 } from "three";

class BasicCanvas {
  readonly scene;
  readonly camera;
  private renderer;

  private audio;

  private cube;
  private audioVisualizer;
  private frequencyData;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      100,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 1;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.audio = new Audio();
    this.camera.add(this.audio.getListener());

    // this.cube = this.createCube();
    // this.scene.add(this.cube);

    // this.renderCube();

    this.frequencyData = [];

    this.audioVisualizer = new AudioVisualizer();

    this.renderLines();
  }

  public playAudio() {
    this.audio.play();
  }

  private createCube(): THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial> {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: "#FF0000" });
    return new THREE.Mesh(geometry, material);
  }

  private renderCube(): void {
    requestAnimationFrame(this.renderCube.bind(this));
    this.cube.rotation.x += 0.2;
    this.cube.rotation.y += 0.008;
    this.renderer.render(this.scene, this.camera);
  }

  private renderLines(): void {
    const lines = this.audioVisualizer.createLines(
      this.audio.getFrequencyData()
    );
    for (let i = 0; i < lines.length; i++) {
      this.scene.remove(this.scene.getObjectByName(`line_${i.toString()}`)!);
    }

    for (let i = 0; i < lines.length; i++) {
      this.scene.add(lines[i]);
      lines[i].translateY(Math.random() * 3);
      lines[i].translateX(
        Math.random() < 0.5 ? -1 * Math.random() * 2 : Math.random() * 2
      );
      lines[i].translateZ(Math.random() * 3);
      lines[i].rotateX(Math.random() * 2);
      i++;
    }
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.renderLines.bind(this));
  }
}

const canvas = new BasicCanvas();

const playAudioButton = document.querySelector("#playAudio");

playAudioButton.addEventListener("click", () => {
  canvas.playAudio();
});
