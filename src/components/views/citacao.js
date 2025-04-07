import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './citacao.css'

const Citacao = () => {
  const [frases, setFrases] = useState([
    {
      frase: 'Quem salva uma vida salva o mundo inteiro.',
      autor: 'Talmud'
    },
    {
      frase: 'A vida é aquilo que acontece enquanto você está ocupado fazendo outros planos.',
      autor: 'John Lennon'
    },
    {
      frase: 'O sucesso é ir de fracasso em fracasso sem perder entusiasmo.',
      autor: 'Winston Churchill'
    },
    {
      frase: 'A melhor maneira de prever o futuro é criá-lo.',
      autor: 'Peter Drucker'
    },
    {
      frase: 'Acredite que você pode e já está no meio do caminho.',
      autor: 'Theodore Roosevelt'
    },
    {
      frase: 'A vida é 10% o que acontece comigo e 90% de como eu reajo a isso.',
      autor: 'Charles R. Swindoll'
    },
    {
      frase: 'Não espere. O momento nunca será o ideal.',
      autor: 'Napoleon Hill'
    },
    {
      frase: 'A persistência é o caminho do êxito.',
      autor: 'Charles Chaplin'
    },
    {
      frase: 'A única maneira de fazer um excelente trabalho é amar o que você faz.',
      autor: 'Steve Jobs'
    },
    {
      frase: 'O verdadeiro fracasso é desistir de tentar.',
      autor: 'Albert Einstein'
    },
    // Adicione mais frases aqui
  ]);

  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndice(prevIndice => (prevIndice + 1) % frases.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [frases]);

  const { frase, autor } = frases[indice];

  return (
    <div className="card">
      <div className="card-body">
        <blockquote className="blockquote mb-0">
          <p>{frase}</p>
          <footer className="blockquote-footer">Frase retirada do <cite title="Source Title">{autor}</cite></footer>
        </blockquote>
      </div>
    </div>
  );
};

export default Citacao;

