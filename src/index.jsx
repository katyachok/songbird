import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { Header } from "./components/Header";
import { Question } from "./components/Question";
import { AnswerVariants } from "./components/AnswerVariants";
import { Description } from "./components/Description";
import { NextLevelButton } from "./components/NextLevelButton";
import { flickrAPI, pages } from "./constants";
import "./styles/styles.css";
import "./styles/sass.scss";

const App = () => {
  const [correctAnswer, setCorrectAnswer] = useState("Коростель");
  const [activeAnswer, setActiveAnswer] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [correctAnswerPhoto, setCorrectAnswerPhoto] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${flickrAPI}${correctAnswer}`);
      const data = await response.json();
      setCorrectAnswerPhoto(data.photos.photo[0]);
    }
    fetchData();
  }, [correctAnswer]);

  return (
    <>
      <Header currentPage={pages[currentPage]}></Header>
      <main>
        <Question
          correctAnswer={correctAnswer}
          activeAnswer={activeAnswer}
          correctAnswerPhoto={correctAnswerPhoto}
        ></Question>
        <div className="content">
          <AnswerVariants
            currentPage={currentPage}
            correctAnswer={correctAnswer}
            setActiveAnswer={setActiveAnswer}
          ></AnswerVariants>
          <Description
            correctAnswer={correctAnswer}
            activeAnswer={activeAnswer}
            page={currentPage}
          ></Description>
        </div>
        <NextLevelButton
          setPage={() => setCurrentPage((prevPage) => prevPage + 1)}
          enableButton={correctAnswer === activeAnswer}
        ></NextLevelButton>
      </main>
    </>
  );
};

ReactDom.render(<App></App>, document.getElementById("app"));
