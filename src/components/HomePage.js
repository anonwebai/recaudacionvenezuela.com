// src/components/HomePage.js

import React from 'react';
import styled from 'styled-components';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

import useBalances from '../hooks/useBalances';
//import { generateTransactions } from '../utils/generateTransactions';

import AnimatedCounter from './AnimatedCounter';
import NewsTicker from './NewsTicker';
import ProgressBar from './ProgressBar';
import DonationStats from './DonationStats';

import BackgroundImage from '../images/background.jpg';


const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: url(${BackgroundImage}) center/cover no-repeat fixed;
  color: var(--color-texto-principal);
  font-family: 'Roboto', sans-serif;
  position: relative;
  overflow-x: hidden;

  @media (max-width: 768px) {
    background-attachment: scroll;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(18, 18, 18, 0.7); /* Fondo Principal Transparente */
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 0;
  line-height: 1.2;
  font-family: 'Poppins', sans-serif;
  color: var(--color-texto-principal);
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.7);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-top: 0.5rem;
  color: var(--color-texto-secundario);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const MetricsSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  gap: 1.5rem;

  @media (min-width: 481px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
  }
`;

const TotalRaised = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 480px) {
    margin-bottom: 1rem;
  }
`;

const Footer = styled.footer`
  text-align: center;
  font-size: 1rem;
  padding: 1.5rem 0;
  color: var(--color-texto-principal);
  background-color: rgba(18, 18, 18, 0.9);
  width: 100%;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const ExternalLink = styled.a`
  color: var(--color-secundario);
  text-decoration: none;

  &:hover {
    color: var(--color-hover);
    text-decoration: underline;
  }
`;

const HomePage = () => {
  const balances = useBalances();
  const [showConfetti, setShowConfetti] = React.useState(false);
  const { width, height } = useWindowSize();

  // Generar transacciones simuladas con mensajes alentadores
  //const transactions = React.useMemo(() => generateTransactions(100), []);

  React.useEffect(() => {
    if (balances.sumTotal >= balances.finalGoal && balances.finalGoal !== null) {
      setShowConfetti(true);
    }
  }, [balances.sumTotal, balances.finalGoal]);

  return (
    <Container>
      <Overlay />
      {showConfetti && <Confetti width={width} height={height} />}
      <Content>
        <Header>
          <Title>Recaudación Venezuela</Title>
          <Subtitle>
            Seguimiento de donaciones de{' '}
            <ExternalLink
              href="https://yacasivenezuela.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              yacasivenezuela.com
            </ExternalLink>
          </Subtitle>
        </Header>

        {/*<NewsTicker transactions={transactions} />*/}

        <MetricsSection>
          <TotalRaised>
            <AnimatedCounter
              title="Total Recaudado"
              value={balances.sumTotal}
              prefix="$"
              duration={2.5}
              large
            />
            {balances.finalGoal && balances.sumTotal && (
              <ProgressBar
                current={balances.sumTotal}
                goal={balances.finalGoal}
                donations={balances.transactionCount}
              />
            )}
          </TotalRaised>

          <DonationStats
            fiatTotal={balances.totalFiat}
            cryptoTotal={balances.totalCrypto}
            fiatCount={balances.fiatDonationCount}
            cryptoCount={balances.cryptoDonationCount}
          />
        </MetricsSection>
      </Content>

      <Footer>
        &copy; {new Date().getFullYear()} Recaudación Venezuela. Todos los derechos reservados.
      </Footer>
    </Container>
  );
};

export default HomePage;