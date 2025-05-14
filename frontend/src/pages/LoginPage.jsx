import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { Sparkles, User, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await login(formData);
    
    setIsLoading(false);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8081/oauth2/authorization/google';
  };

  return (
    <div className="mt-0"> {/* Ensuring no margin at the top */}
      <div className="min-h-screen flex">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-[#3B82F6] via-[#38BDF8] p-12 flex-col justify-between">
          <div>
            <div className="flex items-center">
              <Sparkles className="text-white h-8 w-8 mr-2" />
              <span className="text-2xl font-bold text-white">KnowFlow</span>
            </div>
            <div className="mt-16">
              <h1 className="text-4xl font-bold text-white mb-6">Share Your Knowledge, Grow Together</h1>
              <p className="text-white/90 text-lg leading-relaxed">
                Join our community of learners and instructors. Share your expertise, learn from others, and grow your skills.
              </p>
            </div>
          </div>
          <p className="text-white/70">© 2025 KnowFlow. All rights reserved.</p>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Welcome Back!</h2>
              <p className="text-gray-600 mt-2">Please sign in to your account</p>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
                <p className="font-medium">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
                  Username or Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    className="appearance-none bg-white border border-gray-300 rounded-lg w-full py-3 pl-10 pr-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    placeholder="Enter your username or email"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-700 text-sm font-medium" htmlFor="password">
                    Password
                  </label>
                  <a href="#" className="text-sm text-[#3B82F6] hover:text-[#2563EB] transition-colors">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    className="appearance-none bg-white border border-gray-300 rounded-lg w-full py-3 pl-10 pr-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-[#3B82F6] via-[#38BDF8] to-[#10B981] text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-opacity-50 transition-all ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Sign In
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </div>
                )}
              </button>

              <div className="relative flex py-3 items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-opacity-50 transition-all flex items-center justify-center"
              >
                <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" className="w-5 h-5 mr-2" />
                Sign in with Google
              </button>

              <p className="text-center text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-[#3B82F6] hover:text-[#2563EB] font-semibold transition-colors">
                  Create Account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div> 
  );
};

export default LoginPage;
