import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import header from '../assets/header.png';
import body from '../assets/body.png';
import backimage from '../assets/background.png';
import Loader from '../components/loader/Loader';
import { FaQuestionCircle } from "react-icons/fa";
import { MdKeyboardArrowRight } from 'react-icons/md';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/user/login`, {
        username,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert('Login successful!');
      navigate('/account');
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response?.data?.message || error.message || 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-main">
      <img src={header} alt="Header" className="login-header-img" />
      <div className="login-hero">
        <div className="login-banneraera">
        <img src={backimage} alt="Background" className="login-back-img" /></div>

        <div className="login-form-area">
          <div className="login-box">

            <h1>LogIn</h1>
            <div className='login-options'>
              <div className='login-option-paragraph'>
              <p> Personal / Business </p>
              </div>
              <div className='login-option-paragraph-sec'>
              <p>Commercial Treasury Center</p></div>
            </div>
            {/* Error Message */}
            {errorMessage && (
              <p
                className="login-error-message"
                style={{
                  color: '#d32f2f',
                  fontSize: '14px',
                  marginTop: '10px',
                  textAlign: 'center',
                  padding: '12px',
                  backgroundColor: '#ffebee',
                  border: '1px solid #fff',
                  borderRadius: '8px',
                  fontWeight: '500',
                  lineHeight: '1.5',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                {errorMessage}
              </p>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin}>
              <div className="login-input-group">
                <input
                  type="text"
                  className="login-input-field"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="User ID"
                  required
                />
              </div>
              <div className="login-input-group">
                <input
                  type="password"
                  className="login-input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="passcode"
                  required
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '15px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '5px',
                    alignItems: 'center',
                  }}
                >
                  <input type="checkbox" name="check" id="rememberMe" />
                  <label htmlFor="rememberMe" style={{ fontWeight: 'normal', fontSize: '12px' }}>
                    Remember User ID
                  </label>
                </div>
                <div className='login-help-link'>
                <a href="#"><FaQuestionCircle className='icon-link-color' /> Help with User ID with Passcode</a></div>
              </div>

              {/* <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  paddingTop: '15px',
                }}
              >
                <a href="#">Forgot Password</a>
              </div> */}

              <br />

              <button className="login-sign-in-btn" type="submit" disabled={loading}>
                {loading ? <Loader /> : 'log In >'}
              </button>
            </form>

            {/* Additional Links */}
            <div className="login-links">
              <div style={{
                display: "flex",
                gap: "10px",
              }}>
                <a href="#" className="login-link">Enroll in M&T online banking</a>
              </div>
              <a href="#" className="login-link">
               More Personal & Business Services<MdKeyboardArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
        
      </div>
      <img src={body} alt="Footer" className="login-body-img" />
    </main>
  );
}

export default Login;