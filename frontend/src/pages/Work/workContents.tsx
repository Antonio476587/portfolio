import { type Work } from "./Work.tsx";

const workContents: Array<Work> = [
  {
    h2: "My first SPA",
    p1: `When I got a better knowledge in JavaScript, I thought
    that it was time to learn a framework. The reason why I chose
    React was that React have a lot of documentation and community.
    So it would be easier to get understand. I decided to learn React
    by the great book of Vasan Subramanian. His book had a few things deprecated.
    But I didn't mind about it. Because when I read the book of Uncle Bob
    'The Clean Architecture' I actually realized that almost nothing has changed
    in the programming, and the principles are the same yet.
    `,
    media1: ["/static/media/images/tracker1.jpg", "How I create the NFTs."],
    media2: [
      "/static/media/images/tracker2.jpg",
      "Each NFT has unique things.",
    ],
    p2: `When I started the book, I had a little idea about React,
    I knew Mongodb, Node and Express, but I didn't know nothing about
    GraphQL, ReactRouter, ESlint and a lot more of things that I learned.
    Because the book is a bit old, many things didn't work. I used to give
    14 hours a day to the book and programming the SPA, it was really cool.
    I endeed the app in 11 days. I must say that I was pretty hard for me.`,
    p3:
      `I uploaded the code to GitHub when I finished the app. I am really grateful
    with Vasan and all his effort to make the book. I'm going to make a 
    great use with that knowledge. afterwards, I decided to
    make my portfolio with React to apply all the learned.
      `,
    media3: [
      "/static/media/images/tracker3.jpg",
      "A img representing a NFT in the digital world.",
    ],
    p4: `I hope that you're enjoying my portfolio and don't forget, 
    Towards the future!!!`,
    media4: ["/static/media/images/tracker4.jpg", "A lot of NFTs gathered."],
    styles: ["#EBEBFF", "#0C043E", "#111"],
    type: "casestudy",
  },
  {
    h2: "NFTs",
    p1: `NFTs, they have become well known fast, but, what are they exactly?
        They are things like art, or whatever that is unique at the world, but inside
        the technology world.
    `,
    media1: ["/static/media/images/NFT2.png", "How I create the NFTs."],
    p2: `Yes, they still being unique althought someone copy it
        or have a similar one. If you ask to the best painter of the world to 
        replicate the Salvador Mundi, it will be exactly the same. but it's no the 
        Da Vinci's Salvador Mundi, another example can be the Steve Jobs' iPhone, 
        there're a lot of the same, but only one was Steve Jobs'. They have 
        information, features and data that make them uniques.`,
    media2: ["/static/media/images/NFT3.jpg", "Each NFT has unique things."],
    p3: `I made my own NFTs, it's a collection of 10 NFTs. Until now
        I have only showed 8, but I will show the other 2 soon. Their names are numbers,
        that go since 1 to 10, it's very simple to remember.`,
    media3: [
      "/static/media/images/NFT1.jpeg",
      "A img representing a NFT in the digital world.",
    ],
    p4: ` If you want see every one. I let them on the contact page, 
        you will see my way to think and my creative on them. 
        I hope that you're enjoying my portfolio and don't forget, Towards the future!!!`,
    media4: ["/static/media/images/NFT4.jpg", "A lot of NFTs gathered."],
    styles: ["#DEE2E6", "#6F42C1", "#023580"],
    type: "gallery",
  },
  {
    h2: "My games",
    p1: `Through my life, I've really enjoyed playing videogames, so I thought
        that it would be fine to create some videogames.`,
    p2: `Nowadays, I've only created a game that in my country is called
        'La vieja' or 'The old woman'.`,
    p3: (
      <>
        But I will be creating more games, maybe small, but I feel exactly the
        same when I&apos;m creating a game as I&apos;m playing a game.{" "}
        <a href="/static/h5/tic-tac-toe.html">Click here if you would like to play it</a>.
      </>
    ),
    media1: [
      "/static/media/images/three1.jpg",
      "The game of three on a ray that I made",
    ],
    media2: [
      "/static/media/images/three2.jpg",
      "The code of the AI and the HTML code with Pug template.",
    ],
    media3: [
      "/static/media/images/three3.jpg",
      "The game of three on a ray that I made with different colors.",
    ],
    p4: `I hope that you're enjoying my portfolio and don't forget, 
    Towards the future!!!`,
    media4: ["/static/media/images/three4.png", "X and O of three on a line."],
    styles: ["#FFE0E0", "#591C1C", "#000"],
    type: "classic",
  },
  {
    h2: "BarbaJS transitions",
    p1: `Usually the interactivity is part essential of our lives. In the
    internet the interactivity is very worth now. I love what barba does,
    It can prefetch a page and save their content in cache, so if you go
    to that page barba join the two pages in one to make a transition between them,
    It give to you a lot of cool things that you can do to make the transitions beatiful. 
    `,
    media1: ["/static/media/images/barba1.jpg", "BarbaJS logo."],
    media2: ["/static/media/videos/barbacss.mp4", "A video of barbacss"],
    p2:
      `I found barba thanks to Petr Tichy and his channel Ihatetomatoes. With a great tutorial 
    made by him, I really liked BarbaJS and I made the tutorial in his channel. It was
    really useful, now I can make beatiful transitions too with barba. But that didn't stop
    here. I didn't know Gsap, I knew it in the same BarbaJS tutorial, I was used to make 
    animations with AnimeJS, but I had to learn Gsap. I studied a lot the Gsap documentation, and
    I used that knowledge to make this portfolio with Gsap, AnimeJS and AnimeCSS.`,
    p3: `Now I know that Barba is a great alternative to SPAs, I don't really
    like SPA applications, because they are so difficult to create, but with Barba I 
    can make a simple app and make it look like a SPA. It's really useful, I
    can't use it with React in my portfolio because it was very dificult, but I'm going
    to keep trying join React and BarbaJS.`,
    media3: ["/static/media/videos/barbagsap.mp4", "A video of barbagsap"],
    p4: `I hope that you're enjoying my portfolio and don't forget, 
    Towards the future!!!`,
    media4: [
      "/static/media/images/barba2.jpg",
      "Barba and gsap in a really nice picture.",
    ],
    styles: ["#E1CCA4", "#1F6161", "#FFFFF0"],
    type: "casestudy",
  },
  {
    h2: "My first static page.",
    p1: `This was my first static page, I really liked it. Because it was
    my first goal to make, when I did it I felt good. This page was made without
    any framework, the most difficult thing in that moment were the algoritms.
    I didn't know any, I didn't have any idea to how make them, I didn't 
    thinking like a programmer. Then I stoped to programming and started
    to read books of programmers like Uncle Bob, Vasan Subramanian, Thomas H Cormen, etc. See
    videos of programmers and the begin of a languague or program. Those things helped me 
    a lot. 
    `,
    media1: ["/static/media/images/bonsai1.jpg", "BonsAI my first loved page."],
    media2: ["/static/media/images/bonsai2.jpg", "BonsAI my first loved page."],
    p2: `I was learning only about JavaScript when I made this page. I made it
    beacause I have made a shop, it was a techonology shop, I used to sell
    wires, chargers, phones and further. But I couldn't manage it by myself, 
    I decided that I didn't want to close it forever, then to don't lose all
    the things I have achieved, I closed it temporarily, I was going to make
    a page with my knowledge and start to sell online.`,
    p3:
      `Althought I can make a better professional page, I decided don't do that.
    I learned more about bussiness, I only couldn't start again without a plan. That was
    the purpose of my BonsAI page. I gave it all my dedication and knowledge in that time. 
    It showed me in that moment, that I gave my all, everything could be great.`,
    media3: ["/static/media/images/bonsai3.jpg", "BonsAI my first loved page."],
    p4: `I hope that you're enjoying my portfolio and don't forget, 
    Towards the future!!!`,
    media4: ["/static/media/images/bonsai4.jpg", "BonsAI my first loved page."],
    styles: ["#FFEDED", "#A51818", "#800202"],
    type: "classic",
  },
  {
    h2: "CODICON",
    p1:
      `It was my first Hackathon, we had a team called 'Canaimeros' composed by
      4 members, one of our teammates couldn't participate because of his work,
      so we were working with 3 members including me, the others members decided
      to made me the leader of the team because of my initiative.
    `,
    media1: [
      "/static/media/images/boxus1.png",
      "Codicon!!",
    ],
    media2: [
      "/static/media/images/boxus2.png",
      "Boxus web app look",
    ],
    p2: `In 48 hours we had to create a software relationated with the word 'box',
    we voted and the winner idea was to create a web application where you can store your secrets in a box,
    then someone else will be able to open it.`,
    p3: (
      <>
      <p>If you wanna look up the code source you can view it in <a href="https://github.com/Antonio476587/Boxus">my GitHub Boxus repo</a></p>
      </>
    ),
    media3: ["/static/media/images/boxus3.png", "GitHub boxus repo"],
    p4: `I hope that you're enjoying my portfolio and don't forget, 
    Towards the future!!!`,
    media4: ["/static/media/images/boxus4.jpeg", "Canaimeros logo"],
    styles: ["#fffff0", "#fd7e14", "#212529"],
    type: "gallery",
  },
  {
    h2: "Blog",
    p1: `It's kind of ironic, that my first post to my blog is the blog itself.
        But that is, the blog is my first post. I will thinking more to create a new template for it, so I can expand the posts.`,
    p2: `I have many things that I can talk about. They are about topics like
        programming, life and histories. It's my blog.`,
    p3:
      "There's some stuff that I need to take care of first. But I will make it.",
    media1: ["/static/media/native_m/Blog.webp", "The Blog is my blog haha"],
    media2: [
      "/static/media/native_m/bloger.webp",
      "A mockup of a case study template of my friends",
    ],
    media3: [
      "/static/media/native_m/bloger-2.webp",
      "My and my brother working out a few years ago",
    ],
    media4: ["/static/media/native_m/bloger-3.webp", "Towards the future"],
    p4: `I hope that you're enjoying my portfolio and don't forget, 
        Towards the future!!!`,
    styles: ["#DAFDFF", "#0E2219", "#537B6A"],
    type: "classic",
  },
  {
    h2: "My Projects",
    p1: `There will be more projects than other things, so I'm going to 
        reuse the component that I'm developing for the blog, so I can explain the
        projects in the best way.`,
    p2: `I have done a few projects, but I will only count the ones I created
        by my own. Because it's more valuable when you research, code and create something
        yourself.`,
    p3: (
      <>
        <a href="https://github.com/Antonio476587/threejs-blob-2022">
          This is a blob with ThreeJS.
        </a>
        <hr />
        <em>&#35;</em>&nbsp;&#32;<a href="/static/h5/bgcomplement.html">
          This is the animation that is in the home of the web.
        </a>
        <hr />
        <em>
          &#35;
        </em>&nbsp;&#32;<a href="https://github.com/Antonio476587/telegrambot-withpuppeteer">
          This is a telegram bot with puppeteer.
        </a>
      </>
    ),
    media1: [
      "/static/media/native_m/projects.webp",
      "A blob made with ThreeJS",
    ],
    media2: [
      "/static/media/images/bgcomplement.jpg",
      "The Blog is my blog haha",
    ],
    media3: [
      "/static/media/native_m/projects-2.webp",
      "A telegram bot with puppeteer",
    ],
    media4: [
      "/static/media/native_m/projects-3.webp",
      "My portfolio, my biggest project",
    ],
    p4: (
      <>
        I hope that you&apos;re enjoying my portfolio and don&apos;t forget,
        Towards the future and{" "}
        <a href="https://github.com/Antonio476587">check my GitHub!!!</a>
      </>
    ),
    styles: ["#FBF1BC", "#170D0D", "#222"],
    type: "classic",
  },
];

export default workContents;
