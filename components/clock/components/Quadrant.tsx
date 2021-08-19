import React from "react";
import { polar2Canvas } from "react-native-redash";
import { Circle, Line, G } from "react-native-svg";

import { CENTER, PADDING, R, SIZE, STROKE, TAU } from "../Constants";

const LINES = 75;
const DELTA = TAU / LINES;

const Quadrant = () => {
  return (
    <>
      {/* 黒い、メーターの下地となる円 strokeで色を出している*/}
      <Circle
        strokeWidth={STROKE}
        stroke="#1C1B1D"
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={R}
      />
      {/* CircularSliderにある<Mask></Mask>のsvgを指定している maskを指定することでそのSVGに以下のCircle SVGを被せられる*/}
      {/* maskを使って選択部分の円に色をつけている */}
      <G mask="url(#mask)">
        <Circle fill="#FD9F07" cx={SIZE / 2} cy={SIZE / 2} r={R + PADDING} />
      </G>
    </>
  );
};

export default Quadrant;
