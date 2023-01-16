import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #111;

  & > * {
    margin: 0 auto;
    padding: 20px;
    width: 100%;
    max-width: 1000px;
  }
`;

const StyledTitle = styled.h2`
  color: white;
  font-size: 26px;
  font-weight: 600;
`;

const StyledCard = styled.div`
  padding: 40px;
  background-color: #222222;
  border-radius: 10px;
`;

function App() {
  return (
    <div className="App">
      <StyledContainer>
        <header>
          <StyledTitle>Add Maps</StyledTitle>
        </header>
        <main>
          <StyledCard></StyledCard>
        </main>
      </StyledContainer>
    </div>
  );
}

export default App;
