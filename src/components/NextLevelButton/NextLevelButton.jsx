import React from "react";
import styled from "styled-components";

const NextLevelButton = ({ enableButton, setPage }) => {
  return (
    <Button disable={!enableButton} onClick={setPage}>
      Next level
    </Button>
  );
};

export { NextLevelButton };

const Button = styled.div`
  margin: 25px auto;
  padding: 6px 12px;
  text-align: center;
  color: #fff;
  background-color: ${({ disable }) => (disable ? "#303030" : "#00bc8c")};
  border: 1px solid #444;
  border-radius: 0.25rem;
  cursor: auto;
  transition: 0.3s;
`;
