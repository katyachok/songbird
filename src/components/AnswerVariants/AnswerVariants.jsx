import React from "react";
import { birds } from "../../constants";
import { Answer } from "./Answer";
import styled from "styled-components";

const AnswerVariants = ({ correctAnswer, setActiveAnswer }) => {
  return (
    <List>
      {birds.training.map((bird) => (
        <Answer
          key={bird.name}
          bird={bird}
          correctAnswer={correctAnswer}
          setActiveAnswer={setActiveAnswer}
        />
      ))}
    </List>
  );
};

export { AnswerVariants };

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  border-radius: 0.25rem;
  border: 1px solid #555;
`;
