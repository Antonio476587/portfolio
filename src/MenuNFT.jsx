import React, { useState, useRef } from "react";

function MenuNFTItem({ price, img, name, children }) {
  const nftDetailRef = useRef();
  const nftPriceRef = useRef();

  function activeNFT() {
    nftDetailRef.current.classList.toggle("nft-item-detail-active");
    nftPriceRef.current.classList.toggle("nft-item-price-hidden");
  }

  return (
    <div
      role="button"
      tabIndex="0"
      className="menu-nft-item"
      onClick={activeNFT}
      key={price}
    >
      <div className="menu-nft-item-portrait">
        <div className="nft-item-price-div" ref={nftPriceRef}>
          <h3>{price}</h3>
        </div>
        <img src={img} alt="" />
      </div>
      <div className="nft-item-detail-div" ref={nftDetailRef}>
        <h3>{name}</h3>
        <p>{children}</p>
      </div>
    </div>
  );
}

export default function MenuNFT() {
  const [Active, setActive] = useState("disabled");

  function ActiveMenuNFT() {
    if (Active === "active") return setActive("disabled");
    return setActive("active");
  }

  return (
    <div className={`menu-nft menu-nft-${Active}`}>
      <button
        id="nft-button"
        className="menu-nft-button"
        onClick={ActiveMenuNFT}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-left-circle-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
        </svg>
      </button>
      <div className="menu-nft-div">
        <MenuNFTItem price="5$" img="/img/1.png" name="1">
          Lorem ipsum dolor sit amet consectetur.
        </MenuNFTItem>
        <MenuNFTItem price="5$" img="/img/1.png" name="2">
          Lorem ipsum dolor sit amet consectetur.
        </MenuNFTItem>
        <MenuNFTItem price="5$" img="/img/1.png" name="3">
          Lorem ipsum dolor sit amet consectetur.
        </MenuNFTItem>
        <MenuNFTItem price="5$" img="/img/1.png" name="4">
          Lorem ipsum dolor sit amet consectetur.
        </MenuNFTItem>
        <MenuNFTItem price="5$" img="/img/1.png" name="5">
          Lorem ipsum dolor sit amet consectetur.
        </MenuNFTItem>
        <MenuNFTItem price="5$" img="/img/1.png" name="6">
          Lorem ipsum dolor sit amet consectetur.
        </MenuNFTItem>
        <MenuNFTItem price="5$" img="/img/1.png" name="7">
          Lorem ipsum dolor sit amet consectetur.
        </MenuNFTItem>
        <MenuNFTItem price="5$" img="/img/1.png" name="8">
          Lorem ipsum dolor sit amet consectetur.
        </MenuNFTItem>
        <MenuNFTItem price="5$" img="/img/1.png" name="9">
          Lorem ipsum dolor sit amet consectetur.
        </MenuNFTItem>
        <MenuNFTItem price="5$" img="/img/1.png" name="10">
          Lorem ipsum dolor sit amet consectetur.
        </MenuNFTItem>
      </div>
    </div>
  );
}
