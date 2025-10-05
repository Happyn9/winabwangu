import React, { useState } from 'react'
import logo from '/src/assets/apple-touch-icon.png'

function Navbar({ onOpenModal }) {
  const [menuHamb, setMenuHamb] = useState(false)

  // Fonction pour fermer le menu et ouvrir le modal si nécessaire
  const handleLinkClick = (action) => {
    setMenuHamb(false) // ferme le menu mobile
    if (action) onOpenModal(action)
  }

  return (
    <div className="w-full">
      <header className="bg-white shadow-md sticky top-0 z-50 transition-all">
        <nav className="flex justify-between w-full lg:w-[85%] mx-auto px-4 py-3">
          
          {/* Logo + Links */}
          <div className="flex items-center gap-6">
            <div className="logo">
              <span className='self-center'><img src={logo} alt="logo" className='rounded-full h-12 w-12 lg:hidden' /></span>
              <span className="text-2xl hidden lg:block text-blue-400 font-bold tracking-wide" style={{ fontFamily: 'cursive' }}>
                Wina Bwangu
              </span>
            </div>
            <div className="hidden lg:flex text-gray-700 space-x-8 font-medium">
              <a href="#" className="hover:text-blue-400 transition">How it works</a>
              <a href="#" className="hover:text-blue-400 transition">Services</a>
              <a href="#" className="hover:text-blue-400 transition">Transactions</a>
              <a href="#" className="hover:text-blue-400 transition">History</a>
            </div>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => onOpenModal("register")}
              className="border-2 border-blue-400 cursor-pointer text-blue-400 px-5 py-1 rounded-lg flex items-center gap-2 hover:bg-blue-400 hover:text-white transition"
            >
              <em>Sign Up</em>
              <ion-icon name="log-out-outline"></ion-icon>
            </button>

            <button
              onClick={() => onOpenModal("login")}
              className="border-2 border-blue-400 cursor-pointer text-blue-400 px-5 py-1 rounded-lg flex items-center gap-2 hover:bg-blue-400 hover:text-white transition"
            >
              <em>Sign In</em>
              <ion-icon name="lock-closed-outline"></ion-icon>
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <span
            className="block lg:hidden cursor-pointer"
            onClick={() => setMenuHamb(!menuHamb)}
          >
            <ion-icon
              name={menuHamb ? "close-outline" : "menu-outline"}
              class="text-4xl text-teal-700"
            ></ion-icon>
          </span>
        </nav>

        {/* Mobile Menu */}


        {menuHamb && (
          <div className=" border-t bg-blue-700 border-gray-200 px-4 py-4 flex flex-col space-y-5 lg:hidden">
            <div className="flex text-white flex-col  space-y-4 text-center">
              <a href="#" onClick={() => setMenuHamb(false)} className=" hover:text-yellow-700">How it works</a>
              <a href="#" onClick={() => setMenuHamb(false)} className="  hover:text-yellow-700">Services</a>
              <a href="#" onClick={() => setMenuHamb(false)} className=" hover:text-yellow-700">Transactions</a>
              <a href="#" onClick={() => setMenuHamb(false)} className=" hover:text-yellow-700">History</a>
            </div>
            <div className="flex flex-col space-y-3 pt-3">
              <button
                onClick={() => handleLinkClick("register")}
                className="border  text-white py-2 rounded-md hover:bg-teal-700 hover:text-white transition"
              >
                Sign Up
              </button>
              <button
                onClick={() => handleLinkClick("login")}
                className="border  text-white py-2 rounded-md hover:bg-teal-700 hover:text-white transition"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </header>
      
    </div>
  )
}

export default Navbar
