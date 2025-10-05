import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useNavigate } from "react-router-dom";
import logo from "/src/assets/apple-touch-icon.png";
import { Menu, X } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GLOBAL_MONTHLY_LIMIT = 50000;
const serviceRevenue = {
  "Airtel Money": 0.05,
  "MTN Money": 0.06,
  "Zamtel Money": 0.045,
  Zanaco: 0.035,
  FNB: 0.04,
};
const palette = ["#2563eb", "#06b6d4", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"];

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [totalRev, setTotalRev] = useState(0);
  const [txnCount, setTxnCount] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [remaining, setRemaining] = useState("-");
  const [menuOpen, setMenuOpen] = useState(false);

  const pieRef = useRef(null);
  const barRef = useRef(null);
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadTransactions();
  }, []);

  async function loadTransactions() {
    try {
      const resp = await fetch("/data/sample_transactions.json");
      if (!resp.ok) throw new Error("No file");
      const data = await resp.json();
      const added = JSON.parse(localStorage.getItem("wb_added_txns") || "[]");
      setTransactions([...data, ...added]);
    } catch {
      const fallback = [
        { TransactionID: "WB0000001", MobileBooth: "Wina1", Location: "Lusaka CPD", Service: "Airtel Money", RevenuePerKwacha: 0.05, TransactionAmount: 964 },
        { TransactionID: "WB0000002", MobileBooth: "Wina2", Location: "Libala", Service: "MTN Money", RevenuePerKwacha: 0.06, TransactionAmount: 582 },
        { TransactionID: "WB0000003", MobileBooth: "Wina3", Location: "Kabwata", Service: "Zamtel Money", RevenuePerKwacha: 0.045, TransactionAmount: 349 },
      ];
      const added = JSON.parse(localStorage.getItem("wb_added_txns") || "[]");
      setTransactions([...fallback, ...added]);
    }
  }

  useEffect(() => {
    const totalRevenue = transactions.reduce(
      (s, t) => s + (t.TransactionAmount || 0) * (t.RevenuePerKwacha || serviceRevenue[t.Service] || 0),
      0
    );
    const totalTax = transactions.reduce((s, t) => s + (t.TransactionAmount || 0) * 0.1, 0);
    const totalAmount = transactions.reduce((s, t) => s + (t.TransactionAmount || 0), 0);

    setTotalRev(totalRevenue.toFixed(2));
    setTotalTax(totalTax.toFixed(2));
    setTxnCount(transactions.length);
    setRemaining(Math.max(0, GLOBAL_MONTHLY_LIMIT - totalAmount).toFixed(2));

    renderPie(transactions);
    renderBar(transactions);
  }, [transactions]);

  function renderPie(txns) {
    if (!pieRef.current) return;
    const byService = {};
    txns.forEach((t) => {
      const s = t.Service || "Unknown";
      const rev = (t.TransactionAmount || 0) * (t.RevenuePerKwacha || serviceRevenue[s] || 0);
      byService[s] = (byService[s] || 0) + rev;
    });

    const labels = Object.keys(byService);
    const data = labels.map((l) => byService[l]);
    const colors = labels.map((_, i) => palette[i % palette.length]);

    if (pieChartRef.current) pieChartRef.current.destroy();
    pieChartRef.current = new Chart(pieRef.current.getContext("2d"), {
      type: "pie",
      data: { labels, datasets: [{ data, backgroundColor: colors }] },
      options: { plugins: { legend: { position: "bottom" } }, responsive: true, maintainAspectRatio: false },
    });
  }

  function renderBar(txns) {
    if (!barRef.current) return;
    const byBooth = {};
    txns.forEach((t) => {
      const b = t.MobileBooth || "Unknown";
      const rev = (t.TransactionAmount || 0) * (t.RevenuePerKwacha || serviceRevenue[t.Service] || 0);
      byBooth[b] = (byBooth[b] || 0) + rev;
    });

    const labels = Object.keys(byBooth);
    const data = labels.map((l) => byBooth[l]);
    const colors = labels.map((_, i) => palette[i % palette.length]);

    if (barChartRef.current) barChartRef.current.destroy();
    barChartRef.current = new Chart(barRef.current.getContext("2d"), {
      type: "bar",
      data: { labels, datasets: [{ label: "Revenue (ZMW)", data, backgroundColor: colors }] },
      options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } },
    });
  }

  function exportCSV() {
    if (!transactions.length) return alert("No transactions to export");
    const headers = ["TransactionID", "MobileBooth", "Location", "Service", "RevenuePerKwacha", "TransactionAmount"];
    let csv = headers.join(",") + "\n";
    transactions.forEach((t) => {
      csv += headers.map((h) => (t[h] !== undefined ? String(t[h]).replace(/,/g, "") : "")).join(",") + "\n";
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wina_transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleLogout() {
    localStorage.removeItem("wb_current_user");
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
    setTimeout(() => navigate("/"), 1800);
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <ToastContainer />

      {/* Header */}
      <header className="bg-white shadow-md flex items-center justify-between px-4 sm:px-6 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-10 h-10 rounded-full" />
          <span className="hidden md:block text-2xl font-bold text-blue-400">Wina Bwangu</span>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation */}
        <nav className="hidden text-gray-600 md:flex gap-5">
          <span onClick={() => navigate("/dashboard")} className="text-blue-400 font-semibold cursor-pointer">Dashboard</span>
          <span onClick={() => navigate("/transactions")} className="hover:text-blue-600 cursor-pointer">Transactions</span>
          <span onClick={() => navigate("/history")} className="hover:text-blue-600 cursor-pointer">History</span>
          <span onClick={handleLogout} className="hover:text-red-500 cursor-pointer">Logout</span>
        </nav>
      </header>

      {/* Mobile Dropdown */}
      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${menuOpen ? "max-h-64 py-3" : "max-h-0"}`}>
        <nav className="flex flex-col gap-4 py-3 text-center bg-blue-700 text-white shadow-md px-4 :rounded-b-md">
          <span
            onClick={() => { setMenuOpen(false); navigate("/dashboard"); }}
            className="cursor-pointer  hover:text-blue-600"
          >
            Dashboard
          </span>
          <span
            onClick={() => { setMenuOpen(false); navigate("/transactions"); }}
            className="cursor-pointer hover:text-blue-600"
          >
            Transactions
          </span>
          <span
            onClick={() => { setMenuOpen(false); navigate("/history"); }}
            className="cursor-pointer hover:text-blue-600 "
          >
            History
          </span>
          <span
            onClick={() => { setMenuOpen(false); handleLogout(); }}
            className="cursor-pointer hover:text-red-500"
          >
            Logout
          </span>
        </nav>
      </div>

      {/* Overview */}
      <main className="max-w-6xl mx-auto py-8 px-4">
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card title="Total Revenue (ZMW)" value={totalRev} big />
          <Card title="Cumulative Transactions" value={txnCount} />
          <Card title="Monthly Limit Remaining" value={remaining} />
          <Card title="Total Tax Collected" value={totalTax} />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <ChartCard title="Revenue by Service" chartRef={pieRef} />
          <ChartCard title="Booth Performance" chartRef={barRef} />
        </section>

        <section className="bg-white rounded-2xl shadow p-4 md:p-6 mt-6">
          <div className="flex justify-between items-center flex-wrap gap-2 mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={exportCSV}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Download CSV
              </button>
              <button
                onClick={loadTransactions}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm"
              >
                Refresh
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="p-3 text-left font-semibold text-gray-700">Transaction ID</th>
                  <th className="p-3 text-left font-semibold text-gray-700">Booth</th>
                  <th className="p-3 text-left font-semibold text-gray-700">Service</th>
                  <th className="p-3 text-left font-semibold text-gray-700">Amount (ZMW)</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(-50).reverse().map((t) => (
                  <tr key={t.TransactionID} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-3">{t.TransactionID}</td>
                    <td className="p-3">{t.MobileBooth}</td>
                    <td className="p-3">{t.Service}</td>
                    <td className="p-3 font-semibold text-blue-700">{t.TransactionAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="block md:hidden space-y-3">
            {transactions.slice(-20).reverse().map((t) => (
              <div key={t.TransactionID} className="border border-gray-200 rounded-xl p-3 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{t.TransactionID}</span>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-lg">{t.Service}</span>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Booth:</span>
                    <span className="font-medium">{t.MobileBooth}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold text-blue-700">{t.TransactionAmount} ZMW</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function Card({ title, value, big }) {
  return (
    <div className={`bg-white rounded-xl shadow p-4 text-center ${big ? "md:col-span-2" : ""}`}>
      <h3 className="text-gray-600 text-sm font-semibold">{title}</h3>
      <div className={`${big ? "text-3xl" : "text-xl"} font-bold text-blue-700 mt-2`}>{value}</div>
    </div>
  );
}

function ChartCard({ title, chartRef }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 h-64 sm:h-72 md:h-80">
      <h3 className="text-gray-600 text-sm font-semibold mb-2">{title}</h3>
      <canvas ref={chartRef} className="w-full h-full"></canvas>
    </div>
  );
}
