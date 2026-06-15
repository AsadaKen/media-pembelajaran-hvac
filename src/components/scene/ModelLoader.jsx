import { useGLTF, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useState, useRef } from 'react';
import useAppStore from '../../stores/useAppStore';
import TooltipPin from '../ui/TooltipPin';
import annotationsData from '../../config/annotations.json';
import FlowArrow from './FlowArrow';

export default function ModelLoader() {
  const { scene } = useGLTF('/models/pendingin_terpusat.glb', '/draco/');
  const isXRayActive = useAppStore((state) => state.isXRayActive);

  // REVISI 5.1: Ambil state activePage dari Zustand store
  const activePage = useAppStore((state) => state.activePage);
  
  const [anchors, setAnchors] = useState([]);

  const [flowIndicators, setFlowIndicators] = useState([]);

  // Referensi untuk menyimpan memori objek yang akan dianimasikan
  const coldPipesRef = useRef([]);
  const hotPipesRef = useRef([]);
  const fansRef = useRef([]);

  // Konstanta kecepatan animasi (sesuai SRS 3.10.2)
  const UV_SCROLL_SPEED_COLD = 0.3;
  const UV_SCROLL_SPEED_HOT = 0.3;
  const FAN_ROTATION_SPEED = 2.0;

  useEffect(() => {
    const foundAnchors = [];
    const foundFlows = []; // TAMBAHAN: Array penampung sementara
    
    // Kosongkan array setiap kali render ulang agar data tidak menumpuk ganda
    coldPipesRef.current = [];
    hotPipesRef.current = [];
    fansRef.current = [];

    scene.traverse((object) => {
      // 1. Logika Material & X-Ray
      if (object.isMesh) {
        const isCasing = object.name.toLowerCase().includes('casing');
        if (isCasing) {
          object.material.transparent = true;
          object.material.opacity = isXRayActive ? 0.2 : 1.0; 
          object.material.depthWrite = !isXRayActive; 
        } else {
          object.material.transparent = false;
          object.material.opacity = 1.0;
        }
      }

      // 2. Mengumpulkan Objek untuk Animasi
      if (object.name.startsWith('pipe_cold_')) {
        coldPipesRef.current.push(object);
      } else if (object.name.startsWith('pipe_hot_')) {
        hotPipesRef.current.push(object);
      } else if (object.name.startsWith('fan_')) {
        fansRef.current.push(object);
      }

      // 3. Logika Pencarian Titik Anotasi
      if (object.name.startsWith('titik_')) {
        const config = annotationsData.annotations.find(
          (a) => a.objectName === object.name
        );
        if (config) {
          foundAnchors.push({ mesh: object, config });
        }
      }

      // 4. TAMBAHAN: Logika Pencarian Titik Panah (Flow)
      if (object.name.startsWith('flow_')) {
        foundFlows.push({
          name: object.name,
          position: [object.position.x, object.position.y, object.position.z],
          // Mengambil nilai rotasi asli dari Blender
          rotation: [object.rotation.x, object.rotation.y, object.rotation.z] 
        });
      }
    });

    setAnchors(foundAnchors);
    setFlowIndicators(foundFlows); // TAMBAHAN: Simpan ke state
  }, [isXRayActive, scene]);

  // 4. Render Loop (Berjalan 60 kali per detik)
  useFrame((state, delta) => {
    // Animasi Pipa Dingin (Geser tekstur ke sumbu X negatif)
    coldPipesRef.current.forEach((mesh) => {
      if (mesh.material && mesh.material.map) {
        mesh.material.map.offset.x -= delta * UV_SCROLL_SPEED_COLD;
      }
    });

    // Animasi Pipa Panas (Geser tekstur ke sumbu X positif)
    hotPipesRef.current.forEach((mesh) => {
      if (mesh.material && mesh.material.map) {
        mesh.material.map.offset.x += delta * UV_SCROLL_SPEED_HOT;
      }
    });

    // Animasi Kipas (Rotasi sumbu Y)
    fansRef.current.forEach((mesh) => {
      mesh.rotation.z += delta * FAN_ROTATION_SPEED;
    });
  });

  return (
    <group>
      <primitive object={scene} />

      {/* REVISI 5.1: Titik biru HANYA digambar saat user berada di halaman utama diorama */}
      {activePage === 'home' && anchors.map((anchor, index) => (
        <Html 
          key={`tooltip-${index}`} 
          position={[
            anchor.mesh.position.x, 
            anchor.mesh.position.y, 
            anchor.mesh.position.z
          ]}
          center
          zIndexRange={[100, 0]}
        >
          <TooltipPin annotation={anchor.config} />
        </Html>
      ))}

      {/* Menampilkan animasi panah aliran pipa */}
      {flowIndicators.map((flow, index) => (
        <FlowArrow 
          key={`flow-${index}`} 
          position={flow.position} 
          rotation={flow.rotation} 
          type={flow.name} 
        />
      ))}
    </group>
  );
}