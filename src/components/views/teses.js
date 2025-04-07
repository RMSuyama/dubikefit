import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../views/teses.css'

const BuscaTesesJuridicas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults] = useState([]);
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  const handleSearch = () => {
    setAlertType('success');
    setAlertMessage('Pesquisa realizada com sucesso.');
  };

  useEffect(() => {
    if (alertType && alertMessage) {
      const timer = setTimeout(() => {
        setAlertType(null);
        setAlertMessage('');
      }, 2500); // Defina o tempo em milissegundos para o alerta desaparecer (3 segundos neste exemplo)

      return () => clearTimeout(timer);
    }
  }, [alertType, alertMessage]);

  return (
<div id="pesquisas" class="card">
    <div className="container">
      {alertType && (
        <div className={`alert alert-${alertType}`} role="alert">
          {alertMessage}
        </div>
      )}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Digite os termos de pesquisa"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="mb-3">
      <button type="button" class="btn btn-dark" onClick={handleSearch}>Buscar</button>
      </div>
      <div>
        {/* Exiba os resultados da pesquisa */}
        {searchResults.map((result) => (
          <div key={result.id}>{result.title}</div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default BuscaTesesJuridicas;
