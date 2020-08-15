import React from "react";
import ReactDom from "react-dom";
import { Header } from "./components/Header";
import { Question } from "./components/Question";
import { Answers } from "./components/Answers";
import { Description } from "./components/Description";
import { NextLevelButton } from "./components/NextLevelButton";
import "./styles/styles.css";
import "./styles/sass.scss";

const App = () => {
  return (
    <>
      <Header></Header>
      <main>
        <Question birdName="*****"></Question>
        <div className="content">
          <Answers></Answers>
          <Description></Description>
        </div>
        <NextLevelButton></NextLevelButton>
      </main>
    </>
  );
};

ReactDom.render(<App></App>, document.getElementById("app"));
