const wallMaxLength = 8;

export interface worksPresentationObject {
  img: `/${string}/${string}.${string}`;
  squaredImg: `/${string}/${string}.${string}`;
  alternativeText: string;
  workUrlId: `${number}` | "/";
}

const worksPresentation: worksPresentationObject[] = [
  {
    img: "/img/SPA.webp",
    squaredImg: "/img/SPA-squared.webp",
    alternativeText:
      "Single Page Applicaation with MERN stack, google sign in, JWT, etc.",
    workUrlId: "1",
  },
  {
    img: "/img/NFTs.webp",
    squaredImg: "/img/NFTs-squared.webp",
    alternativeText: "NFTs where appear Elon Musk, Lebron James, BonsAI...",
    workUrlId: "2",
  },
  {
    img: "/img/Games.webp",
    squaredImg: "/img/Games-squared.webp",
    alternativeText:
      "These are the games I've made, what are you waiting for watch them?",
    workUrlId: "3",
  },
  {
    img: "/img/BarbaJS.webp",
    squaredImg: "/img/BarbaJS-squared.webp",
    alternativeText: "Beatifuld and smooth transitions.",
    workUrlId: "4",
  },
  {
    img: "/img/Bonsai.webp",
    squaredImg: "/img/Bonsai-squared.webp",
    alternativeText: "This is my BonsAI page",
    workUrlId: "5",
  },
  {
    img: "/img/Friends.webp",
    squaredImg: "/img/Friends-squared.webp",
    alternativeText: "They are the best choice and achieve I have made",
    workUrlId: "6",
  },
  {
    img: "/img/Blog.webp",
    squaredImg: "/img/Blog-squared.webp",
    alternativeText: "This is my blog, I should make it interesting",
    workUrlId: "7",
  },
  {
    img: "/img/Projects.webp",
    squaredImg: "/img/Projects-squared.webp",
    alternativeText:
      "There are projects, but projects are ideas for more projects, so let's make more projects",
    workUrlId: "8",
  },
];

const NA: worksPresentationObject = {
  img: "/img/NA.webp",
  squaredImg: "/img/NA-squared.webp",
  alternativeText: "It's a building's window, there's no work there already",
  workUrlId: "/",
};

function getWorksForWall(
  wallID: string,
): worksPresentationObject[] | undefined {
  const wallIDNumber = parseInt(wallID);

  if (wallIDNumber == 0 || isNaN(wallIDNumber)) return;

  let windowsArray;

  const newIndexForSearch = wallMaxLength * (wallIDNumber - 1);
  const newLimitForSearch = wallMaxLength * wallIDNumber;

  if (newLimitForSearch == wallMaxLength && newIndexForSearch == 0) {
    windowsArray = worksPresentation.slice(0, newLimitForSearch);
  } else {
    windowsArray = worksPresentation.slice(
      newIndexForSearch,
      newLimitForSearch,
    );

    if (windowsArray.length < wallMaxLength) {
      for (let i = windowsArray.length; i < wallMaxLength; i++) {
        windowsArray[i] = NA;
      }
    }
  }

  return windowsArray;
}

export default worksPresentation;
export { getWorksForWall, worksPresentation as worksPresentationObject };
