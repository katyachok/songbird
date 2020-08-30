import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { Header } from "./components/Header";
import { Question } from "./components/Question";
import { AnswerVariants } from "./components/AnswerVariants";
import { Description } from "./components/Description";
import { NextLevelButton } from "./components/NextLevelButton";
import { FinalPage } from "./components/FinalPage";
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
  const [correctAnswersList, setCorrectAnswersList] = useState([]);
  const [isFinish, setIsFinish] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (currentPage === Object.keys(birds).length) {
      setIsFinish(true);
      console.log("Correct answers: ", correctAnswersList);
    } else {
      getData();
    }
  }, [currentPage]);

  const getData = async () => {
    const randomNumber = randomize(birds[currentPage].length);
    const answer = birds[currentPage][randomNumber];
    setCorrectAnswer(answer);
    setCorrectAnswersList([...correctAnswersList, answer]);
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
  };

  useEffect(() => {
    console.log("birds[currentPage][randomNumber]", correctAnswer);
    if (!correctAnswer) return;
  }, [correctAnswer]);

  const handleNextLevel = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const resetGame = () => {
    setCurrentPage(0);
    setIsFinish(false);
  };

  return (
    <>
      <Header currentPage={pages[currentPage]} score={score}></Header>
      <main>
        {correctAnswer && correctAnswerVoice && !isFinish && (
          <>
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
              setPage={handleNextLevel}
              enableButton={correctAnswer.name === activeAnswer}
            ></NextLevelButton>
          </>
        )}
        {isFinish && (
          <FinalPage score={score} resetGame={resetGame}></FinalPage>
        )}
      </main>
    </>
  );
};

ReactDom.render(<App></App>, document.getElementById("app"));
