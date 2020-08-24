import React from "react";
import { pages } from "../../../constants";
import styled from "styled-components";

const Pagination = ({ currentPage }) => {
  return (
    <Container>
      {pages.map((page) => (
        <Page key={page} isCurrentPage={page === currentPage}>
          {page}
        </Page>
      ))}
    </Container>
  );
};

export { Pagination };

const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  max-width: 1140px;
  margin-bottom: 25px;
  padding: 0;
  border-radius: 5px;
  overflow: hidden;
`;

const Page = styled.li`
  padding: 0.5rem 0.75rem;
  text-align: center;
  list-style-type: none;
  line-height: 1.25;
  color: #fff;
  background-color: ${({ isCurrentPage }) =>
    isCurrentPage ? "#00bc8c" : "#008966"};
`;
