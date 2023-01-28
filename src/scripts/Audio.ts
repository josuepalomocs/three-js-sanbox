import * as THREE from "three";

export default class Audio {
  private readonly listener;
  private readonly sound;
  private readonly audioLoader;
  private readonly analyser;

  public constructor() {
    this.listener = new THREE.AudioListener();
    this.sound = new THREE.Audio(this.listener);
    this.audioLoader = new THREE.AudioLoader();
    this.audioLoader.load("0.mp3", (buffer) => {
      this.sound.setBuffer(buffer);
      this.sound.setLoop(false);
      this.sound.setVolume(1);
    });
    this.analyser = new THREE.AudioAnalyser(this.sound, 256);
  }

  public getListener() {
    return this.listener;
  }

  public play() {
    this.sound.play();
    console.log(this.analyser.getFrequencyData());
  }

  public getFrequencyData() {
    return this.analyser.getFrequencyData();
  }
}
