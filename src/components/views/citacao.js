import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './citacao.css';

const Citacao = () => {
  const [frases] = useState([
    { frase: 'Quem salva uma vida salva o mundo inteiro.', autor: 'Talmud' },
    { frase: 'A vida é aquilo que acontece enquanto você está ocupado fazendo outros planos.', autor: 'John Lennon' },
    { frase: 'O sucesso é ir de fracasso em fracasso sem perder entusiasmo.', autor: 'Winston Churchill' },
    { frase: 'A melhor maneira de prever o futuro é criá-lo.', autor: 'Peter Drucker' },
    { frase: 'Acredite que você pode e já está no meio do caminho.', autor: 'Theodore Roosevelt' },
    { frase: 'A vida é 10% o que acontece comigo e 90% de como eu reajo a isso.', autor: 'Charles R. Swindoll' },
    { frase: 'Não espere. O momento nunca será o ideal.', autor: 'Napoleon Hill' },
    { frase: 'A persistência é o caminho do êxito.', autor: 'Charles Chaplin' },
    { frase: 'A única maneira de fazer um excelente trabalho é amar o que você faz.', autor: 'Steve Jobs' },
    { frase: 'O verdadeiro fracasso é desistir de tentar.', autor: 'Albert Einstein' },
    { frase: 'Seja a mudança que você quer ver no mundo.', autor: 'Mahatma Gandhi' },
    { frase: 'Tudo o que um sonho precisa para ser realizado é alguém que acredite que ele possa ser.', autor: 'Roberto Shinyashiki' },
    { frase: 'A mente que se abre a uma nova ideia jamais voltará ao seu tamanho original.', autor: 'Albert Einstein' },
    { frase: 'A vida é como andar de bicicleta. Para ter equilíbrio, você precisa se manter em movimento.', autor: 'Albert Einstein' },
    { frase: 'Você nunca é velho demais para definir um novo objetivo ou sonhar um novo sonho.', autor: 'C.S. Lewis' },
    { frase: 'Não é o mais forte que sobrevive, nem o mais inteligente, mas o que melhor se adapta às mudanças.', autor: 'Charles Darwin' },
    { frase: 'A coragem é a resistência ao medo, domínio do medo, e não ausência do medo.', autor: 'Mark Twain' },
    { frase: 'Sonhe grande e ouse fracassar.', autor: 'Norman Vaughan' },
    { frase: 'As grandes ideias surgem da observação dos pequenos detalhes.', autor: 'Augusto Cury' },
    { frase: 'Não importa o quão devagar você vá, desde que não pare.', autor: 'Confúcio' },
    { frase: 'Grandes conquistas exigem grandes riscos.', autor: 'Heráclito' },
    { frase: 'Não coloque limite em seus sonhos. Coloque fé.', autor: 'Desconhecido' },
    { frase: 'Você é mais forte do que pensa e será mais feliz do que imagina.', autor: 'Desconhecido' },
    { frase: 'A disciplina é a ponte entre metas e realizações.', autor: 'Jim Rohn' },
    { frase: 'A paz vem de dentro de você. Não a procure à sua volta.', autor: 'Buda' },
    { frase: 'Conhece-te a ti mesmo e conhecerás o universo e os deuses.', autor: 'Sócrates' },
    { frase: 'A felicidade não está em viver, mas em saber viver.', autor: 'Desconhecido' },
    { frase: 'O que você pensa, você se torna.', autor: 'Buda' },
    { frase: 'A arte é a mentira que nos permite conhecer a verdade.', autor: 'Pablo Picasso' },
    { frase: 'A criatividade é a inteligência se divertindo.', autor: 'Albert Einstein' },
    { frase: 'Música é o silêncio que ganha forma.', autor: 'Desconhecido' },
    { frase: 'Escreva algo que valha a pena ser lido ou faça algo que valha a pena ser escrito.', autor: 'Benjamin Franklin' }
  ]);

  const [indice, setIndice] = useState(() => Math.floor(Math.random() * frases.length));

  useEffect(() => {
    const interval = setInterval(() => {
      let novoIndice;
      do {
        novoIndice = Math.floor(Math.random() * frases.length);
      } while (novoIndice === indice); // Evita repetir a mesma frase
      setIndice(novoIndice);
    }, 5000);

    return () => clearInterval(interval);
  }, [indice, frases.length]);

  const { frase, autor } = frases[indice];

  return (
    <div className="card shadow-sm border-0 p-3 bg-light">
      <div className="card-body">
        <blockquote className="blockquote mb-0 text-center">
          <p className="mb-3">“{frase}”</p>
          <footer className="blockquote-footer">
            <cite title="Fonte">{autor}</cite>
          </footer>
        </blockquote>
      </div>
    </div>
  );
};

export default Citacao;


