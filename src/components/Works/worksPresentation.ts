// Import all images
import spaImg from "@assets/media/native_m/SPA.webp";
import spaSquaredImg from "@assets/media/native_m/SPA-squared.webp";
import nftsImg from "@assets/media/native_m/NFTs.webp";
import nftsSquaredImg from "@assets/media/native_m/NFTs-squared.webp";
import gamesImg from "@assets/media/native_m/Games.webp";
import gamesSquaredImg from "@assets/media/native_m/Games-squared.webp";
import barbaImg from "@assets/media/native_m/BarbaJS.webp";
import barbaSquaredImg from "@assets/media/native_m/BarbaJS-squared.webp";
import bonsaiImg from "@assets/media/native_m/Bonsai.webp";
import bonsaiSquaredImg from "@assets/media/native_m/Bonsai-squared.webp";
import codiconImg from "@assets/media/native_m/Codicon.webp";
import codiconSquaredImg from "@assets/media/native_m/Codicon_squared.webp";
import blogImg from "@assets/media/native_m/Blog.webp";
import blogSquaredImg from "@assets/media/native_m/Blog-squared.webp";
import projectsImg from "@assets/media/native_m/Projects.webp";
import projectsSquaredImg from "@assets/media/native_m/Projects-squared.webp";

export interface worksPresentationObject {
  img: string;
  squaredImg: string;
  alternativeText: string;
  workUrlId: string;
}

const worksPresentation: worksPresentationObject[] = [
  {
    img: spaImg,
    squaredImg: spaSquaredImg,
    alternativeText:
      "Single Page Applicaation with MERN stack, google sign in, JWT, etc.",
    workUrlId: "/work/spa",
  },
  {
    img: nftsImg,
    squaredImg: nftsSquaredImg,
    alternativeText: "NFTs where appear Elon Musk, Lebron James, BonsAI...",
    workUrlId: "/work/nfts",
  },
  {
    img: gamesImg,
    squaredImg: gamesSquaredImg,
    alternativeText:
      "These are the games I've made, what are you waiting for watch them?",
    workUrlId: "/work/games",
  },
  // {
  //   img: barbaImg,
  //   squaredImg: barbaSquaredImg,
  //   alternativeText: "Beatifuld and smooth transitions.",
  //   workUrlId: "4",
  // },
  {
    img: bonsaiImg,
    squaredImg: bonsaiSquaredImg,
    alternativeText: "This is my BonsAI page",
    workUrlId: "/work/my-first-static-page",
  },
  {
    img: codiconImg,
    squaredImg: codiconSquaredImg,
    alternativeText: "My first hackathon",
    workUrlId: "/work/codicon-canaimeros",
  },
  {
    img: blogImg,
    squaredImg: blogSquaredImg,
    alternativeText: "This is my blog, I should make it interesting",
    workUrlId: "/blog",
  },
  // {
  //   img: projectsImg,
  //   squaredImg: projectsSquaredImg,
  //   alternativeText:
  //     "There are projects, but projects are ideas for more projects, so let's make more projects",
  //   workUrlId: "/work/projects",
  // },
];

export default worksPresentation;
export { worksPresentation as worksPresentationObject };
