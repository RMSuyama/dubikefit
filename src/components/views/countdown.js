import React, { useEffect, useState } from 'react';
import "../views/countdown.css"


const Countdown = () => {
  const targetDate = new Date('2025-07-03');
  const currentDate = new Date();
  const timeDifference = targetDate.getTime() - currentDate.getTime();
  const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  const [countdown, setCountdown] = useState(daysRemaining);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000 * 60 * 60 * 24);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (

    <div className="card text-center">

    <div id='count' className="card-footer text-body-secondary">
      {countdown > 0 ? (
        <h5 className="card-title">{countdown} dias restantes até o aniversário do Rafael!</h5>
      ) : (
        <p className="card-text">O recesso chegou!</p>
      )}
    </div>
  </div>
  );
};

export default Countdown;
