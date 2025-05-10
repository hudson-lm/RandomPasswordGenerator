import React, { useEffect, useRef, useState } from 'react';
import styled, {keyframes} from 'styled-components';
import ParticlesComponent from './Component/particles.js';
import CustomizePassword from './Component/customizePassword.js';

const Container = styled.div`
`;

const glowUnglow = keyframes`
  0% {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #FFA500, 0 0 40px #FFA500, 0 0 80px #FFA500;
  }
  50% {
    text-shadow: 0 0 0px #fff, 0 0 0px #fff, 0 0 0px #FFA500, 0 0 0px #FFA500, 0 0 0px #FFA500;
  }
  100% {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #FFA500, 0 0 40px #FFA500, 0 0 80px #FFA500;
  }
`;

const ParticlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const TitleWrapper = styled.div`
  font-size: 3rem;
  text-align: center;
  color: white;
  animation: ${glowUnglow} 3s infinite;
  margin: 5% 0 1.5rem;
`;

const DescWrapper = styled.div`
  font-size: 2rem;
  text-align: center;
  color: white; 
  padding: 0 1rem;
  margin-bottom: 10%;
`;

const DescWrapper2 = styled.div`
  font-size: 1.5rem;
  text-align: center;
  color:white;
`;

function App() {
  return (
    <Container>
      <ParticlesContainer>
        <ParticlesComponent id="particles" />
      </ParticlesContainer>
      <TitleWrapper>Random Password Generator</TitleWrapper>
      <DescWrapper>
        You have no idea about what passwords to make?
        Don't worry we will help you to create you one!
      </DescWrapper>

      <Container style={{'margin':'0 3%'}}>
          <CustomizePassword/>
      </Container>
      <DescWrapper2>Copyright&#169; 2025 Hudson Lois</DescWrapper2>
    </Container>
  );
}

export default App;