import React from "react";
import { starSvg, starHalfSvg, starBlackSvg } from "./Svg.jsx";

const stars = (num, booleanHalfStar = false) => {
  let starsQuantity = num;
  let halfStar = booleanHalfStar;

  const totalStars = [];

  for (let i = 0; i < 5; i++) {
    if (starsQuantity <= 0 && halfStar) {
      totalStars.push(starHalfSvg);
      halfStar = !halfStar;
    } else if (starsQuantity <= 0) {
      totalStars.push(starBlackSvg);
    } else if (starsQuantity > 0) {
      totalStars.push(starSvg);
      starsQuantity -= 1;
    }
  }

  return totalStars;
};

const abilities = [
  {
    id: "graphic__design",
    ability: "Graphic Design",
    abs: [
      {
        name: "lorem ipsum",
        content: stars(4),
      },
      {
        name: "lorem ipsum",
        content: stars(3),
      },
    ],
  },
  {
    id: "langs",
    ability: "Languages",
    abs: [
      {
        name: "lorem ipsum",
        content: "lorem ipsum",
      },
      {
        name: "lorem ipsum",
        content: stars(3, true),
      },
      {
        name: "lorem ipsum",
        content: stars(1, true),
      },
    ],
  },
  {
    id: "programming",
    ability: "Programming",
    abs: [
      {
        name: "lorem ipsum",
        content: null,
        subAbs: [
          {
            name: "lorem ipsum",
            content: stars(4),
          },
          {
            name: "lorem ipsum",
            content: stars(3, true),
          },
          {
            name: "lorem ipsum",
            content: stars(3, true),
          },
          {
            name: "lorem ipsum",
            content: stars(2),
          },
        ],
      },
      {
        name: "lorem ipsum",
        content: null,
        subAbs: [
          {
            name: "lorem ipsum",
            content: stars(3),
          },
          {
            name: "lorem ipsum",
            content: stars(3),
          },
          {
            name: "lorem ipsum",
            content: stars(3),
          },
          {
            name: "lorem ipsum",
            content: stars(3),
          },
          {
            name: "lorem ipsum",
            content: stars(2),
          },
          {
            name: "lorem ipsum",
            content: stars(1, true),
          },
        ],
      },
      {
        name: "lorem ipsum",
        content: null,
        subAbs: [
          {
            name: "lorem ipsum",
            content: stars(3, true),
          },
          {
            name: "lorem ipsum",
            content: stars(2),
          },
          {
            name: "lorem ipsum",
            content: stars(1, true),
          },
          {
            name: "lorem ipsum",
            content: stars(1),
          },
          {
            name: "lorem ipsum",
            content: stars(0, true),
          },
        ],
      },
      {
        name: "lorem ipsum",
        content: null,
        subAbs: [
          {
            name: "lorem ipsum",
            content: stars(4),
          },
          {
            name: "lorem ipsum",
            content: stars(3),
          },
          {
            name: "lorem ipsum",
            content: stars(2, true),
          },
          {
            name: "lorem ipsum",
            content: stars(2, true),
          },
          {
            name: "lorem ipsum",
            content: stars(2, true),
          },
        ],
      },
      {
        name: "lorem ipsum",
        content: null,
        subAbs: [
          {
            name: "lorem ipsum",
            content: stars(4),
          },
          {
            name: "lorem ipsum",
            content: stars(3, true),
          },
        ],
      },
      {
        name: "lorem ipsum",
        content: null,
        subAbs: [
          {
            name: "lorem ipsum",
            content: stars(3, true),
          },
          {
            name: "lorem ipsum",
            content: stars(1, true),
          },
        ],
      },
    ],
  },
  {
    id: "info",
    ability: "Information",
    abs: [
      {
        name: "lorem ipsum",
        content: "lorem ipsum",
      },
      {
        name: "lorem ipsum",
        content: "lorem ipsum",
      },
      {
        name: "lorem ipsum",
        content: "lorem ipsum",
      },
      {
        name: "lorem ipsum",
        content: "lorem ipsum",
      },
      {
        name: "lorem ipsum",
        content: null,
        subAbs: [
          {
            name: "lorem ipsum",
            content: "lorem ipsum",
          },
          {
            name: "lorem ipsum",
            content: <span className="span-orange" />,
          },
          {
            name: "lorem ipsum",
            content: "lorem ipsum",
          },
          {
            name: "lorem ipsum",
            content: "lorem ipsum",
          }
        ],
      },
    ],
  },
];

export default abilities;
