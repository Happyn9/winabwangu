import React from 'react';
import logo from '/src/assets/apple-touch-icon.png';

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-between h-screen bg-white">
      
      {/* Logo centré */}
      <div className="flex-grow flex items-center justify-center">
        <img src={logo} alt="logo" className="h-20 w-20" />
      </div>

      {/* Texte + loader en bas */}
      <div className="flex flex-col items-center mb-8">
        <p className="text-gray-600 font-semibold tracking-widest mb-3">Wina Bwangu</p>

        {/* Petits points de chargement comme sur Facebook */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
