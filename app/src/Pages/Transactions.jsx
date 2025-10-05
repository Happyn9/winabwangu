import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from '/src/assets/apple-touch-icon.png'

const boothLocations = {
  Wina1: "Lusaka CPD",
  Wina2: "Libala",
  Wina3: "Kabwata",
  Wina4: "Mandevu",
  Wina5: "Woodlands",
  Wina6: "Matero East",
};

const boothServices = {
  Wina1: ["Airtel Money", "MTN Money", "Zamtel Money", "Zanaco", "FNB"],
  Wina2: ["Airtel Money", "MTN Money", "Zamtel Money", "FNB"],
  Wina3: ["Airtel Money", "MTN Money", "Zamtel Money", "Zanaco", "FNB"],
  Wina4: ["Airtel Money", "MTN Money", "Zamtel Money"],
  Wina5: ["Airtel Money", "MTN Money", "Zanaco", "FNB"],
  Wina6: ["Airtel Money", "MTN Money", "Zamtel Money"],
};

const serviceRevenue = {
  "Airtel Money": 0.05,
  "MTN Money": 0.06,
  "Zamtel Money": 0.045,
  Zanaco: 0.035,
  FNB: 0.04,
};

export default function Transactions() {
  const [booth, setBooth] = useState("");
  const [location, setLocation] = useState("-");
  const [service, setService] = useState("");
  const [serviceOptions, setServiceOptions] = useState([]);
  const [revenue, setRevenue] = useState("-");
  const [amount, setAmount] = useState("");
  const [tax, setTax] = useState("0.00");
  const [net, setNet] = useState("0.00");
  const [txnMsg, setTxnMsg] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const updateLocationAndServices = (b) => {
    setBooth(b);
    setLocation(b ? boothLocations[b] || "-" : "-");
    const svcs = b && boothServices[b] ? boothServices[b] : [];
    setServiceOptions(["", ...svcs]);
    setService("");
    setRevenue("-");
  };

  const updateRevenue = (s) => {
    setService(s);
    setRevenue(s ? serviceRevenue[s] || "-" : "-");
    calculateTax(amount);
  };

  const calculateTax = (a) => {
    const amt = parseFloat(a) || 0;
    const t = amt * 0.1;
    const n = amt - t;
    setTax(t.toFixed(2));
    setNet(n.toFixed(2));
  };

  const saveTransaction = () => {
    setTxnMsg("");
    const amt = parseFloat(amount) || 0;
    if (!booth || !service || !amt) {
      setTxnMsg("Please fill booth, service and amount");
      return;
    }

    const id = "WB" + String(Date.now()).slice(-7);
    const txn = {
      TransactionID: id,
      MobileBooth: booth,
      Location: boothLocations[booth] || "",
      Service: service,
      RevenuePerKwacha: serviceRevenue[service] || 0,
      TransactionAmount: amt,
    };

    const added = JSON.parse(localStorage.getItem("wb_added_txns") || "[]");
    added.push(txn);
    localStorage.setItem("wb_added_txns", JSON.stringify(added));

    setTxnMsg("✅ Transaction saved successfully! Redirecting...");
    setTimeout(() => navigate("/dashboard"), 800);
  };

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
      <header className="flex justify-between items-center text-blue-400 px-6 py-3 shadow-md sticky top-0 z-50">
        <div className="flex gap-2 items-center">
          <span><img src={logo} className="h-12 w-12 " alt="logo" /></span>
          <div className="text-xl font-bold hidden md:block">Wina Bwangu</div>
        </div>
        {/* Hamburger */}
        <button
          className="text-3xl md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <ion-icon name={menuOpen ? "close-outline" : "menu-outline"}></ion-icon>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 font-medium">
          <a
            href="/dashboard"
            className="hover:text-indigo-400 transition-colors duration-200"
          >
            Dashboard
          </a>
          <a
            href="/transactions"
            className="text-indigo-400 font-semibold hover:text-blue-400 transition-colors duration-200"
          >
            Transactions
          </a>
          <a
            href="/history"
            className="hover:text-indigo-400 transition-colors duration-200"
          >
            History
          </a>
          <button
            onClick={handleLogout}
            className="hover:text-red-400 cursor-pointer transition-colors duration-200"
          >
            Logout
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-blue-700 text-white overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-64 py-4" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-3 text-center">
          <a
            href="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            Dashboard
          </a>
          <a
            href="/transactions"
            onClick={() => setMenuOpen(false)}
            className="font-semibold hover:text-yellow-300 transition-colors duration-200"
          >
            Transactions
          </a>
          <a
            href="/history"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            History
          </a>
          <button
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
            className="hover:text-red-300 transition-colors duration-200"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main content */}
      <main className="max-w-4xl mx-auto p-6 mt-6">
        <section className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Record Transaction
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Booth */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Booth</label>
              <select
                className="mt-1 w-full border rounded-lg px-3 py-2"
                value={booth}
                onChange={(e) => updateLocationAndServices(e.target.value)}
              >
                <option value="">-- Select --</option>
                {Object.keys(boothLocations).map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Location</label>
              <div className="mt-1 p-2 border rounded-lg bg-gray-50 text-gray-700">{location}</div>
            </div>

            {/* Service */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Service</label>
              <select
                className="mt-1 w-full border rounded-lg px-3 py-2"
                value={service}
                onChange={(e) => updateRevenue(e.target.value)}
              >
                <option value="">-- Select --</option>
                {serviceOptions.slice(1).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Revenue */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Revenue per Kwacha</label>
              <div className="mt-1 p-2 border rounded-lg bg-gray-50 text-gray-700">{revenue}</div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Amount</label>
              <input
                type="number"
                className="mt-1 w-full border rounded-lg px-3 py-2"
                placeholder="0.00"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  calculateTax(e.target.value);
                }}
              />
            </div>

            {/* Tax */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Tax (10%)</label>
              <div className="mt-1 p-2 border rounded-lg bg-gray-50 text-gray-700">{tax}</div>
            </div>

            {/* Net */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Net</label>
              <div className="mt-1 p-2 border rounded-lg bg-gray-50 text-gray-700">{net}</div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={saveTransaction}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Save Transaction
            </button>
            <button
              onClick={() => {
                setBooth("");
                setService("");
                setAmount("");
                setTxnMsg("");
              }}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200"
            >
              Clear
            </button>
          </div>

          {/* Message */}
          {txnMsg && <div className="mt-4 text-sm text-green-700 font-medium">{txnMsg}</div>}
        </section>
      </main>
    </>
  );
}
