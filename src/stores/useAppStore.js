import { create } from 'zustand';

const useAppStore = create((set) => ({
  
  // TAMBAHAN: Navigasi halaman utama
  activePage: 'home', // 'home' | 'profile'
  setActivePage: (p) => set({ activePage: p }),
  
  // --- MODE ---
  viewMode: '3d', // '3d' | '2d'
  setViewMode: (m) => set({ viewMode: m }),

  // --- X-RAY ---
  isXRayActive: false,
  toggleXRay: () => set((s) => ({ isXRayActive: !s.isXRayActive })),

  // --- NAVIGASI ---
  activeComponent: null, // null | 'ahu' | 'chiller' | 'cooling_tower'
  setActiveComponent: (id) => set({ activeComponent: id }),

  // TAMBAHAN BARU: State untuk mencatat part aktif dari 16 parts yang dipilih
  activePart: null, // ID string dari parts.json | null
  setActivePart: (id) => set({ activePart: id }),

  // --- TOOLTIP ---
  hoveredAnnotation: null, // ID string dari titik yang di-hover
  setHoveredAnnotation: (id) => set({ hoveredAnnotation: id }),

  // --- UI STATE ---
  isPiPVisible: false, // Visibilitas widget PiP
  setIsPiPVisible: (v) => set({ isPiPVisible: v }),
}));

export default useAppStore;