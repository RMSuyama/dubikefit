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
    }).catch((error) => {
      console.log("erro");
      console.log(error);
    });
  }

  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow-sm">
      <div className="container-fluid">
        <Link to="/home" className="navbar-brand d-flex align-items-center">
          <img src={Logo} alt="Logo DU BIKE CENTER" className="navbar-logo" />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/edital">Gerenciar Atletas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/rotina">Bike Fit</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/resumos">Dicas</Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-danger ms-3" onClick={handleLogout}>Log-out</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
