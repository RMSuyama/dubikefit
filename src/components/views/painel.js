import React from 'react';
import '../views/painel.css';
import Emp from '../../static/vid/25333-349634274_small.mp4'
import Cont from '../../static/img/plan.jpg'
import Prazo from '../../static/img/prazo.jpg'

const Painel = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="">
        <div className="col">
          <div className="card">
            <video src={Emp}   className="card-img" autoPlay loop muted playsInline></video>
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
