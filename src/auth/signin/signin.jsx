import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const Signin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // For navigation after login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // To hold any error messages
  const [showModal, setShowModal] = useState(false); // Modal state

  const client_id = "468771891072-qnne8l94gs488qt2p6448vl9mub0smb4.apps.googleusercontent.com"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        login: email,
        password,
      });

      // Save token to local storage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('roles', response.data.roles);

      // Redirect to users page

      console.log(response.data.roles);

      if(response.data.roles.includes("admin")){
        navigate('/admin'); // Redirect to your users page
      }else if(response.data.roles.includes("client")){

        navigate('/marketing'); // Redirect to your users page
      }


      window.location.reload(); // Refresh the page to fetch any necessary data

    } catch (err) {
      setError(t(`signin.${err.response?.data?.message}`) || 'Login failed. Please try again.');
    }
  };

  // Handle Google login success
  const handleGoogleLoginSuccess = (res) => {
    console.log('Google login successful:', res.profileObj);
    // You can now send this token to your backend for further validation
  };

  const onFailure = (res) => {
    console.log('login failed! res: ', res);
  }

  return (
    <section className="bg-light p-3 p-md-4 p-xl-5 mt-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-xxl-11">
            <div className="card border-light-subtle shadow-sm">
              <div className="row g-0">
                {/* Left Image Section */}
                <div className="col-12 col-md-6">
                  <img
                    className="img-fluid rounded-start w-100 h-100 object-fit-cover"
                    loading="lazy"
                    src="/images/backgrounds/login.jpg"
                    alt={t('signin.altText')}
                  />
                </div>

                {/* Right Login Section */}
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <div className="col-12 col-lg-11 col-xl-10">
                    <div className="card-body p-3 p-md-4 p-xl-5">
                      <div className="mb-5 text-center">
                        <a href="#!">
                          <img src="\images\logos\Full logo\PNG\Black on Orange.png" alt="Logo" width="156" />
                        </a>
                        <h4>{t('signin.welcome')}</h4>
                      </div>

                      {/* Error Message */}
                      {error && <div className="alert alert-danger">{error}</div>}

                      {/* Social Login */}
                      <div className="d-flex gap-3 flex-column">
                        <button className="btn btn-lg btn-outline-dark" onClick={() => setShowModal(true)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                          </svg>
                          <span className="ms-2 fs-6">{t('signin.googleLogin')}</span>
                        </button>
                      </div>

                      {/* Modal for Google Login */}
                      <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                          <Modal.Title>{t('signin.googleLogin')}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <GoogleOAuthProvider clientId={client_id}>
                            <GoogleLogin
                              onSuccess={handleGoogleLoginSuccess}
                              onError={() => console.log('Google login failed')}
                            />
                          </GoogleOAuthProvider>
                        </Modal.Body>
                      </Modal>

                      <p className="text-center mt-4 mb-5">{t('signin.orSignIn')}</p>

                      {/* Login Form */}
                      <form onSubmit={handleSubmit}>
                        <div className="row gy-3">
                          <div className="col-12">
                            <div className="form-floating mb-3">
                              <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                placeholder={t('signin.emailPlaceholder')}
                                required
                              />
                              <label htmlFor="email">{t('signin.emailLabel')}</label>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-floating mb-3">
                              <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                placeholder={t('signin.passwordPlaceholder')}
                                required
                              />
                              <label htmlFor="password">{t('signin.passwordLabel')}</label>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="d-grid">
                              <button className="btn btn-dark btn-lg" type="submit">
                                {t('signin.loginButton')}
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>

                      <div className="d-flex gap-2 justify-content-center mt-5">
                        <a href="#!" className="link-secondary">{t('signin.createAccount')}</a>
                        <a href="#!" className="link-secondary">{t('signin.forgotPassword')}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
