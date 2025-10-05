import React from 'react'

function Footer() {
  return (
    <footer className=" text-gray-300 bg-gray-700 py-10 mt-2">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
      
        <div>
          <h2 className="text-2xl font-bold mb-3">Wina Bwangu</h2>
          <p className="text-sm leading-relaxed">
            Fast, secure and reliable digital services at your fingertips.  
            We make your transactions smoother and smarter.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Services</a></li>
            <li><a href="#" className="hover:text-white">Transactions</a></li>
            <li><a href="#" className="hover:text-white">Support</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-2xl">
            <a href="#" className="hover:text-blue-500"><ion-icon name="logo-facebook"></ion-icon></a>
            <a href="#" className="hover:text-sky-400"><ion-icon name="logo-twitter"></ion-icon></a>
            <a href="#" className="hover:text-pink-500"><ion-icon name="logo-instagram"></ion-icon></a>
            <a href="#" className="hover:text-red-500"><ion-icon name="logo-youtube"></ion-icon></a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Wina Bwangu. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
