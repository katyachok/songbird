import React from "react";

const Player = ({ src }) => {
  return <audio src={src} controls></audio>;
};

export { Player };
