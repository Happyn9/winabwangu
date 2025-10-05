import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Login from './Login';
import LoadingPage from '../Components/Loading';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [loading, setLoading] = useState(true); 
  const [notif, setNotif] = useState('');
  const [modal, setModal] = useState(false);
  const [isregister, setIsregister] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [msg, setMsg] = useState('');

 
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

 

  const openModal = (mode) => {
    setIsregister(mode === "register");
    setModal(true);
  };

  // Si loading = true, afficher le loader
  if (loading) return <LoadingPage />;

  return (
    <div>
      <Navbar onOpenModal={openModal} />

      <main className="w-full mt-1.5 overflow-hidden">
        <section className="home">
          <div className="flex items-center justify-center min-h-screen mx-auto w-[99%] lg:mx-5 lg:w-[75%] bg-gradient-to-l from-transparent lg:via-gray-50 to-white">
            <div className="w-[95%] mx-auto lg:w-[500px] lg:ml-20 px-5 py-4 flex flex-col gap-4">
              <span className="text-gray-800 text-2xl md:text-4xl font-bold">
                <em>Welcome</em> <br />to <em className="text-blue-400">Wina Bwangu</em><br /> Digital Platform
              </span>
              <span className="text-gray-700 md:text-md">
                Wina Bwangu is your trusted digital partner for fast, secure, and reliable services. 
              </span>

              <button
                className="bg-blue-400 w-[180px] hover:bg-blue-400 cursor-pointer text-white rounded-lg py-2 px-7 text-center"
                onClick={() => openModal("register")}
              >
                Join Us
              </button>
            </div>
          </div>
        </section>

        {modal && (
          <div className="absolute backdrop-blur-sm top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="relative p-6 rounded-lg w-[450px]">
              <Login onClose={() => setModal(false)} />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Home;
