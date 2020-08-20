import React from "react";
import { Pagination } from "./Pagination";
import styled from "styled-components";

const Header = ({ score = 0, currentPage }) => {
  return (
    <HeaderContainer>
      <HeaderTop>
        <Title>SongBird</Title>
        <Score>Score: {score}</Score>
      </HeaderTop>
      <Pagination currentPage={currentPage}></Pagination>
    </HeaderContainer>
  );
};

export { Header };

const HeaderContainer = styled.header`
  margin: auto;
  max-width: 1140px;
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.5em;
  color: $base-color;
`;

const Score = styled.span`
  margin-left: auto;
  font-size: 1.171875rem;
  font-weight: 500;
  line-height: 1.2;
  color: white;
`;
