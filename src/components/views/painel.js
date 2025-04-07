import React from 'react';
import '../views/painel.css';
import Emp from '../../static/vid/25333-349634274_small.mp4'
import Logo from '../../static/img/logo.png';


const Painel = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="">
        <div className="col">
        <div className="card border-0">
        <img src={Logo} className="img-fluid w-25 d-block mx-auto border" alt="Logo" />
          <div className="card-body">
              <h5 className="card-title"></h5>
              <p className="card-text">
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Painel;
