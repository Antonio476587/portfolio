import React from "https://esm.sh/react@18.2.0";

const imgCreator = (src: string, alt: string) => (
  <img src={"/img/" + src} alt={alt} />
);

export interface ability {
  name: string;
  content?: React.ReactElement<SVGElement>[] | React.ReactElement | string;
  subAbs?: ability[];
}

interface abilities {
  id: string;
  ability: string;
  abs: ability[];
}

const abilities: abilities[] = [
  {
    id: "graphic__design",
    ability: "Graphic Design",
    abs: [
      {
        name: "Photoshop",
        content: imgCreator("photoshop.webp", "Photoshop"),
      },
      {
        name: "Illustrator",
        content: imgCreator("illustrator.webp", "Illustrator"),
      },
    ],
  },
  {
    id: "langs",
    ability: "Languages",
    abs: [
      {
        name: "Spanish:",
        content: "Native",
      },
      {
        name: "English:",
        content: "Intermediate",
      },
      {
        name: "French:",
        content: "Basic",
      },
    ],
  },
  {
    id: "programming",
    ability: "Programming",
    abs: [
      {
        name: "Web Basics",
        subAbs: [
          {
            name: "HTML",
            content: imgCreator("html.webp", "HyperText Markup Language"),
          },
          {
            name: "JavaScript",
            content: imgCreator("javascript.webp", "JavaScript"),
          },
          {
            name: "CSS",
            content: imgCreator("css.webp", "Cascading Style Sheets"),
          },
        ],
      },
      {
        name: "JavaScript",
        subAbs: [
          {
            name: "NodeJS",
            content: imgCreator("node.webp", "NodeJS"),
          },
          {
            name: "React",
            content: imgCreator("react.webp", "React"),
          },
          {
            name: "Express",
            content: imgCreator("express.webp", "ExpressJS"),
          },
          {
            name: "GraphQL",
            content: imgCreator("graphql.webp", "GraphQL"),
          },
          {
            name: "TypeScript",
            content: imgCreator("typescript.webp", "TypeScript"),
          },
          {
            name: "JSDoc",
            content: imgCreator("jsdoc.webp", "JSDoc"),
          },
        ],
      },
      {
        name: "Typescript",
        subAbs: [
          {
            name: "React",
            content: imgCreator("react.webp", "React"),
          },
          {
            name: "Deno",
            content: imgCreator("deno.webp", "Deno"),
          },
        ],
      },
      {
        name: "Languages",
        subAbs: [
          {
            name: "JavaScript",
            content: imgCreator("javascript.webp", "JavaScript"),
          },
          {
            name: "Python",
            content: imgCreator("python.webp", "Python"),
          },
          {
            name: "C",
            content: imgCreator("c.webp", "C language"),
          },
          {
            name: "Java",
            content: imgCreator("java.webp", "Java"),
          },
          {
            name: "Solidity",
            content: imgCreator("solidity.webp", "Solidity"),
          },
          {
            name: "Go",
            content: imgCreator("go.webp", "GO"),
          },
        ],
      },
      {
        name: "Tools",
        subAbs: [
          {
            name: "Bootstrap",
            content: imgCreator("bootstrap.webp", "Bootstrap"),
          },
          {
            name: "Docker",
            content: imgCreator("docker.webp", "Docker"),
          },
          {
            name: "Git",
            content: imgCreator("git.webp", "Git"),
          },
          {
            name: "GitHub",
            content: imgCreator("github.webp", "GitHub"),
          },
          {
            name: "Sass",
            content: imgCreator("sass.webp", "Sass"),
          },
        ],
      },
      {
        name: "Databases",
        subAbs: [
          {
            name: "LowDB",
            content: imgCreator("lowdb.webp", "LowDB"),
          },
          {
            name: "MongoDB",
            content: imgCreator("mongodb.webp", "MongoDB"),
          },
          {
            name: "MariaDB",
            content: imgCreator("mariadb.webp", "MariaDB"),
          },
        ],
      },
      {
        name: "CMS",
        subAbs: [
          {
            name: "WordPress",
            content: imgCreator("wordpress.webp", "WordPress"),
          },
          {
            name: "Zyro",
            content: imgCreator("zyro.webp", "Zyro"),
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
        name: "Name:",
        content: "Felix Cabello",
      },
      {
        name: "Age:",
        content: "19",
      },
      {
        name: "Country:",
        content: "Venezuela",
      },
      {
        name: "State:",
        content: "La Guaira",
      },
      {
        name: "Favorites",
        subAbs: [
          {
            name: "Meal:",
            content: "Soup",
          },
          {
            name: "Color:",
            content: <span className="span-orange" />,
          },
          {
            name: "Anime:",
            content: "Naruto",
          },
          {
            name: "Sport:",
            content: "Martial Arts",
          },
        ],
      },
    ],
  },
];

export default abilities;
