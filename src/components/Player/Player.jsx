import React, { useState, useRef, useEffect } from "react";

import { ProgressBar } from "./Bar/ProgressBar";

import { durationToSeconds } from "../../utils/durationToSeconds";
import { formatDuration } from "../../utils/durationToSeconds";

import Play from "../../assets/play.svg";
import Pause from "../../assets/pause.svg";

import styled from "styled-components";

const Player = ({ src, duration }) => {
  const audio = useRef(null);
  const [curTime, setCurTime] = useState(0);
  const [clickedTime, setClickedTime] = useState();
  const [curPercentage, setCurPercentage] = useState(0);
  const [formattedCurrentTime, setFormattedCurrentTime] = useState();

  useEffect(() => {
    const setAudioTime = () => setCurTime(audio.current.currentTime);

    audio.current.addEventListener("timeupdate", setAudioTime);

    setCurPercentage(
      (audio.current.currentTime / durationToSeconds(duration)) * 100
    );
    setFormattedCurrentTime(formatDuration(audio.current.currentTime * 1000));
    return () => {
      audio.current.removeEventListener("timeupdate", setAudioTime);
    };
  }, [curTime]);

  const handlePlayPause = () => {
    const aud = audio.current;
    if (aud.paused || aud.ended) {
      aud.play();
    } else aud.pause();
  };

  useEffect(() => {
    if (clickedTime && clickedTime !== curTime) {
      audio.current.currentTime = clickedTime;
      setCurTime(clickedTime);
      setClickedTime(null);
    }
  }, [clickedTime]);

  return (
    <>
      <audio src={src} ref={audio}></audio>
      <Controls>
        <Button type="button" data-state="play" onClick={handlePlayPause}>
          <Img src={audio.current && audio.current.paused ? Play : Pause}></Img>
        </Button>
        <ProgressBar
          duration={duration}
          currentTime={formattedCurrentTime}
          setClickedTime={setClickedTime}
          curPercentage={curPercentage}
        ></ProgressBar>
        {/* <button id="volinc" type="button" data-state="volup">
          Vol+
        </button>
        <button id="voldec" type="button" data-state="voldown">
          Vol-
        </button> */}
      </Controls>
    </>
  );
};

export { Player };

const Controls = styled.div`
  display: flex;
  width: 100%;
  height: 8.097%;
  position: relative;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  width: 40px;
  height: 40px;
  border: 2px solid #00bc8c;
  border-radius: 50%;
  background-color: #303030;
  transition: 0.2s;
  outline: #303030;
  cursor: pointer;
`;

const Img = styled.img`
  width: 18px;
  height: 18px;
  background-size: cover;
`;
