import React, { useState, useEffect, useRef } from 'react';
import './login.css';

export default function Login({ show = false, onClose = () => {}, onLogin = () => {} }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const firstInput = useRef(null);

  useEffect(() => {
    if (show && firstInput.current) {
      firstInput.current.focus();
    }
  }, [show]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (show) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [show, onClose]);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email dan password wajib diisi');
      return;
    }

    // Simulate auth (replace with real API call)
    setTimeout(() => {
      onLogin({ email });
    }, 300);
  };

  const onOverlayClick = (e) => {
    if (e.target.classList.contains('login-overlay')) onClose();
  };

  return (
    <div className="login-overlay" onMouseDown={onOverlayClick} role="dialog" aria-modal="true">
      <div className="login-card-wrap">
        <div className="login-card" role="document">
          <button className="login-close" onClick={onClose} aria-label="Tutup">×</button>
          <h2 className="login-title">Login User ReadVerse</h2>

          <form onSubmit={handleSubmit} className="login-form-card">
            <input
              ref={firstInput}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukan Username atau email"
              className="login-input"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukan password"
              className="login-input"
            />

            <div className="login-forgot-wrap">
              <a className="login-forgot" href="#">Lupa password?</a>
            </div>

            {error && <div className="login-error">{error}</div>}

            <button type="submit" className="login-primary">Login</button>

            <div className="login-footer-text">
              Belum punya akun? <a href="#">Daftar</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
