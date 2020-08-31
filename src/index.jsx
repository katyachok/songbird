import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { Header } from "./components/Header";
import { Question } from "./components/Question";
import { AnswerVariants } from "./components/AnswerVariants";
import { Description } from "./components/Description";
import { NextLevelButton } from "./components/NextLevelButton";
import { FinalPage } from "./components/FinalPage";
import {
  flickrAPI,
  pages,
  VOICE_API,
  birds,
  PROXY_URL,
  maxScorePerAnswer,
} from "./constants";
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
  const [playAgain, setPlayAgain] = useState(false);
  const [score, setScore] = useState(0);
  const [tempScore, setTempScore] = useState(maxScorePerAnswer);

  useEffect(() => {
    if (currentPage !== Object.keys(birds).length) {
      getData();
      setTempScore(maxScorePerAnswer);
    } else {
      console.log("Correct answers: ", correctAnswersList);
    }
    if (playAgain) resetGame();
  }, [currentPage, playAgain]);

  useEffect(() => {
    if (!activeAnswer) return;
    if (activeAnswer === correctAnswer.name) {
      setScore((prevState) => prevState + tempScore);
    } else setTempScore((prevState) => prevState - 1);
  }, [activeAnswer]);

  const getData = async () => {
    const randomNumber = randomize(birds[currentPage].length);
    const answer = birds[currentPage][randomNumber];
    setCorrectAnswer(answer);
    setCorrectAnswersList([...correctAnswersList, answer.name]);
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
    await fetchPhoto(answer);
    await fetchVoice(answer);
  };

  useEffect(() => {
    console.log("birds[currentPage][randomNumber]", correctAnswer);
    if (!correctAnswer) return;
  }, [correctAnswer]);

  const handleNextLevel = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const resetGame = () => {
    setScore(0);
    setTempScore(maxScorePerAnswer);
    setCurrentPage(0);
    setActiveAnswer(null);
    setPlayAgain(false);
  };

  return (
    <>
      <Header currentPage={pages[currentPage]} score={score}></Header>
      <main>
        {correctAnswer &&
          correctAnswerVoice &&
          currentPage < Object.keys(birds).length && (
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
                  playAgain={playAgain}
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
        {currentPage >= Object.keys(birds).length && (
          <FinalPage
            score={score}
            resetGame={() => setPlayAgain(true)}
          ></FinalPage>
        )}
      </main>
    </>
  );
};

ReactDom.render(<App></App>, document.getElementById("app"));
