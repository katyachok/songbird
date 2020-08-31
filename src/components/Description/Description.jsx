import React, { useState, useEffect } from "react";
import { Player } from "../Player";
import { flickrAPI } from "../../constants";
import { birds } from "../../constants";
import styled from "styled-components";

const Description = ({ activeAnswer, correctAnswerVoice, page }) => {
  const [photo, setPhoto] = useState(null);
  const [bird, setBird] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${flickrAPI}${activeAnswer}`);
      const data = await response.json();
      setPhoto(data.photos.photo[0]);
      const birdData = birds[page].filter(({ name }) => name === activeAnswer);
      setBird(birdData.length && birdData[0]);
    }
    fetchData();
  }, [activeAnswer]);

  return (
    <Container>
      {!activeAnswer && (
        <Instruction>
          <span>Послушайте плеер.</span>
          <span>Выберите птицу из списка</span>
        </Instruction>
      )}
      {activeAnswer && (
        <>
          <Columns>
            <Image
              src={photo.url_m}
              width={photo.width_m}
              height={photo.height_m}
            ></Image>
            <Info>
              <Title>{activeAnswer}</Title>
              <Text>{bird.species}</Text>
              <Player
                src={correctAnswerVoice.file}
                duration={correctAnswerVoice.length}
              ></Player>
            </Info>
          </Columns>
          <Text>{bird.description}</Text>
        </>
      )}
    </Container>
  );
};

export { Description };

const Container = styled.div`
  padding: 1rem;
  border-radius: 0.25rem;
  border: 1px solid #555;
`;

const Instruction = styled.p`
  margin: 0;
  color: white;

  span {
    display: block;
  }
`;

const Image = styled.img`
  width: 200px;
  height: 155px;
  margin: 0 auto;
  border-radius: 10px;
  object-fit: cover;
`;

const Text = styled.p`
  margin-top: 0;
  margin-bottom: 1rem;
  padding: 0.25rem;
  font-size: 1rem;
  line-height: 22.5px;
  color: white;
`;

const Columns = styled.div`
  display: grid;
  grid-gap: 2rem;
  min-height: 173px;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Title = styled.h3`
  margin: 0;
  padding: 0.25rem 0.25rem 0.5rem;
  font-size: 1.40625rem;
  color: white;
  font-weight: 500;
  line-height: 1.2;
`;

const Info = styled.div`
  text-align: center;
  h3,
  p {
    border-bottom: 1px solid #555;
  }

  @media (min-width: 768px) {
    text-align: left;
  }
`;
