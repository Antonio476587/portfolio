export interface worksPresentationObject {
  img: `/${string}/${string}.${string}`;
  squaredImg: `/${string}/${string}.${string}`;
  alternativeText: string;
  workUrlId: `${number}` | "/";
}

const worksPresentation: worksPresentationObject[] = [
  {
    img: "/static/media/native_m/SPA.webp",
    squaredImg: "/static/media/native_m/SPA-squared.webp",
    alternativeText:
      "Single Page Applicaation with MERN stack, google sign in, JWT, etc.",
    workUrlId: "1",
  },
  {
    img: "/static/media/native_m/NFTs.webp",
    squaredImg: "/static/media/native_m/NFTs-squared.webp",
    alternativeText: "NFTs where appear Elon Musk, Lebron James, BonsAI...",
    workUrlId: "2",
  },
  {
    img: "/static/media/native_m/Games.webp",
    squaredImg: "/static/media/native_m/Games-squared.webp",
    alternativeText:
      "These are the games I've made, what are you waiting for watch them?",
    workUrlId: "3",
  },
  {
    img: "/static/media/native_m/BarbaJS.webp",
    squaredImg: "/static/media/native_m/BarbaJS-squared.webp",
    alternativeText: "Beatifuld and smooth transitions.",
    workUrlId: "4",
  },
  {
    img: "/static/media/native_m/Bonsai.webp",
    squaredImg: "/static/media/native_m/Bonsai-squared.webp",
    alternativeText: "This is my BonsAI page",
    workUrlId: "5",
  },
  {
    img: "/static/media/native_m/Codicon.webp",
    squaredImg: "/static/media/native_m/Codicon-squared.webp",
    alternativeText: "My first hackathon",
    workUrlId: "6",
  },
  {
    img: "/static/media/native_m/Blog.webp",
    squaredImg: "/static/media/native_m/Blog-squared.webp",
    alternativeText: "This is my blog, I should make it interesting",
    workUrlId: "7",
  },
  {
    img: "/static/media/native_m/Projects.webp",
    squaredImg: "/static/media/native_m/Projects-squared.webp",
    alternativeText:
      "There are projects, but projects are ideas for more projects, so let's make more projects",
    workUrlId: "8",
  },
];

export default worksPresentation;
export { worksPresentation as worksPresentationObject };
