

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {

    const progress = {
        hoursStudied: 50,
        goalsAchieved: 5,
      };


  return (

<div className="card text-center">
  <div className="card-body">
    <h5 className="card-title">Special title treatment</h5>
    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>

  );
};

export default Dashboard;
