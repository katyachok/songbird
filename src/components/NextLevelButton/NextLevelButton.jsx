import React from "react";
import styled from "styled-components";

const NextLevelButton = () => {
  return <Button>Next level</Button>;
};

export { NextLevelButton };

const Button = styled.div`
  width: 100%;
  margin: 25px 15px;
  padding: 6px 12px;
  text-align: center;
  color: #fff;
  background-color: #303030;
  border: 1px solid #444;
  border-radius: 0.25rem;
  cursor: auto;
  transition: 0.3s;
`;
