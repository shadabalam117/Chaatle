import React, { useState, useEffect } from 'react';
import { auth } from './firebase/firebaseConfig';

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [user, setUser] = useState(null);

  // Handle login with phone number and send OTP
  const handleLogin = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        console.log('reCAPTCHA solved:', response);
      },
    });

    const appVerifier = window.recaptchaVerifier;
    auth.signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        alert('OTP sent!');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Handle OTP verification
  const handleVerify = () => {
    const confirmationResult = window.confirmationResult;
    confirmationResult.confirm(verificationCode)
      .then((result) => {
        setUser(result.user);  // Successfully logged in
      })
      .catch((error) => {
        console.error('Error during verification:', error);
      });
  };

  useEffect(() => {
    if (user) {
      console.log('User logged in:', user.phoneNumber);
    }
  }, [user]);

  return (
    <div className="App">
      <h1>WhatsApp Clone</h1>
      <div id="recaptcha-container"></div>  {/* Invisible reCAPTCHA container */}

      {!user ? (
        <div>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
          />
          <button onClick={handleLogin}>Send OTP</button>

          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter OTP"
          />
          <button onClick={handleVerify}>Verify OTP</button>
        </div>
      ) : (
        <div>
          <h2>Welcome, {user.phoneNumber}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
