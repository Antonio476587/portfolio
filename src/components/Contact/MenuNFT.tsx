import React, { useRef, useState } from "react";
import Image from "../../shared/utilities/Image.tsx";

interface MenuNFTItem {
  price: string;
  img: string;
  name: string;
  children: React.ReactNode;
}

function MenuNFTItem({ price, img, name, children }: MenuNFTItem) {
  const nftDetailRef: React.RefObject<HTMLDivElement> = useRef(null);
  const nftPriceRef: React.RefObject<HTMLDivElement> = useRef(null);

  function activeNFT() {
    if (nftDetailRef.current) {
      nftDetailRef.current.classList.toggle("nft-item-detail-active");
    }
    if (nftPriceRef.current) {
      nftPriceRef.current.classList.toggle("nft-item-price-hidden");
    }
  }

  return (
    <button
      tabIndex={0}
      className="menu-nft-item"
      onClick={activeNFT}
      key={price}
    >
      <div className="menu-nft-item-portrait">
        <div className="nft-item-price-div" ref={nftPriceRef}>
          <h3>{price}</h3>
        </div>
        <Image src={img} alt="" />
      </div>
      <div className="nft-item-detail-div" ref={nftDetailRef}>
        <h3>{name}</h3>
        <p>{children}</p>
      </div>
    </button>
  );
}

export default function MenuNFT() {
  const [active, setActive] = useState("disabled");

  function activeMenuNFT() {
    if (active === "active") return setActive("disabled");
    return setActive("active");
  }

  return (
    <div className={`menu-nft menu-nft-${active}`}>
      <button
        id="nft-button"
        className="menu-nft-button"
        onClick={activeMenuNFT}
        aria-label="NFT Show up and off"
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
        <MenuNFTItem price="5$" img="/static/media/images/1.png" name="1">
          It&apos;s a flower, but it&apos;s like a minecraft flower.
        </MenuNFTItem>
        <MenuNFTItem price="15$" img="/static/media/images/2.jpg" name="2">
          Two mountains, they are a big tiny pair.
        </MenuNFTItem>
        <MenuNFTItem price="40$" img="/static/media/images/3.jpg" name="3">
          The ocean is mistery, but beatiful.
        </MenuNFTItem>
        <MenuNFTItem price="100$" img="/static/media/images/4.jpg" name="4">
          BonsAI, such a pretty tree.
        </MenuNFTItem>
        <MenuNFTItem price="200$" img="/static/media/images/5.jpg" name="5">
          No one knows.
        </MenuNFTItem>
        <MenuNFTItem price="1000$" img="/static/media/images/6.jpg" name="6">
          I can feel it.
        </MenuNFTItem>
        <MenuNFTItem price="2500$" img="/static/media/images/7.jpg" name="7">
          Lebron, the choose one from quite height.
        </MenuNFTItem>
        <MenuNFTItem price="5000$" img="/static/media/images/8.png" name="8">
          Mars or Elon Mars?
        </MenuNFTItem>
      </div>
    </div>
  );
}

export { MenuNFTItem };
