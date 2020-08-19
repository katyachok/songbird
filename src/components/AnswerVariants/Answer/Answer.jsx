import React, { useState } from "react";
import styled from "styled-components";

const Answer = ({ bird, correctAnswer, setActiveAnswer }) => {
  const [wasAnswered, setWasAnswered] = useState(false);
  const handleAnswer = () => {
    setActiveAnswer(bird.name);
    setWasAnswered(true);
  };
  return (
    <AnswerItem onClick={handleAnswer}>
      <Marker
        isAnswerCorrect={correctAnswer === bird.name}
        wasAnswered={wasAnswered}
      ></Marker>
      {bird.name}
    </AnswerItem>
  );
};

export { Answer };

const AnswerItem = styled.li`
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
  background-color: ${({ isAnswerCorrect, wasAnswered }) =>
    !wasAnswered ? "#444444" : isAnswerCorrect ? "#444444" : "#d62c1a"};
  border-radius: 50%;
`;
