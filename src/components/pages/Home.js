import React from 'react';
import Navbar from '../views/Navbar';
import Citacao from '../views/citacao';
import Countdown from '../views/countdown';
import Painel from '../views/painel';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Citacao />
      <Painel />
      <Countdown />
    </div>
  );
}

export default Home;
