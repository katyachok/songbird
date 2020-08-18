import React from "react";
import { birds } from "../../constants";
import styled from "styled-components";

const AnswerVariants = ({ setActiveAnswer }) => {
  const handleAnswer = (bird) => {
    console.log("bird", bird);
    setActiveAnswer(bird);
  };
  return (
    <List>
      {birds.training.map((bird) => (
        <Answer key={bird.name} onClick={() => handleAnswer(bird.name)}>
          <Marker></Marker>
          {bird.name}
        </Answer>
      ))}
    </List>
  );
};

export { AnswerVariants };

const List = styled.ul`
  padding: 0;
  list-style-type: none;
  border-radius: 0.25rem;
  border: 1px solid #555;
`;

const Answer = styled.li`
  display: grid;
  grid-template-columns: 10px auto;
  grid-gap: 16px;
  align-items: center;
  padding: 0.85rem 1.25rem;
  color: white;
  background-color: #303030;
  border-bottom: 1px solid #555;

  &:last-of-type {
    border-bottom: none;
  }
`;

const Marker = styled.span`
  width: 10px;
  height: 10px;
  background-color: #444;
  border-radius: 50%;
`;
