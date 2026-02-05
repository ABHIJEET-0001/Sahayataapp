import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, FileText, CheckCircle } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: (userData: any) => void;
  onSwitchToSignup: () => void;
}

export function Login({ onLoginSuccess, onSwitchToSignup }: LoginProps) {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email/Phone validation
    if (!formData.emailOrPhone.trim()) {
      newErrors.emailOrPhone = 'Email or phone number is required';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // Get stored users
      const users = JSON.parse(localStorage.getItem('sahayata_users') || '[]');
      
      // Find user by email or phone
      const user = users.find((u: any) => 
        (u.email === formData.emailOrPhone || u.phone === formData.emailOrPhone) &&
        u.password === formData.password
      );

      if (user) {
        // Successful login
        const sessionData = {
          userId: user.id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          loginTime: new Date().toISOString(),
        };

        // Store session
        if (formData.rememberMe) {
          localStorage.setItem('sahayata_session', JSON.stringify(sessionData));
        } else {
          sessionStorage.setItem('sahayata_session', JSON.stringify(sessionData));
        }

        setIsSubmitting(false);
        onLoginSuccess(user);
      } else {
        // Failed login
        setLoginError('Invalid email/phone or password. Please try again.');
        setIsSubmitting(false);
      }
    }, 1000);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
    // Clear errors
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
    setLoginError('');
  };

  // Demo credentials helper
  const fillDemoCredentials = () => {
    const users = JSON.parse(localStorage.getItem('sahayata_users') || '[]');
    if (users.length > 0) {
      setFormData({
        ...formData,
        emailOrPhone: users[0].email,
        password: users[0].password,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-gradient-to-br from-orange-500 to-green-600 p-3 rounded-2xl mb-4">
            <FileText className="size-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Login to access your Sahayata account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Error Message */}
          {loginError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="size-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-red-900 mb-1">Login Failed</h4>
                <p className="text-sm text-red-700">{loginError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email or Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email or Mobile Number *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.emailOrPhone}
                  onChange={(e) => handleChange('emailOrPhone', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.emailOrPhone
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="Enter email or phone number"
                />
              </div>
              {errors.emailOrPhone && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="size-4" />
                  {errors.emailOrPhone}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.password
                      ? 'border-red-300 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="size-4" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => handleChange('rememberMe', e.target.checked)}
                  className="size-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-orange-500 to-green-600 text-white py-3 rounded-lg font-medium hover:from-orange-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Logging in...
                </>
              ) : (
                <>
                  <CheckCircle className="size-5" />
                  Login
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          {JSON.parse(localStorage.getItem('sahayata_users') || '[]').length > 0 && (
            <div className="mt-4">
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="w-full text-sm text-blue-600 hover:text-blue-700 py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Fill with last registered user
              </button>
            </div>
          )}

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Signup Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToSignup}
                className="text-blue-600 hover:underline font-medium"
              >
                Create one now
              </button>
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-500">
            🔒 Your credentials are stored securely in your browser
          </p>
          <p className="text-xs text-gray-400">
            This is a demo app. In production, use proper backend authentication.
          </p>
        </div>
      </div>
    </div>
  );
}
