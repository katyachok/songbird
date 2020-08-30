import React, { useRef } from "react";
import styled from "styled-components";

const ProgressBar = ({
  duration,
  curPercentage,
  setClickedTime,
  currentTime,
}) => {
  const bar = useRef(null);

  const calcClickedTime = (e) => {
    const clickPositionInPage = e.pageX;
    const barStart = bar.current.getBoundingClientRect().left + window.scrollX;
    const barWidth = bar.offsetWidth;
    const clickPositionInBar = clickPositionInPage - barStart;
    const timePerPixel = duration / barWidth;
    return timePerPixel * clickPositionInBar;
  };

  const handleTimeDrag = (e) => {
    setClickedTime(calcClickedTime(e));
  };

  return (
    <BarContainer>
      <Bar ref={bar} curPercentage={curPercentage} onMouseDown={handleTimeDrag}>
        <Marker style={{ left: `${curPercentage}%` }} />
      </Bar>
      <TimeWrapper>
        <Time>{currentTime}</Time>
        <Time>{duration}</Time>
      </TimeWrapper>
    </BarContainer>
  );
};

export { ProgressBar };

const BarContainer = styled.div`
  width: 100%;
  position: relative;
  margin-top: 12px;
  user-select: none;
`;

const Bar = styled.div`
  height: 4px;
  background: linear-gradient(
    to right,
    rgb(0, 188, 140) 0%,
    rgb(61, 133, 140) ${(props) => props.curPercentage}%,
    rgb(115, 115, 115) ${(props) => props.curPercentage}%,
    rgb(115, 115, 115) 100%
  );
  cursor: pointer;
`;

const Marker = styled.span`
  background-color: grey;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  -webkit-transform: translate(-50%, calc(-50% + 2px));
  transform: translate(-50%, calc(-50% + 2px));
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const TimeWrapper = styled.div`
  width: 100%;
  margin-top: 8px;
  font-size: 11px;
  color: #d3d3d3;
  display: flex;
  justify-content: space-between;
`;

const Time = styled.span``;
