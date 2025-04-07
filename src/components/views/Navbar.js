import React from 'react';
import firebase from '../../config/firebase';
import 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from '../../static/img/logo.png';

const Navbar = () => {
  function handleLogout() {
    firebase.auth().signOut().then(() => {
      console.log("deslogado");
      window.location.href = '/'; // Redireciona para página de login após logout
    }).catch((error) => {
      console.log("erro");
      console.log(error);
    });
  }

  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow-sm">
      <div className="container-fluid">
        <Link to="/dashboard" className="navbar-brand d-flex align-items-center">
          <img src={Logo} alt="BikeMetrics Logo" className="navbar-logo" />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownAtletas" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Gerenciar Atletas
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownAtletas">
                <li><Link className="dropdown-item" to="/atletas/cadastrar">Cadastrar Atleta</Link></li>
                <li><Link className="dropdown-item" to="/atletas/listar">Listar Atletas</Link></li>
                <li><hr className="dropdown-divider" /></li>
              </ul>
            </li>
            
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownBikeFit" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Bike Fit
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownBikeFit">
                <li><Link className="dropdown-item" to="/bikefit/speed">Speed</Link></li>
                <li><Link className="dropdown-item" to="/bikefit/mtb">Mountain Bike</Link></li>
                <li><Link className="dropdown-item" to="/bikefit/triatlo">Triatlo</Link></li>
              </ul>
            </li>
            
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownRelatorios" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Relatórios
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownRelatorios">
                <li><Link className="dropdown-item" to="/relatorios/individual">Relatórios Individuais</Link></li>
                <li><Link className="dropdown-item" to="/relatorios/comparativo">Comparativo de Evolução</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/relatorios/exportar">Exportar Dados</Link></li>
              </ul>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/dicas">Dicas</Link>
            </li>
            
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownConta" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-person-circle"></i>
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownConta">
                <li><Link className="dropdown-item" to="/perfil">Meu Perfil</Link></li>
                <li><Link className="dropdown-item" to="/configuracoes">Configurações</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item text-danger" onClick={handleLogout}>Sair</button></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;