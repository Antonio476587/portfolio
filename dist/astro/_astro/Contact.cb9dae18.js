import{r as i,R as H}from"./index.f1bc5ebf.js";import{e as z,a as O,c as F,s as Y,t as G,b as J,d as W,l as K,g as Q}from"./Svg.97736a33.js";import{j as e}from"./jsx-runtime.109e40f8.js";function U(t){return t??""}function X(t){return t?.trim().length===0?null:t}function M(t,n){return t.length>n?t.slice(0,n):t}function y(t){const{maxLength:n=255}=t.inputProps,[a,o]=i.useState(M(U(t.inputProps.value),n)),{upperChange:c}=t;i.useEffect(()=>{t.clear==!0&&o("")},[t.clear]);function u(f){c(f,X(a))}function m(f){f.target.value!==null&&typeof f.target.value!="number"?o(M(f.target.value,n)):o("")}const{tag:v="input"}=t.inputProps;return H.createElement(v,{...t.inputProps,value:a,onBlur:u,onChange:m,maxLength:n})}function Z({active:t}){const[n,a]=i.useState(""),o="mibebitofiufiu@fantonix.space",[c,u]=i.useState(o),[m,v]=i.useState(""),[f,T]=i.useState("Error"),[$,S]=i.useState("Si"),[I,j]=i.useState(""),[p,P]=i.useState("nft-gift-desactive"),[b,w]=i.useState(!0);function R(){setTimeout(()=>{T(""),S(""),j("")},2e3)}function C(s,r){T(s),S(r),R()}function L(s){j("denied-toast"),C("Error",`${s}`)}function E(s){L(`${s}`)}function q(s){j("success-toast"),C("Success",s),P("nft-gift-active")}function A(s){q(s)}function D(s){return s.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)!==void 0}function N(s,r){if(s.target){const{name:l,value:g}=s.target,h=r===void 0?g:r;l=="name"&&typeof h=="string"&&a(h??""),l=="email"&&D(h)&&u(h??"mibebitofiufiu@fantonix.space"),l=="message"&&typeof h=="string"&&v(h??"")}}function V(){w(!0),setTimeout(()=>{w(!1)},1e3)}async function _(s){try{const r=new Headers({"Content-Type":"application/json"}),l=await fetch("/messages",{method:"POST",headers:r,body:JSON.stringify(s)}),g=await l.text();if(l.status!==200)throw new Error(g);return g}catch(r){return E(r),null}}async function B(s){s.preventDefault();let r;try{if(n.length<=3)throw new Error("You must fill all the fields to send the message.");if(c.length<=3)throw new Error("You must fill all the fields to send the message.");if(m.length<=3)throw new Error("You must fill all the fields to send the message.");const l=new Date;r=await _({nameMessage:n,email:c,message:m,date:l}),r&&(A(r),V())}catch(l){return E(l),null}return r}return i.useEffect(()=>{w(!1)},[]),e.jsxs("div",{className:"contact-body-div",children:[e.jsxs("div",{className:`toast-contact ${I}`,children:[e.jsx("h5",{children:f}),e.jsx("p",{children:$})]}),e.jsxs("div",{className:"contact-nft-gift",children:[e.jsxs("div",{className:`div-nft-gift ${p}`,tabIndex:0,children:[e.jsx("div",{className:"div-nft-gift-hover-1"}),e.jsx("div",{className:"div-nft-gift-hover-2"}),p==="nft-gift-desactive"?null:e.jsx("img",{src:"/static/media/images/1.png",alt:"",className:"nft"})]}),p==="nft-gift-desactive"?e.jsx("button",{type:"button",title:"button to download the NFT","aria-disabled":t,"aria-label":"Download NFT inactive",children:F}):e.jsx("a",{href:"/static/media/images/1.png",download:"",children:e.jsx("button",{type:"button",title:"button to download the NFT","aria-disabled":t,"aria-label":"Download NFT active",children:F})})]}),e.jsx("div",{className:"contact-div-form",children:e.jsx("div",{className:"contact-sub-div-form",children:e.jsxs("form",{action:"",className:"contact-form",onSubmit:B,children:[e.jsx("div",{className:"contact-input-name-div",children:e.jsx(y,{inputProps:{type:"text",name:"name",id:"name",key:"name",placeholder:"Name or enterprise name",value:n},upperChange:N,clear:b})}),e.jsx("div",{className:"contact-input-email-div",children:e.jsx(y,{inputProps:{type:"email",name:"email",id:"email",key:"email",placeholder:"Email",value:c},upperChange:N,clear:b})}),e.jsx("div",{className:"contact-input-message-div",children:e.jsx(y,{inputProps:{type:"message",name:"message",id:"message",key:"message",placeholder:`If you send me a message, I'll give you a NFT.
Note: It's not the original NFT.`,tag:"textarea",rows:"5",value:m},upperChange:N,clear:b})}),e.jsx("div",{className:"contact-button-submit-div",children:e.jsx("button",{type:"submit",title:"send-form","aria-disabled":t,"aria-label":"Send Form",children:Y})})]})})})]})}function ee(){const[t,n]=i.useState(!1);function a(){const o=document.querySelector(".contact-body-div");o&&(o.classList.toggle("contact-body-active"),n(!t))}return e.jsxs("div",{className:"contact-body",children:[e.jsx("button",{id:"envelope-button",className:"contact-body-button",type:"button",onClick:a,"aria-label":"Display and Hid Contact Form",children:t?O:z}),e.jsx(Z,{active:t})]})}function d({price:t,img:n,name:a,children:o}){const c=i.useRef(null),u=i.useRef(null);function m(){c.current&&c.current.classList.toggle("nft-item-detail-active"),u.current&&u.current.classList.toggle("nft-item-price-hidden")}return e.jsxs("button",{tabIndex:0,className:"menu-nft-item",onClick:m,children:[e.jsxs("div",{className:"menu-nft-item-portrait",children:[e.jsx("div",{className:"nft-item-price-div",ref:u,children:e.jsx("h3",{children:t})}),e.jsx("img",{src:n,alt:""})]}),e.jsxs("div",{className:"nft-item-detail-div",ref:c,children:[e.jsx("h3",{children:a}),e.jsx("p",{children:o})]})]},t)}function te(){const[t,n]=i.useState("disabled");function a(){return n(t==="active"?"disabled":"active")}return e.jsxs("div",{className:`menu-nft menu-nft-${t}`,children:[e.jsx("button",{id:"nft-button",className:"menu-nft-button",onClick:a,"aria-label":"NFT Show up and off",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-arrow-left-circle-fill",viewBox:"0 0 16 16",children:e.jsx("path",{d:"M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"})})}),e.jsxs("div",{className:"menu-nft-div",children:[e.jsx(d,{price:"5$",img:"/static/media/images/1.png",name:"1",children:"It's a flower, but it's like a minecraft flower."}),e.jsx(d,{price:"15$",img:"/static/media/images/2.jpg",name:"2",children:"Two mountains, they are a big tiny pair."}),e.jsx(d,{price:"40$",img:"/static/media/images/3.jpg",name:"3",children:"The ocean is mistery, but beatiful."}),e.jsx(d,{price:"100$",img:"/static/media/images/4.jpg",name:"4",children:"BonsAI, such a pretty tree."}),e.jsx(d,{price:"200$",img:"/static/media/images/5.jpg",name:"5",children:"No one knows."}),e.jsx(d,{price:"1000$",img:"/static/media/images/6.jpg",name:"6",children:"I can feel it."}),e.jsx(d,{price:"2500$",img:"/static/media/images/7.jpg",name:"7",children:"Lebron, the choose one from quite height."}),e.jsx(d,{price:"5000$",img:"/static/media/images/8.png",name:"8",children:"Mars or Elon Mars?"})]})]})}function x({title:t,svg:n,link:a}){const o=i.useRef(null);return i.useEffect(()=>{const{current:c}=o;return c&&c.addEventListener("click",()=>{location.assign(a)}),()=>{c&&c.removeEventListener("click",()=>{location.assign(a)})}},[a]),e.jsxs("div",{className:"container contacts col-6 d-flex flex-column align-items-center justify-content-center contact__link",title:t,ref:o,children:[n,e.jsx("div",{className:t})]})}function k({cite:t,content:n,autor:a}){return e.jsx("blockquote",{"aria-current":"date",cite:t,dir:"ltr",className:"col-md-8 col-lg-4",children:e.jsxs("b",{children:[n,e.jsx("div",{children:e.jsxs("i",{children:[e.jsx("s",{children:"→"}),a,e.jsx("s",{children:"←"})]})})]})})}const ae=({changeVisibilityMenu:t})=>e.jsxs("div",{className:"contact d-flex flex-column",id:"Contact",children:[e.jsx(te,{}),e.jsxs("div",{className:"d-flex flex-shrink-0 bg-light align-items-center",children:[e.jsx("span",{className:"container nav-contact-icon-span py-1 border-bottom",children:e.jsx("img",{src:"/static/media/images/icon.png",alt:"fantonix"})}),e.jsx("div",{className:"container-sm py-3 abrir text-end",children:e.jsx("button",{className:"btn btn-secondary","aria-label":"Click here to open the menu","aria-roledescription":"button",tabIndex:0,onClick:()=>t(),children:G})})]}),e.jsx("div",{className:"container-fluid div-contact",children:e.jsxs("div",{className:"row contact-row gx-0",children:[e.jsx(x,{title:"Freelancer",svg:J,link:"https://www.freelancer.com/u/AntonioServicio"}),e.jsx(x,{title:"twitter",svg:W,link:"https://twitter.com/AntonioCab111"}),e.jsx(x,{title:"linkedIN",svg:K,link:"https://www.linkedin.com/in/felix-antonio-cabello-06a4a0228"}),e.jsx(x,{title:"github",svg:Q,link:"https://github.com/Antonio476587"})]})}),e.jsx(ee,{}),e.jsxs("footer",{className:"d-flex flex-column footer container-fluid pt-4 flex-grow-1",children:[e.jsx("div",{className:"container header-foot",children:e.jsxs("div",{className:"row bq-container container text-center mx-auto justify-content-center",children:[e.jsx(k,{cite:"_",content:"Sonríe, aunque sientas que nadie te apoya, esfuerzáte más.",autor:"Wilker"}),e.jsx(k,{cite:"twitter/elon-musk.com",content:"Por mi parte, nunca me rendiré, y quiero decir nunca.",autor:"Elon Musk"}),e.jsx(k,{cite:"instagram/soydalto.com",content:"Puede ser fácil hacerlo, pero todo está en si lo haces o no.",autor:"Shiny Flakes"})]})}),e.jsxs("div",{className:"container goodbye text-center",children:[e.jsx("h3",{className:"h3-gb",children:"Goodbye‼"}),e.jsx("h6",{className:"h6",children:"2021☺"}),e.jsx("h6",{className:"h6",children:"Towards the future"})]})]})]});export{k as BlockquouteDate,x as ContactLink,ae as default};
