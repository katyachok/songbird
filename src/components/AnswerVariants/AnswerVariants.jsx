import React from "react";
import { birds } from "../../constants";
import { Answer } from "./Answer";
import styled from "styled-components";

const AnswerVariants = ({ currentPage, correctAnswer, setActiveAnswer }) => {
  return (
    <List>
      {birds[currentPage].map((bird) => (
        <Answer
          bird={bird}
          key={bird.name}
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
