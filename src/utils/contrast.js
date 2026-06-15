// src/utils/contrast.js

/**
 * Fungsi Auto-Contrast Keterbacaan Teks (WCAG Accessibility Standar)
 * Menghitung tingkat kecerahan warna background Hex dan mengembalikan class warna teks yang sesuai.
 * * @param {string} hexColor - Kode warna latar belakang, contoh: '#7bd0ff' atau '31394d'
 * @returns {string} Tailwind text color class ('text-surface' atau 'text-on-surface')
 */
export function getContrastTextClass(hexColor) {
  if (!hexColor) return 'text-on-surface';

  // Hilangkan tanda pagar (#) jika disertakan oleh user
  const cleanHex = hexColor.replace('#', '');

  // Ekstrak nilai komponen warna Red, Green, dan Blue (RGB) dari bilangan heksadesimal
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  // Rumus Standar YIQ Kecerahan Spasial Warna
  const yiqLuminance = (r * 299 + g * 587 + b * 114) / 1000;

  // Nilai tengah spektrum adalah 128. 
  // Jika di atas 128 = WARNA TERANG (Gunakan teks gelap #0b1326)
  // Jika di bawah 128 = WARNA GELAP (Gunakan teks terang #dae2fd)
  return yiqLuminance >= 128 ? 'text-[#0b1326]' : 'text-[#dae2fd]';
}