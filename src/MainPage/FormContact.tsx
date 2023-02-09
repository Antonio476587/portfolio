import React, {
  FormEvent,
  useEffect,
  useState,
} from "https://esm.sh/react@18.2.0";

import { cloudArrowD, envelope, envelopeOpen, send } from "../Utils/Svg.tsx";
import TextInput from "../Utils/TextInput.tsx";

interface ContactForm {
  active: boolean;
}

interface Message {
  nameMessage: string;
  email: email;
  message: string;
  date: Date;
}

function ContactForm({ active }: ContactForm) {
  const [nameMessage, setNameMessage] = useState("");
  const emailMocked: email = "mibebitofiufiu@fantonix.space";
  const [email, setEmail]: [
    email,
    React.Dispatch<React.SetStateAction<email>>,
  ] = useState(emailMocked);
  const [message, setMessage] = useState("");
  const [toastTitle, setToastTitle] = useState("Error");
  const [toastContent, setToastContent] = useState("Si");
  const [showingValidation, setShowingValidation] = useState("");
  const [giveNFT, setGiveNFT] = useState("nft-gift-desactive");
  const [clear, setClear] = useState(true);

  function removeToast(): void {
    setTimeout(() => {
      setToastTitle("");
      setToastContent("");
      setShowingValidation("");
    }, 2000);
  }

  function showToast(title: string, content: string): void {
    setToastTitle(title);
    setToastContent(content);
    removeToast();
  }

  function _showError(e: string): void {
    setShowingValidation("denied-toast");
    showToast("Error", `${e}`);
  }

  function showError(e: Error): void {
    _showError(`${e}`);
  }

  function _showValidation(data: string): void {
    setShowingValidation("success-toast");
    showToast("Success", data);
    setGiveNFT("nft-gift-active");
  }

  function showValidation(data: string): void {
    _showValidation(data);
  }

  function isEmail(email: string | number | null | email): email is email {
    return (
      (email as email).match(
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      ) !== undefined
    );
  }

  function upperChange(
    e: MouseEvent,
    naturalValue: null | string | email,
  ): void {
    if (e.target) {
      const { name, value: textValue } = e.target;
      const value = naturalValue === undefined ? textValue : naturalValue;

      if (name == "name" && typeof value == "string") {
        setNameMessage(value ?? "");
      }
      if (name == "email" && isEmail(value)) {
        setEmail(value ?? "mibebitofiufiu@fantonix.space");
      }
      if (name == "message" && typeof value == "string") {
        setMessage(value ?? "");
      }
    }
  }

  function clearInputs() {
    setClear(true);
    setTimeout(() => {
      setClear(false);
    }, 1000);
  }

  async function fetchMessage(data: Message) {
    try {
      const headers: Headers = new Headers({
        "Content-Type": "application/json",
      });
      const response: Response = await fetch("/messages", {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });
      const body: string = await response.text();
      /*       const result = JSON.parse(body); */
      return body;
    } catch (error) {
      showError(error);
      return null;
    }
  }

  async function handleSubmit(e: FormEvent): Promise<string | null> {
    e.preventDefault();
    let data: string | null;
    try {
      if (nameMessage.length <= 3) {
        throw new Error("You must fill all the fields to send the message.");
      } else if (email.length <= 3) {
        throw new Error("You must fill all the fields to send the message.");
      } else if (message.length <= 3) {
        throw new Error("You must fill all the fields to send the message.");
      }

      const created: Date = new Date();

      const newMessage: Message = {
        nameMessage,
        email,
        message,
        date: created,
      };

      data = await fetchMessage(newMessage);

      if (data) {
        showValidation(data);
        clearInputs();
      }
    } catch (error) {
      showError(error);
      return null;
    }
    return data;
  }

  useEffect(() => {
    setClear(false);
  }, []);

  return (
    <div className="contact-body-div">
      <div className={`toast-contact ${showingValidation}`}>
        <h5>{toastTitle}</h5>
        <p>{toastContent}</p>
      </div>

      <div className="contact-nft-gift">
        <div className={`div-nft-gift ${giveNFT}`} tabIndex={0}>
          <div className="div-nft-gift-hover-1" />
          <div className="div-nft-gift-hover-2" />
          {giveNFT === "nft-gift-desactive"
            ? null
            : <img src="/static/media/images/1.png" alt="" className="nft" />}
        </div>
        {giveNFT === "nft-gift-desactive"
          ? (
            <button
              type="button"
              title="button to download the NFT"
              aria-disabled={active}
              aria-label="Download NFT inactive"
            >
              {cloudArrowD}
            </button>
          )
          : (
            <a href="/static/media/images/1.png" download="">
              <button
                type="button"
                title="button to download the NFT"
                aria-disabled={active}
                aria-label="Download NFT active"
              >
                {cloudArrowD}
              </button>
            </a>
          )}
      </div>

      <div className="contact-div-form">
        <div className="contact-sub-div-form">
          <form action="" className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-input-name-div">
              <TextInput
                inputProps={{
                  type: "text",
                  name: "name",
                  id: "name",
                  key: "name",
                  placeholder: "Name or enterprise name",
                  value: nameMessage,
                }}
                upperChange={upperChange}
                clear={clear}
              />
            </div>
            <div className="contact-input-email-div">
              <TextInput
                inputProps={{
                  type: "email",
                  name: "email",
                  id: "email",
                  key: "email",
                  placeholder: "Email",
                  value: email,
                }}
                upperChange={upperChange}
                clear={clear}
              />
            </div>
            <div className="contact-input-message-div">
              <TextInput
                inputProps={{
                  type: "message",
                  name: "message",
                  id: "message",
                  key: "message",
                  placeholder:
                    "If you send me a message, I'll give you a NFT." +
                    "\nNote: It's not the original NFT.",
                  tag: "textarea",
                  rows: "5",
                  value: message,
                }}
                upperChange={upperChange}
                clear={clear}
              />
            </div>
            <div className="contact-button-submit-div">
              <button
                type="submit"
                title="send-form"
                aria-disabled={active}
                aria-label="Send Form"
              >
                {send}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function FormContact() {
  const [active, setActive] = useState(false);

  function formControl() {
    const form = document.querySelector(".contact-body-div");
    if (form) {
      form.classList.toggle("contact-body-active");
      setActive(!active);
    }
  }

  return (
    <div className="contact-body">
      <button
        id="envelope-button"
        className="contact-body-button"
        type="button"
        onClick={formControl}
        aria-label="Display and Hid Contact Form"
      >
        {!active ? envelope : envelopeOpen}
      </button>
      <ContactForm active={active} />
    </div>
  );
}

export { ContactForm };
