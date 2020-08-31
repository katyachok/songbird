import React from "react";
import { Emoji } from "../Emoji";
import { maxScore } from "../../constants";
import styled from "styled-components";

const FinalPage = ({ score, resetGame }) => {
  return (
    <Page>
      <Title>Поздравляем!</Title>
      <span>
        Вы прошли викторину и набрали {score} из {maxScore} возможных баллов
      </span>
      {score === maxScore && (
        <h3>
          теперь ты знаешь кто чирикнул
          <Emoji symbol="🙂" label="smile" />
          <Emoji symbol="🙃" label="smile" />
          <Emoji symbol="😉" label="smile" />
        </h3>
      )}
      {score !== maxScore && (
        <Button onClick={resetGame}>Попробовать еще раз!</Button>
      )}
    </Page>
  );
};
export { FinalPage };

const Page = styled.div`
  padding: 4rem 2rem;
  text-align: center;
  color: white;
  background-color: #303030;
  border-radius: 0.3rem;
`;

const Title = styled.h1`
  font-size: 4.5rem;
  font-weight: 300;
  line-height: 1.2;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  margin: 25px 0;
  color: white;
  background-color: #00bc8c;
  border: none;
`;
