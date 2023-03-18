import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import colorText from "../assets/textures/color.jpg";
export default function Scene() {
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("/textures/image.jpg");
    console.log("texture", texture);
    const scene = new THREE.Scene();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 3;
    scene.add(camera);
    const canvas: HTMLElement = document.querySelector(
      ".firstCanvas"
    ) as HTMLElement;
    const renderer = new THREE.WebGLRenderer({ canvas });
    const controls = new OrbitControls(camera, canvas);
    // controls.target.y = 1
    controls.enableDamping = true;
    controls.update();
    renderer.setSize(sizes.width, sizes.height);
    const clock = new THREE.Clock();

    const animation = () => {
      const elapsedTime = clock.getElapsedTime();
      controls.update();
      mesh.rotation.y = 0.2 * elapsedTime;
      mesh.rotation.x = 0.1 * elapsedTime;
      renderer.render(scene, camera);
      window.requestAnimationFrame(animation);
    };
    animation();
  }, []);
  return <canvas className="firstCanvas">Scene</canvas>;
}
