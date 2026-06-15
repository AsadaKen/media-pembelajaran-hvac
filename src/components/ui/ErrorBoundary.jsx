import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Memperbarui state sehingga render berikutnya menunjukkan UI fallback.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Anda juga bisa mencatat error ini ke layanan pelaporan error
    console.error("Kesalahan rendering 3D:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface text-on-surface z-50">
          <span className="text-6xl mb-4">⚠️</span>
          <h2 className="text-2xl font-geist font-bold mb-2">Terjadi Kesalahan Teknis</h2>
          <p className="font-inter text-on-surface-variant text-sm mb-6 max-w-md text-center leading-relaxed">
            Sistem gagal memuat ruang 3D. Pastikan browser Anda sudah diperbarui dan mendukung WebGL 2.0.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-surface-bright text-secondary font-geist font-bold text-sm rounded-md hover:bg-surface-container-highest transition-colors border border-secondary/20"
          >
            Muat Ulang Halaman
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}