// src/components/DonationStats.js

import React from 'react';
import styled from 'styled-components';
import CountUp from 'react-countup';
import { FaDonate, FaBitcoin } from 'react-icons/fa';

const StatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  width: 100%;
  padding: 0;

  @media (max-width: 768px) {
    gap: 1rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const StatCard = styled.div`
  background: rgba(30, 144, 255, 0.1); /* Fondo Primario Transparente */
  border-radius: 12px;
  flex: 1 1 300px;
  text-align: left;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    flex: 1 1 45%;
  }

  @media (max-width: 480px) {
    flex: 1 1 100%;
    width: 100%;
  }
`;


const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    justify-content: center;
  }
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  color: ${(props) => props.color || 'var(--color-primario)'};
  margin-right: 0.5rem;
  margin-top: 3px;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const StatTitle = styled.h3`
  font-size: 1.7rem;
  color: var(--color-texto-principal);
  font-family: 'Poppins', sans-serif;
  text-align: left;

  @media (max-width: 480px) {
    font-size: 1.5rem;
    text-align: center;
  }
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--color-texto-principal);
  font-family: 'Roboto Mono', monospace;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  margin-bottom: 0.5rem;

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const StatCount = styled.div`
  font-size: 1.2rem;
  color: var(--color-texto-secundario);
  font-family: 'Roboto', sans-serif;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const DonationStats = ({ fiatTotal, cryptoTotal, fiatCount, cryptoCount }) => {
  return (
    <StatsContainer>
      <StatCard>
        <Header>
          <IconWrapper color="var(--color-secundario)">
            <FaDonate aria-label="Donación en Fiat" />
          </IconWrapper>
          <StatTitle>Convencional</StatTitle>
        </Header>
        <StatValue>
          <CountUp
            start={0}
            end={fiatTotal}
            duration={2.5}
            separator=","
            prefix="$"
            decimals={2}
            decimal="."
          />
        </StatValue>
        <StatCount>
          <CountUp
            start={0}
            end={fiatCount}
            duration={2.5}
            separator=","
          />{' '}
          Donaciones
        </StatCount>
      </StatCard>

      {/* Tarjeta para Donaciones en Crypto */}
      <StatCard>
        <Header>
          <IconWrapper color="var(--color-secundario)">
            <FaBitcoin aria-label="Donación en Crypto" />
          </IconWrapper>
          <StatTitle>Criptomoneda</StatTitle>
        </Header>
        <StatValue>
          <CountUp
            start={0}
            end={cryptoTotal}
            duration={2.5}
            separator=","
            prefix="$"
            decimals={2}
            decimal="."
          />
        </StatValue>
        <StatCount>
          <CountUp
            start={0}
            end={cryptoCount}
            duration={2.5}
            separator=","
          />{' '}
          Donaciones
        </StatCount>
      </StatCard>
    </StatsContainer>
  );
};

export default DonationStats;

