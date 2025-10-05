import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '/src/assets/apple-touch-icon.png'

export default function Login({onClose}) {
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  const togglePassword = (id) => {
    const input = document.getElementById(id)
    if (input) input.type = input.type === 'password' ? 'text' : 'password'
  }

  const handleLogin = () => {
    setMsg('')
    const users = JSON.parse(localStorage.getItem('wb_users') || '[]')
    const found = users.find((u) => u.email === email && u.password === password)
    if (!found) {
      setMsg('Invalid email or password.')
      return
    }
    localStorage.setItem('wb_current_user', JSON.stringify(found))
    navigate('/dashboard')
  }

  const handleRegister = () => {
    setMsg('')
    if (!email || !password) {
      setMsg('Please fill in all fields.')
      return
    }
    if (password.length < 8) {
      setMsg('Password must be at least 8 characters.')
      return
    }
    const users = JSON.parse(localStorage.getItem('wb_users') || '[]')
    if (users.some((u) => u.email === email)) {
      setMsg('Email already registered.')
      return
    }
    users.push({ email, password })
    localStorage.setItem('wb_users', JSON.stringify(users))
    setMsg('Account created successfully. You can now sign in.')
    setIsRegister(false)
    setEmail('')
    setPassword('')
  }

  return (
    <div className="relative flex items-center justify-center min-h-[80vh] sm:min-h-[60vh]">
      <div className="absolute inset-0 backdrop-blur-lg   rounded-2xl"></div>

      <div className="relative w-full max-w-lg sm:max-w-sm md:max-w-md bg-white/40 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl p-6 sm:p-8 z-10">
        {!isRegister ? (
          <>
            <span onClick={onClose} className=' absolute right-4 cursor-pointer hover:shadow hover:text-blue-600 px-1 transition-all text-2xl top-3'>
              <ion-icon
              className=''
              name ='close-outline'
              >

              </ion-icon>
            </span>
            <div className="text-center mb-5">
              <img
                src={logo}
                alt="Wina Bwangu Logo"
                className="mx-auto w-13 h-13 sm:w-16 sm:h-16 mb-2 rounded-full shadow"
              />
              <h2 className="text-lg sm:text-xl font-semibold text-blue-400">
                Wina Bwangu Agent Portal
              </h2>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 sm:p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base"
              />

              <div className="relative">
                <input
                  id="loginPassword"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 sm:p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base"
                />
                <span
                  className="absolute right-3 top-2.5 sm:top-3 cursor-pointer text-gray-500 text-lg"
                  onClick={() => togglePassword('loginPassword')}
                >
                  👁️
                </span>
              </div>

              <button
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white p-2.5 sm:p-3 rounded-xl hover:bg-blue-700 transition text-sm sm:text-base"
              >
                Sign in
              </button>

              <p className="text-xs sm:text-sm text-center text-gray-700">
                No account?{' '}
                <button
                  onClick={() => setIsRegister(true)}
                  className="text-blue-600 hover:underline"
                >
                  Register
                </button>
              </p>

              {msg && (
                <div className="mt-2 text-center text-xs sm:text-sm text-red-600 bg-red-100 py-1.5 sm:py-2 rounded-md">
                  {msg}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center mb-3 sm:mb-4">
              Create account
            </h2>
            <p className="text-center text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4">
              Register as an agent
            </p>

            <div className="space-y-3 sm:space-y-4">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 sm:p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base"
              />

              <div className="relative">
                <input
                  id="regPassword"
                  type="password"
                  placeholder="Password (min 8 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 sm:p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base"
                />
                <span
                  className="absolute right-3 top-2.5 sm:top-3 cursor-pointer text-gray-500 text-lg"
                  onClick={() => togglePassword('regPassword')}
                >
                  👁️
                </span>
              </div>

              <button
                onClick={handleRegister}
                className="w-full bg-green-600 text-white p-2.5 sm:p-3 rounded-xl hover:bg-green-700 transition text-sm sm:text-base"
              >
                Create account
              </button>

              <p className="text-xs sm:text-sm text-center text-gray-700">
                Already have an account?{' '}
                <button
                  onClick={() => setIsRegister(false)}
                  className="text-blue-600 hover:underline"
                >
                  Sign in
                </button>
              </p>

              {msg && (
                <div className="mt-2 text-center text-xs sm:text-sm text-red-600 bg-red-100 py-1.5 sm:py-2 rounded-md">
                  {msg}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
