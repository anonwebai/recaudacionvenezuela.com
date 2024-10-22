// src/components/NewsTicker.js

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaDonate } from 'react-icons/fa';

const TickerContainer = styled.div`
  width: 100%;
  overflow: hidden;
  background: rgba(255, 215, 0, 0.15); /* Fondo Secundario Transparente (Ajustado a 0.15) */
  padding: 0.7rem 0;
  margin-bottom: 1rem;
  border-top: 1px solid var(--color-borde);
  border-bottom: 1px solid var(--color-borde);
  border-radius: 8px;
`;

const scroll = keyframes`
  0% { transform: translate3d(100%, 0, 0); }
  100% { transform: translate3d(-100%, 0, 0); }
`;

const TickerContent = styled.div`
  display: flex;
  align-items: center;
  animation: ${scroll} 20s linear infinite; /* Velocidad Reducida */
  white-space: nowrap;
  will-change: transform; /* Optimización de Renderizado */
  transform: translateZ(0); /* Fuerza la aceleración por hardware */
`;

const NewsItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 3rem;
  font-size: 1rem;
  color: var(--color-texto-principal);
  -webkit-font-smoothing: antialiased; /* Mejora la renderización en WebKit */
  -moz-osx-font-smoothing: grayscale; /* Mejora la renderización en Mozilla */
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-right: 2rem;
  }
`;

const DonateIcon = styled(FaDonate)`
  margin-right: 0.5rem;
  color: var(--color-secundario);
  font-size: 1.4rem; /* Aumento del Tamaño */
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const NewsTicker = ({ transactions }) => {
  const newsItems = transactions.map(
    (tx) => `"${tx.message}" - $${tx.amount.toFixed(2)}`
  );

  if (newsItems.length === 0) {
    newsItems.push('¡Sé el primero en donar y compartir tu mensaje aquí!');
  }

  return (
    <TickerContainer>
      <TickerContent>
        {newsItems.concat(newsItems).map((item, index) => (
          <NewsItem key={index}>
            <DonateIcon aria-label="Ícono de Donación" />
            {item}
          </NewsItem>
        ))}
      </TickerContent>
    </TickerContainer>
  );
};

export default NewsTicker;

