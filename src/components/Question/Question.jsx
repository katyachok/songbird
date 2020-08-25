import React from "react";
import { Player } from "../Player";
import defaultPhoto from "../../assets/defaultBird.jpg";
import styled from "styled-components";

const Question = ({ src, correctAnswer, activeAnswer, correctAnswerPhoto }) => {
  return (
    <Container>
      <Image
        src={
          correctAnswer === activeAnswer
            ? correctAnswerPhoto.url_m
            : defaultPhoto
        }
      ></Image>
      <Column>
        <Title>{correctAnswer === activeAnswer ? correctAnswer : "***"}</Title>
        <Player src={src}></Player>
      </Column>
    </Container>
  );
};

export { Question };

const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 2rem;
  margin-bottom: 2rem;
  padding: 2rem 1rem;
  background-color: #303030;
  border-radius: 0.3rem;
`;

const Image = styled.img`
  width: 200px;
  height: 155px;
  border-radius: 10px;
  margin: 0;
`;

const Column = styled.div``;

const Title = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.2;
  border-bottom: 1px solid #555;
  color: #ffffff;
`;
