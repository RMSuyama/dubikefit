import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../static/img/logo.png';
import firebase from '../../config/firebase';
import 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  function LoginUsuario() {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, senha)
      .then(() => {
        setMensagem('Login bem-sucedido');
        window.location.href = '/home';
      })
      .catch((error) => {
        setMensagem(`Erro ao fazer login: ${error.message}`);
      });
  }

  function handleSubmit(event) {
    event.preventDefault(); // Evita o recarregamento da página
    LoginUsuario();
  }

  useEffect(() => {
    if (mensagem) {
      const timeout = setTimeout(() => setMensagem(''), 2500);
      return () => clearTimeout(timeout);
    }
  }, [mensagem]);

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      <div className="card shadow-lg" style={{ maxWidth: "450px", width: "100%" }}>
        <div className="card-header bg-white border-0 text-center pt-4">
          <img 
            src={Logo} 
            alt="BikeMetrics Logo" 
            className="img-fluid mb-3" 
            style={{ maxHeight: "120px" }}
          />
          <p className="text-muted">Sistema de Antropometria para Ciclismo</p>
        </div>
        
        <div className="card-body px-4 py-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="form-label">Email</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-envelope"></i>
                </span>
                <input 
                  onChange={(e) => setEmail(e.target.value)} 
                  type="email" 
                  className="form-control" 
                  id="email" 
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="senha" className="form-label">Senha</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-lock"></i>
                </span>
                <input 
                  onChange={(e) => setSenha(e.target.value)} 
                  type="password" 
                  className="form-control" 
                  id="senha" 
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="form-text mt-2">Nunca compartilhe sua senha com terceiros.</div>
            </div>

            <div className="d-grid gap-2 mt-4">
              <button 
                type="submit" 
                className="btn btn-primary py-2"
              >
                Entrar
              </button>
            </div>

            {mensagem && (
              <div className="alert alert-info mt-3" role="alert">
                {mensagem}
              </div>
            )}
          </form>
        </div>
        
        <div className="card-footer bg-white border-0 text-center pb-4">
          <small className="text-muted">© 2025 Half-Blood. Todos os direitos reservados.</small>
        </div>
      </div>
    </div>
  );
}

export default Login;
