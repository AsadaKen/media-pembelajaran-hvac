// src/components/scene/MainScene.jsx
import { PerspectiveCamera, Environment, OrbitControls, Grid } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import useAppStore from '../../stores/useAppStore';
import ModelLoader from './ModelLoader';

function CameraRig() {
  const { camera, scene } = useThree();
  const controlsRef = useRef();
  
  const activeComponent = useAppStore((state) => state.activeComponent);
  const hoveredAnnotation = useAppStore((state) => state.hoveredAnnotation);

  const defaultTarget = new THREE.Vector3(0, 0, 0);
  const defaultCamPos = new THREE.Vector3(50, 30, 50);

  const targetLookAt = useRef(new THREE.Vector3(10, 0, 0));
  const targetCamPos = useRef(new THREE.Vector3(10, 10, 10));

  const isTransitioning = useRef(false);

  useEffect(() => {
    if (activeComponent) {
      let componentMesh = null;
      scene.traverse((obj) => {
        if (obj.name.toLowerCase().includes(activeComponent) && !componentMesh) {
          componentMesh = obj;
        }
      });

      if (componentMesh) {
        const worldPos = new THREE.Vector3();
        componentMesh.getWorldPosition(worldPos);
        targetLookAt.current.copy(worldPos);
        targetCamPos.current.copy(worldPos).add(new THREE.Vector3(4, 4, 4));
        isTransitioning.current = true; 
      }
    } else if (hoveredAnnotation) {
      const pinObj = scene.getObjectByName(hoveredAnnotation);
      if (pinObj) {
        const worldPos = new THREE.Vector3();
        pinObj.getWorldPosition(worldPos);
        targetLookAt.current.copy(worldPos);
        targetCamPos.current.copy(worldPos).add(new THREE.Vector3(8.5, 5.5, 2.5));
        isTransitioning.current = true; 
      }
    } else {
      targetLookAt.current.copy(defaultTarget);
      targetCamPos.current.copy(defaultCamPos);
      isTransitioning.current = true; 
    }
  }, [activeComponent, hoveredAnnotation, scene]);

  useFrame((state, delta) => {
    if (!controlsRef.current || !isTransitioning.current) return;

    const speed = 4;
    controlsRef.current.target.lerp(targetLookAt.current, delta * speed);
    camera.position.lerp(targetCamPos.current, delta * speed);
    controlsRef.current.update();

    const distTarget = controlsRef.current.target.distanceTo(targetLookAt.current);
    const distCam = camera.position.distanceTo(targetCamPos.current);

    if (distTarget < 0.02 && distCam < 0.02) {
      isTransitioning.current = false;
    }
  });

  return (
    <OrbitControls 
      ref={controlsRef} 
      // REVISI: Mengaktifkan panning (geser objek)
      enablePan={true} 
      // REVISI: Membatasi rotasi agar tidak tembus ke bawah lantai ala Mekorama (90 derajat)
      maxPolarAngle={Math.PI / 2 - 0.05} 
      onStart={() => {
        isTransitioning.current = false;
      }}
    />
  );
}

export default function MainScene() {
  return (
    <>
      <PerspectiveCamera makeDefault fov={35} position={[10, 10, 10]} />
      
      <Environment preset="city" />
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} />

      {/* REVISI: Estetika Latar Belakang & Lantai */}
      <group>
        {/* Lantai Polos ("_") - Posisi Y bisa disesuaikan agar pas dengan telapak modelmu */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <planeGeometry args={[500, 500]} />
          <meshBasicMaterial color="#131b2e" /> {/* Warna surface-container-low yang menyatu dengan tema */}
        </mesh>

        {/* Grid Latar Belakang Vertikal ("|") */}
        {/* Menggunakan fadeDistance agar gridnya memudar secara halus di kejauhan */}
        <Grid 
          position={[0, 0, -10]} 
          rotation={[0, 0, 0]} 
          args={[100, 100]} 
          cellSize={1} 
          cellThickness={0.5} 
          cellColor="#bcc7de" 
          sectionSize={4} 
          sectionThickness={1} 
          sectionColor="#7bd0ff" 
          fadeDistance={30} 
          fadeStrength={1}
          opacity={0.15}
          transparent
        />
        
        {/* Grid Latar Belakang Vertikal Sisi Kiri (Membentuk Sudut Studio) */}
        <Grid 
          position={[-10, 0, 0]} 
          rotation={[0, Math.PI / 2, 0]} 
          args={[100, 100]} 
          cellSize={1} 
          cellThickness={0.5} 
          cellColor="#bcc7de" 
          sectionSize={4} 
          sectionThickness={1} 
          sectionColor="#7bd0ff" 
          fadeDistance={30} 
          fadeStrength={1}
          opacity={0.15}
          transparent
        />
      </group>

      <CameraRig />
      <ModelLoader />
    </>
  );
}