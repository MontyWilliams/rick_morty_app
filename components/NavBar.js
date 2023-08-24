"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import handleLogin from '../config/db/handleLogin.js'

const NavBar = () => {
  const [ user, setUser ] = useState("")
  const [ showLoginForm, setShowLoginForm ] = useState(false)
  const [ showSignUpForm, setShowSignUpForm ] = useState(false)
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ loginStatus, setLoginStatus ] = useState(false)
  
  const handleLogin2 = async () => {
    try {
      handleLogin()

    } catch {
      
    } finally {
      showLoginForm(false)
      setLoginStatus(true)

    }
    //turn off login form on completion
  }
  //turn off login form on completion
  const handleSignUp = async () => {
    alert('yo')
    showSignUpForm(false)
  }

  return(
    <div className="bg-slate-500 h-[100px] w-full">
      <div className="flex justify-between items-center px-4">
      <Image
        src='/rick-and-morty.gif'
        alt='pic'
        width={80}
        height={100}
        style={{padding: 3, borderRadius: '50%'}}
      />

      {!user ? (
        <>
          <div>
            <button onClick={() => setShowLoginForm(!showLoginForm)} className="mr-2 bg-green-500 text-white px-4 py-2 rounded-md">
              Login
            </button>
            <button onClick={() => setShowSignUpForm(!showSignUpForm)} className="mr-2 bg-white text-black px-4 py-2 rounded-md">
              Sign Up
            </button>
          </div>
          <h1>Not Logged In</h1>
        </>
      ) : (
        <span>What Up tho, {user}</span>
      )}
      </div>

      {showLoginForm && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-white p-8 rounded-md shadow-lg">
            <h2 className="mb-4">Login</h2>
            <form onSubmit={handleLogin2}>
              <div className="mb-4">
                <label className="block text-sm mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full px-3 py-3 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md">
                Login
              </button>
            </form>
          </div>
        </div>
      )}

{showSignUpForm && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-white p-8 rounded-md shadow-lg">
            <h2 className="mb-4">SignUp</h2>
            <form onSubmit={handleSignUp}>
              <div className="mb-4">
                <label className="block text-sm mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full px-3 py-3 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md">
                Create Account
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default NavBar
