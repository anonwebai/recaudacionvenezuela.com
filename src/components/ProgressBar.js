// src/components/ProgressBar.js

import React from 'react';
import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: var(--color-borde);
  border-radius: 20px;
  overflow: hidden;
  margin-top: 1rem;
`;

const Progress = styled.div`
  height: 20px;
  background: linear-gradient(90deg, var(--color-secundario), var(--color-primario));
  width: ${(props) => props.percentage}%;
  transition: width 1s ease-in-out;

  @media (max-width: 480px) {
    height: 15px;
  }
`;

const ProgressText = styled.p`
  margin-top: 0.5rem;
  font-size: 1rem;
  color: var(--color-texto-principal);
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const ProgressBar = ({ current, goal, donations }) => {
  const percentage = Math.min(((current / goal) * 100).toFixed(2), 100);
  const formattedDonations = donations ? donations.toLocaleString() : '0';

  return (
    <>
      <ProgressBarContainer>
        <Progress percentage={percentage} />
      </ProgressBarContainer>
      <ProgressText>
        ¡Hemos alcanzado el {percentage}% de nuestra meta con {formattedDonations} donaciones!
      </ProgressText>
    </>
  );
};

export default ProgressBar;



