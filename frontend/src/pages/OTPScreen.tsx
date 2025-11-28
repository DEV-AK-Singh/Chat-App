import React, { useState, useEffect, useRef } from 'react';
import { Shield, CheckCircle, Lock } from 'lucide-react';
import type { OTPScreenProps } from '../types';

const OTPScreen: React.FC<OTPScreenProps> = ({ onVerified }) => {
  const [phone, setPhone] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [resendTimer, setResendTimer] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handlePhoneSubmit = (): void => {
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length === 10) {
      setStep('otp');
      setResendTimer(30);
      setError('');
    } else {
      setError('Please enter a valid 10-digit phone number');
    }
  };

  const handleOtpChange = (index: number, value: string): void => {
    if (value.length > 1) return;
    const newOtp = otp.split('');
    newOtp[index] = value;
    setOtp(newOtp.join(''));
    
    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async (): Promise<void> => {
    if (otp.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    setLoading(false);
    
    if (otp === '123456') {
      onVerified(phone);
    } else {
      setError('Invalid OTP. Try 123456');
      setOtp('');
    }
  };

  if (step === 'phone') {
    return (
      <div className="w-full h-screen bg-white flex flex-col items-center justify-center p-6">
        <div className="p-4 bg-black rounded-full mb-8">
          <Shield size={40} className="text-white" />
        </div>
        <h1 className="text-3xl font-semibold mb-2 text-black">Secure Verification</h1>
        <p className="text-gray-600 font-light mb-10 text-center">Enter your phone number to get started</p>
        <div className="w-full max-w-sm">
          <input
            type="tel"
            placeholder="98XXXXXX10"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            className="w-full p-4 border-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-gray-800 font-light text-center text-lg"
          />
          {error && <p className="text-red-600 text-sm mb-4 font-light text-center">{error}</p>}
          <button
            onClick={handlePhoneSubmit}
            className="w-full bg-black text-white p-4 rounded-lg font-semibold hover:bg-gray-900 transition"
          >
            Get OTP
          </button>
        </div>
        <div className="mt-10 flex items-center gap-2 text-gray-600 font-light">
          <Lock size={18} />
          <span className="text-sm">Your number is encrypted</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="p-4 bg-black rounded-full mb-8">
        <CheckCircle size={40} className="text-white" />
      </div>
      <h1 className="text-3xl font-semibold mb-2 text-black">Enter OTP</h1>
      <p className="text-gray-600 font-light mb-3">Sent to +91 {phone}</p>
      
      <div className="w-full max-w-sm mt-10">
        <div className="flex gap-2 mb-8 justify-center">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <input
              key={i} 
              ref={(el) => {
                otpInputs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={otp[i] || ''}
              onChange={(e) => handleOtpChange(i, e.target.value)}
              className="w-12 h-12 border-2 border-gray-300 rounded-lg text-2xl text-center font-semibold focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            />
          ))}
        </div>
        
        {error && <p className="text-red-600 text-sm mb-4 text-center font-light">{error}</p>}
        
        <button
          onClick={handleVerify}
          disabled={loading || otp.length !== 6}
          className="w-full bg-black text-white p-4 rounded-lg font-semibold hover:bg-gray-900 transition disabled:opacity-50"
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
        
        <button
          onClick={() => setResendTimer(30)}
          disabled={resendTimer > 0}
          className="w-full mt-4 text-black font-light hover:text-gray-700 transition disabled:text-gray-400 text-sm"
        >
          {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
        </button>
      </div>
      
      <div className="mt-12 text-center text-gray-600 flex flex-col items-center gap-2">
        <CheckCircle size={24} className="text-black" />
        <span className="text-sm font-light">End-to-End Encrypted</span>
      </div>
    </div>
  );
};

export default OTPScreen;