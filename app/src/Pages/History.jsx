import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from '/src/assets/apple-touch-icon.png'

export default function History() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const added = JSON.parse(localStorage.getItem("wb_added_txns") || "[]");
    setTransactions(added.reverse()); // afficher du plus récent au plus ancien
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("wb_current_user");
    toast.success("You have successfully logged out!", {
      position: "top-right",
      autoClose: 2000,
    });
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <>
      <ToastContainer />

      {/* Header */}
      <header className="flex justify-between items-center  px-6 py-3 shadow-md">
        <div className="flex gap-2 items-center">
          <span><img src={logo} alt="" className="w-12 h-12  block" /></span>
          <div className="text-xl font-bold hidden lg:block  text-blue-400">Wina Bwangu</div>
        </div>
        {/* Hamburger button */}
        <span>
          <ion-icon
            className="text-3xl md:hidden text-blue-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            name={`${menuOpen ? "close-outline" : "menu-outline"}`}
          >

          </ion-icon>
        </span>
        

        {/* Desktop menu */}

        <nav className="hidden md:flex gap-6 text-blue-400 font-medium">
          <a href="/dashboard" className="hover:text-yellow-600">
            Dashboard
          </a>
          <a href="/transactions" className="hover:text-yellow-600">
            Transactions
          </a>
          <a href="/history" className="text-indigo-400 font-semibold">
            History
          </a>
          <button
            onClick={handleLogout}
            className="hover:text-red-300 cursor-pointer"
          >
            Logout
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="bg-blue-800 text-white flex flex-col md:hidden text-center py-4 space-y-3">
          <a href="/dashboard" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300">
            Dashboard
          </a>
          <a href="/transactions" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300">
            Transactions
          </a>
          <a href="/history" onClick={() => setMenuOpen(false)} className="text-yellow-300 font-semibold">
            History
          </a>
          <button
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
            className="hover:text-red-300"
          >
            Logout
          </button>
        </div>
      )}

      {/* Main content */}
      <main className="max-w-6xl mx-auto p-6 mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Transaction History</h2>

        <section className="bg-white rounded-2xl shadow p-4 md:p-6 overflow-x-auto">
          {/* Desktop table */}
          <div className="hidden md:block">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="p-3 text-left font-semibold text-gray-700">Transaction ID</th>
                  <th className="p-3 text-left font-semibold text-gray-700">Booth</th>
                  <th className="p-3 text-left font-semibold text-gray-700">Location</th>
                  <th className="p-3 text-left font-semibold text-gray-700">Service</th>
                  <th className="p-3 text-left font-semibold text-gray-700">Amount (ZMW)</th>
                  <th className="p-3 text-left font-semibold text-gray-700">Revenue per Kwacha</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.TransactionID} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-3 text-gray-800">{t.TransactionID}</td>
                    <td className="p-3 text-gray-800">{t.MobileBooth}</td>
                    <td className="p-3 text-gray-800">{t.Location}</td>
                    <td className="p-3 text-gray-800">{t.Service}</td>
                    <td className="p-3 font-semibold text-blue-700">{t.TransactionAmount}</td>
                    <td className="p-3 text-gray-800">{t.RevenuePerKwacha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="block md:hidden space-y-3">
            {transactions.map((t) => (
              <div key={t.TransactionID} className="border border-gray-200 rounded-xl p-3 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{t.TransactionID}</span>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-lg">{t.Service}</span>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Booth:</span>
                    <span className="font-medium">{t.MobileBooth}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{t.Location}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold text-blue-700">{t.TransactionAmount} ZMW</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Revenue:</span>
                    <span className="font-medium">{t.RevenuePerKwacha}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
