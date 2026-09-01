export interface worksPresentationObject {
  img: string;
  squaredImg: string;
  alternativeText: string;
  workUrlId: string;
}

const m = "/media/native_m/";

const worksPresentation: worksPresentationObject[] = [
  {
    img: `${m}SPA.webp`,
    squaredImg: `${m}SPA-squared.webp`,
    alternativeText:
      "Single Page Applicaation with MERN stack, google sign in, JWT, etc.",
    workUrlId: "/work/spa",
  },
  {
    img: `${m}NFTs.webp`,
    squaredImg: `${m}NFTs-squared.webp`,
    alternativeText: "NFTs where appear Elon Musk, Lebron James, BonsAI...",
    workUrlId: "/work/nfts",
  },
  {
    img: `${m}Games.webp`,
    squaredImg: `${m}Games-squared.webp`,
    alternativeText:
      "These are the games I've made, what are you waiting for watch them?",
    workUrlId: "/work/my-games",
  },
  {
    img: `${m}Bonsai.webp`,
    squaredImg: `${m}Bonsai-squared.webp`,
    alternativeText: "This is my BonsAI page",
    workUrlId: "/work/my-first-static-page",
  },
  {
    img: `${m}Codicon.webp`,
    squaredImg: `${m}Codicon_squared.webp`,
    alternativeText: "My first hackathon",
    workUrlId: "/work/codicon-canaimeros",
  },
  {
    img: `${m}Blog.webp`,
    squaredImg: `${m}Blog-squared.webp`,
    alternativeText: "This is my blog, I should make it interesting",
    workUrlId: "/blog",
  },
];

export default worksPresentation;
