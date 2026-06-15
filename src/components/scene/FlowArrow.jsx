import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// --- KAMUS KONFIGURASI PANAH MANUAL ---
// Kamu bisa mengubah arah masing-masing panah di sini tanpa menyentuh Blender lagi!
// - rotation: [x, y, z] dalam satuan radian. Gunakan Math.PI untuk 180 derajat, Math.PI/2 untuk 90 derajat.
// - animAxis: Sumbu mana panah ini akan meluncur ('x', 'y', atau 'z')
// - animDir : Arah peluncuran (1 untuk maju, -1 untuk mundur/berlawanan arah)
const ARROW_CONFIGS = {
  "flow_AHU_keluar_01":      { rotation: [Math.PI/2, 0, 0], animAxis: 'y', animDir: 1 },
  "flow_AHU_keluar_02":      { rotation: [0, 0, -Math.PI/2], animAxis: 'y', animDir: 1 },
  "flow_AHU_masuk_01":       { rotation: [-Math.PI/2, 0, 0], animAxis: 'y', animDir: 1 },
  "flow_AHU_masuk_02":       { rotation: [0, 0, Math.PI/2], animAxis: 'y', animDir: 1 },

  "flow_cooling_masuk_01":   { rotation: [0, 0, Math.PI/2], animAxis: 'y', animDir: 1 },
  "flow_cooling_masuk_02":   { rotation: [Math.PI/2, 0, 0], animAxis: 'y', animDir: 1 },
  "flow_cooling_keluar_01":  { rotation: [-Math.PI/2, 0, 0], animAxis: 'y', animDir: 1 },
  "flow_cooling_keluar_02":  { rotation: [-Math.PI/2, 0, 0], animAxis: 'y', animDir: 1 },
};

export default function FlowArrow({ position, type }) {
  const arrowRef = useRef();

  // Menentukan warna: Cooling = Merah (Panas), AHU = Biru (Dingin)
  const isCooling = type.includes('cooling');
  const arrowColor = isCooling ? '#ffb3b0' : '#7bd0ff';

  // Membaca konfigurasi dari kamus berdasarkan nama "type" (flow_AHU_keluar_01, dst.)
  // Jika karena suatu hal namanya tidak ada di kamus, kita pakai nilai bawaan aman.
  const config = ARROW_CONFIGS[type] || { rotation: [0, 0, 0], animAxis: 'z', animDir: 1 };

  // Animasi pergerakan panah
  useFrame((state) => {
    if (!arrowRef.current) return;
    
    // Looping waktu dari 0 ke 1
    const time = (state.clock.elapsedTime * 1.5) % 1;
    
    // 1. Kunci/reset semua posisi ke 0 agar panah tidak melenceng ke mana-mana
    arrowRef.current.position.x = 0;
    arrowRef.current.position.y = 0;
    arrowRef.current.position.z = 0;
    
    // 2. Animasikan HANYA pada sumbu dan arah yang ditentukan di kamus konfigurasi
    arrowRef.current.position[config.animAxis] = time * 0.8 * config.animDir;
    
    // Efek memudar saat mencapai ujung
    if (arrowRef.current.material) {
      arrowRef.current.material.opacity = 1 - time;
    }
  });

  return (
    // Membaca posisi asli (x,y,z) dari Blender, namun ROTASINYA kita ambil alih secara manual
    <group position={position} rotation={config.rotation}>
      <mesh ref={arrowRef}>
        <coneGeometry args={[0.08*2.5, 0.3*2.5, 16]} />
        <meshBasicMaterial color={arrowColor} transparent={true} depthWrite={false} />
      </mesh>
    </group>
  );
}