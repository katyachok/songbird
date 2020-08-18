import React, { useState } from "react";
import ReactDom from "react-dom";
import { Header } from "./components/Header";
import { Question } from "./components/Question";
import { AnswerVariants } from "./components/AnswerVariants";
import { Description } from "./components/Description";
import { NextLevelButton } from "./components/NextLevelButton";
import "./styles/styles.css";
import "./styles/sass.scss";

const App = () => {
  const [correctAnswer, setCorrectAnswer] = useState("Коростель");
  const [activeAnswer, setActiveAnswer] = useState(null);
  const [page, setPage] = useState("training");

  return (
    <>
      <Header></Header>
      <main>
        <Question birdName="*****"></Question>
        <div className="content">
          <AnswerVariants
            correctAnswer={correctAnswer}
            setActiveAnswer={setActiveAnswer}
          ></AnswerVariants>
          <Description
            correctAnswer={correctAnswer}
            activeAnswer={activeAnswer}
            page={page}
          ></Description>
        </div>
        <NextLevelButton setPage={setPage}></NextLevelButton>
      </main>
    </>
  );
};

ReactDom.render(<App></App>, document.getElementById("app"));
