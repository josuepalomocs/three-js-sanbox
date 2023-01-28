import * as THREE from "three";

interface LineCoordinates {
  x: number;
  y: number;
  z: number;
}

export default class AudioVisualizer {
  private readonly NUM_LINES = 128;
  private readonly lineMaterial;
  private readonly lines: THREE.Line<
    THREE.BufferGeometry,
    THREE.LineBasicMaterial
  >[];

  public constructor() {
    this.lineMaterial = new THREE.LineBasicMaterial({ color: "#444444" });
    this.lines = [];
  }

  public getLines() {
    return this.lines;
  }

  public createLines(frequencyData: Uint8Array) {
    for (let i = 0; i < this.NUM_LINES; i++) {
      const yAmt = frequencyData[i] * 0.008;
      this.lines[i] = this.createLine({ x: i * 0.05, y: yAmt * 0.01, z: 0 }, i);
    }
    return this.lines;
  }

  private createLine({ x, y, z }: LineCoordinates, i: number) {
    const vectors = [
      new THREE.Vector3(x, 0, z),
      new THREE.Vector3(x, y - 1, z),
      new THREE.Vector3(x + 0.001, y, z + 0.005),
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(vectors);
    const line = new THREE.Line(geometry, this.lineMaterial);
    line.name = `line_${i}`;
    return line;
  }
}
