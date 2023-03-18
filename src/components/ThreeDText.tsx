import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

export default function ThreeDText() {
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    const matcapTexture = textureLoader.load("/textures/matcaps/7.png");
    const textMaterial = new THREE.MeshMatcapMaterial({
      matcap: matcapTexture,
    });
    const scene = new THREE.Scene();
    const geometry = new THREE.BoxGeometry();
    const fontLoader = new FontLoader();
    fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
      const textGeometry = new TextGeometry("Bangladesh", {
        font: font,
        size: 0.7,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
      });
      textGeometry.center();
      //   textMaterial.wireframe = true;
      const text = new THREE.Mesh(textGeometry, textMaterial);
      scene.add(text);
    });
    const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
    const donutMaterial = new THREE.MeshMatcapMaterial({
      matcap: matcapTexture,
    });
    for (let i = 1; i < 100; i++) {
      const donut = new THREE.Mesh(donutGeometry, donutMaterial);
      scene.add(donut);
      donut.position.x = (Math.random() - 0.5) * 10;
      donut.position.y = (Math.random() - 0.5) * 10;
      donut.position.z = (Math.random() - 0.5) * 10;
      donut.rotation.x = Math.random() * Math.PI;
      donut.rotation.y = Math.random() * Math.PI;
      const scale = Math.random();
      donut.scale.set(scale, scale, scale);
    }
    const material = new THREE.MeshBasicMaterial({ color: 0xf8c131 });
    const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight
    );
    camera.position.z = 3;
    scene.add(camera);
    const canvas: HTMLElement = document.querySelector(
      ".threeDText"
    ) as HTMLElement;
    const renderer = new THREE.WebGLRenderer({ canvas });
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.update();
    renderer.setSize(window.innerWidth, window.innerHeight);

    const animation = () => {
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(animation);
    };
    animation();
  }, []);
  return <canvas className="threeDText">ThreeDText</canvas>;
}
