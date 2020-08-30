import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { Header } from "./components/Header";
import { Question } from "./components/Question";
import { AnswerVariants } from "./components/AnswerVariants";
import { Description } from "./components/Description";
import { NextLevelButton } from "./components/NextLevelButton";
import { flickrAPI, pages, VOICE_API, birds, PROXY_URL } from "./constants";
import { randomize } from "./utils/randomize";
import "./styles/styles.css";
import "./styles/sass.scss";

const App = () => {
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [activeAnswer, setActiveAnswer] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [correctAnswerPhoto, setCorrectAnswerPhoto] = useState(null);
  const [correctAnswerVoice, setCorrectAnswerVoice] = useState(null);

  useEffect(() => {
    const randomNumber = randomize(birds[currentPage].length);
    const answer = birds[currentPage][randomNumber];
    setCorrectAnswer(answer);
    async function fetchPhoto({ name }) {
      const response = await fetch(`${flickrAPI}${name}`);
      const data = await response.json();
      setCorrectAnswerPhoto(data.photos.photo[0]);
    }
    async function fetchVoice({ species }) {
      const targetUrl = `${VOICE_API}${species}`;
      const voiceResponse = await fetch(PROXY_URL + targetUrl);
      const data = await voiceResponse.json();
      setCorrectAnswerVoice(data.recordings[0]);
    }
    fetchPhoto(answer);
    fetchVoice(answer);
  }, [currentPage]);

  useEffect(() => {
    console.log("birds[currentPage][randomNumber]", correctAnswer);
    if (!correctAnswer) return;
  }, [correctAnswer]);

  return (
    <>
      <Header currentPage={pages[currentPage]}></Header>
      {correctAnswer && correctAnswerVoice && (
        <main>
          <Question
            activeAnswer={activeAnswer}
            correctAnswer={correctAnswer.name}
            correctAnswerVoice={correctAnswerVoice}
            correctAnswerPhoto={correctAnswerPhoto}
          ></Question>
          <div className="content">
            <AnswerVariants
              currentPage={currentPage}
              correctAnswer={correctAnswer.name}
              setActiveAnswer={setActiveAnswer}
            ></AnswerVariants>
            <Description
              page={currentPage}
              activeAnswer={activeAnswer}
              correctAnswerVoice={correctAnswerVoice}
            ></Description>
          </div>
          <NextLevelButton
            setPage={() => setCurrentPage((prevPage) => prevPage + 1)}
            enableButton={correctAnswer.name === activeAnswer}
          ></NextLevelButton>
        </main>
      )}
    </>
  );
};

ReactDom.render(<App></App>, document.getElementById("app"));
