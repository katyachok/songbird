import React from "react";
import { Pagination } from "./Pagination";
import LogoSvg from "../../assets/logo.svg";
import styled from "styled-components";

const Header = ({ score = 0, currentPage }) => {
  return (
    <HeaderContainer>
      <HeaderTop>
        <Logo src={LogoSvg} alt="logo"></Logo>
        <Score>Score: {score}</Score>
      </HeaderTop>
      <Pagination currentPage={currentPage}></Pagination>
    </HeaderContainer>
  );
};

export { Header };

const HeaderContainer = styled.header`
  margin: 0.5rem auto 0;
  max-width: 720px;

  @media (min-width: 992px) {
    max-width: 960px;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 200px;
  height: 55px;
  background-size: contain;
  background-repeat: no-repeat;
`;

const Score = styled.span`
  margin-left: auto;
  font-size: 1.171875rem;
  font-weight: 500;
  line-height: 1.2;
  color: white;
`;
