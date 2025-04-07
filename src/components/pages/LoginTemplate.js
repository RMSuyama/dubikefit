import React, { useState, useEffect } from 'react';
import '../pages/Login.css';

import firebase from '../../config/firebase';
import 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [mensagem, setMensagem] = useState('');

  function LoginUsuario() {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, senha)
      .then(function (firebaseUser) {
        setLoggedIn(true);
        setMensagem('Login bem-sucedido');
        // sucesso
        window.location.href = '/home'; // Redireciona para a rota /home
      })
      .catch(function (error) {
        setMensagem(`Erro ao fazer login: ${error.message}`);
        // erro
      });
  }

  function alterarEmail(event) {
    setEmail(event.target.value);
  }

  function alterarSenha(event) {
    setSenha(event.target.value);
  }

  useEffect(() => {
    if (mensagem) {
      const timeout = setTimeout(() => {
        setMensagem('');
      }, 2500);

      return () => clearTimeout(timeout);
    }
  }, [mensagem]);

  return (
    <div className="cardLog text-center">
      <div className='card'>
        <div className="SPRT">SPRT - Sistema Planejamento e Recuperação Tributária</div>
      </div>      
      <div className='card'>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input onChange={alterarEmail} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
            <div id="emailHelp" className="form-text">Nunca compartilhe sua senha.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input onChange={alterarSenha} type="password" className="form-control" id="exampleInputPassword1"></input>
          </div>

          <button type="button" className="btn btn-dark" onClick={LoginUsuario}>Entrar</button>
          {mensagem && <div className="alerta" class="alert alert-dark" role="alert">{mensagem}</div>}
        </form>
      </div>
    </div>
  );
}

export default Login;
