// src/components/AnimatedCounter.js

import React from 'react';
import styled from 'styled-components';
import CountUp from 'react-countup';

const CounterContainer = styled.div`
  text-align: center;
  padding: ${(props) => (props.large ? '1.5rem' : '1rem')};
  background: rgba(30, 144, 255, 0.1); /* Fondo Transparente */
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: ${(props) => (props.large ? '1rem' : '0.5rem')};
  width: 100%;
`;


const CounterTitle = styled.h3`
  font-size: ${(props) => (props.large ? '3rem' : '2.5rem')};
  margin: 0;
  font-family: 'Poppins', sans-serif;
  color: var(--color-secundario);

  @media (max-width: 768px) {
    font-size: ${(props) => (props.large ? '2.5rem' : '2rem')};
  }

  @media (max-width: 480px) {
    font-size: ${(props) => (props.large ? '2rem' : '1.5rem')};
  }
`;

const CounterValue = styled.div`
  font-size: ${(props) => (props.large ? '3.5rem' : '2rem')};
  font-weight: bold;
  margin-top: 0.5rem;
  font-family: 'Roboto Mono', monospace;
  color: var(--color-texto-principal);
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: ${(props) => (props.large ? '2.5rem' : '1.5rem')};
  }

  @media (max-width: 480px) {
    font-size: ${(props) => (props.large ? '2rem' : '1.2rem')};
  }
`;

const AnimatedCounter = ({ title, value, prefix = '', duration = 2, large }) => {
  return (
    <CounterContainer large={large}>
      <CounterTitle large={large}>{title}</CounterTitle>
      <CounterValue large={large}>
        {value !== null ? (
          <CountUp
            start={0}
            end={value}
            duration={duration}
            separator=","
            prefix={prefix}
            decimals={2}
            decimal="."
          />
        ) : (
          'Cargando...'
        )}
      </CounterValue>
    </CounterContainer>
  );
};

export default AnimatedCounter;



