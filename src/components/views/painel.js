import React, { useState } from 'react';
import '../views/painel.css';
import Emp from '../../static/vid/25333-349634274_small.mp4';
import Logo from '../../static/img/logo.png';

const Painel = () => {
  const [userName] = useState('João Silva');
  const [lastSession] = useState('02/04/2025');
  const [upcomingSessions] = useState([
    { date: '10/04/2025', time: '14:00', client: 'Carlos Ferreira' },
    { date: '12/04/2025', time: '10:30', client: 'Ana Souza' }
  ]);
  
  const [bikeFitStats] = useState({
    totalClients: 48,
    sessionsThisMonth: 12,
    averageRating: 4.8
  });

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12 text-center">
          <img 
            src={Logo} 
            className="img-fluid mb-4" 
            style={{ maxWidth: '200px', backgroundColor: "transparent", mixBlendMode: "multiply" }}
            alt="Logo" 
          />
          <p className="lead">Sistema de Gerenciamento de Bike Fit</p>
        </div>
      </div>
      
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="bg-primary rounded-circle p-3 text-white me-3">
                  <i className="fas fa-user-circle fa-2x"></i>
                </div>
                <div>
                  <h5 className="mb-0">Bem-vindo, {userName}</h5>
                  <p className="text-muted mb-0">Última sessão: {lastSession}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mb-4">
        <div className="col-md-4 mb-3 mb-md-0">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Total de Clientes</h5>
              <h2 className="display-4 fw-bold text-primary">{bikeFitStats.totalClients}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3 mb-md-0">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Sessões este mês</h5>
              <h2 className="display-4 fw-bold text-success">{bikeFitStats.sessionsThisMonth}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Avaliação média</h5>
              <h2 className="display-4 fw-bold text-warning">{bikeFitStats.averageRating}</h2>
              <div className="text-warning">
                ★★★★★
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-7 mb-4 mb-md-0">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0">Próximas Sessões</h5>
            </div>
            <div className="card-body">
              {upcomingSessions.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {upcomingSessions.map((session, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{session.client}</strong>
                        <p className="mb-0 text-muted small">{session.date} às {session.time}</p>
                      </div>
                      <div>
                        <button className="btn btn-sm btn-outline-primary me-2">Detalhes</button>
                        <button className="btn btn-sm btn-primary">Iniciar</button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-muted my-4">Não há sessões agendadas.</p>
              )}
            </div>
            <div className="card-footer bg-white text-center">
              <button className="btn btn-primary">Nova Sessão</button>
            </div>
          </div>
        </div>
        
        <div className="col-md-5">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-white">
              <h5 className="mb-0">Tutorial Bike Fit</h5>
            </div>
            <div className="card-body p-0">
              <video className="w-100" controls>
                <source src={Emp} type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            </div>
            <div className="card-footer bg-white">
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted small">Última atualização: 25/03/2025</span>
                <button className="btn btn-sm btn-outline-secondary">Ver todos os tutoriais</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Painel;