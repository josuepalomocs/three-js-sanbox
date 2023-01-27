import * as THREE from "three";

export default class Audio {
  private readonly listener;
  private readonly sound;
  private audioLoader;

  public constructor() {
    this.listener = new THREE.AudioListener();
    this.sound = new THREE.Audio(this.listener);
    this.audioLoader = new THREE.AudioLoader();
    this.audioLoader.load("intro.mp3", (buffer) => {
      this.sound.setBuffer(buffer);
      this.sound.setLoop(false);
      this.sound.setVolume(1);
    });
  }

  public getListener() {
    return this.listener;
  }

  public play() {
    this.sound.play();
  }
}
