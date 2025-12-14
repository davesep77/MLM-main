import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

interface LoginViewProps {
  onLogin: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAppContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        if (!email || !password || !username || !name) {
          setError('Please fill in all required fields');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }
        await signUp({
          email,
          password,
          username,
          name,
          phone,
          country,
        });
      } else {
        if (!username || !password) {
          setError('Please enter username and password');
          setLoading(false);
          return;
        }
        await signIn({ username, password });
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0f0518] flex items-center justify-center relative overflow-hidden font-sans">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b2e] via-[#0f0518] to-[#2d1b4e]"></div>

      {/* Abstract wavy background simulation */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-purple-900/20 to-transparent pointer-events-none"></div>
      <div className="absolute -left-20 top-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -right-20 bottom-20 w-96 h-96 bg-pink-600/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="z-10 w-full max-w-md p-4 animate-fadeIn">
        <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-[0_0_50px_rgba(139,92,246,0.3)] relative overflow-hidden">
          {/* Glow effects on card top edge */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent blur-[1px]"></div>

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl font-bold tracking-wider text-white flex items-center drop-shadow-lg">
                <span className="text-white">EVOL</span>
                <span className="text-[#d946ef] text-4xl">ENTRA</span>
              </h1>
              <span className="text-[10px] text-gray-400 tracking-[0.2em] uppercase mt-1">Bots, Brains, Big Gains</span>
            </div>
          </div>

          {/* Language Dropdown */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <select className="appearance-none bg-white text-black px-8 py-2 rounded-full font-bold focus:outline-none text-center cursor-pointer min-w-[150px] shadow-lg">
                <option>ቋንቋ ምረጥ</option>
                <option>English</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down text-black" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                </svg>
              </div>
            </div>
          </div>

          <h2 className="text-white font-bold text-lg mb-6 text-center leading-snug drop-shadow-md">
            {isSignUp ? 'Create your account and start the adventure' : 'Please sign-in to your account and start the adventure'}
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-white text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp ? (
              <>
                <div className="space-y-1">
                  <label className="text-white text-sm pl-1 font-medium">Username *</label>
                  <input
                    type="text"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full bg-white text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium transition-shadow shadow-inner"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-white text-sm pl-1 font-medium">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-white text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium transition-shadow shadow-inner"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-white text-sm pl-1 font-medium">Email Address *</label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium transition-shadow shadow-inner"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-white text-sm pl-1 font-medium">Phone</label>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium transition-shadow shadow-inner"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-white text-sm pl-1 font-medium">Country</label>
                  <input
                    type="text"
                    placeholder="Your country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-white text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium transition-shadow shadow-inner"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-white text-sm pl-1 font-medium">Password *</label>
                  <input
                    type="password"
                    placeholder="Enter password (min 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full bg-white text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium transition-shadow shadow-inner"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-1">
                  <label className="text-white text-sm pl-1 font-medium">Enter Your Username</label>
                  <input
                    type="text"
                    placeholder="User ID"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full bg-white text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium transition-shadow shadow-inner"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-white text-sm pl-1 font-medium">Enter Your Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-white text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium transition-shadow shadow-inner"
                  />
                </div>

                <div className="flex items-center gap-2 pl-1 py-1">
                  <input type="checkbox" id="remember" className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer" />
                  <label htmlFor="remember" className="text-white font-bold text-sm cursor-pointer select-none">Remember Me</label>
                </div>

                <div className="space-y-1">
                  <label className="text-white text-sm pl-1 font-medium">Enter Captcha *</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-purple-100/90 rounded-lg flex items-center justify-center relative overflow-hidden select-none border border-purple-300">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes-light.png')] opacity-20"></div>
                      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                        <line x1="0" y1="100%" x2="100%" y2="0" stroke="purple" strokeWidth="1" />
                        <line x1="0" y1="0" x2="100%" y2="100%" stroke="purple" strokeWidth="1" />
                      </svg>
                      <div className="relative z-10 font-mono text-2xl font-black text-purple-800 tracking-[0.2em] transform -rotate-2 drop-shadow-sm" style={{ fontFamily: 'Courier New, monospace' }}>6898</div>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter Captcha"
                      value={captcha}
                      onChange={(e) => setCaptcha(e.target.value)}
                      className="w-full bg-white text-gray-900 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium text-center transition-shadow shadow-inner"
                    />
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#b02dad] to-[#9333ea] hover:from-[#c03eae] hover:to-[#a855f7] text-white font-bold py-3.5 rounded-lg shadow-[0_4px_14px_0_rgba(192,62,174,0.39)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 mt-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Sign In')}
            </button>
          </form>

          <div className="mt-8 text-center space-y-4 relative z-10 pb-4">
            {!isSignUp && (
              <button
                type="button"
                onClick={() => alert('Password reset functionality coming soon!')}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-base w-full py-3 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer border border-[#d946ef]/50"
              >
                Forgot Password?
              </button>
            )}
            <div className="bg-white/10 rounded-lg p-4 border border-white/20">
              <div className="flex flex-col items-center gap-3">
                <span className="text-white text-base font-medium">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError('');
                    setEmail('');
                    setUsername('');
                    setPassword('');
                    setName('');
                    setPhone('');
                    setCountry('');
                    setCaptcha('');
                  }}
                  className="bg-gradient-to-r from-[#d946ef] to-[#e879f9] hover:from-[#e879f9] hover:to-[#d946ef] text-white font-bold text-base px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
                >
                  {isSignUp ? 'Sign In Here' : 'Sign Up Here'}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Glow */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-purple-500/40 blur-[50px] pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};