/// <reference path="../../utils/moduleDeclarations.ts"/>

import React, {
  ChangeEvent,
  useEffect,
  useState,
} from "https://esm.sh/react@18.2.0";

function format(text: string | null) {
  return text != null ? text : "";
}

function unformat(text: string | null) {
  return text?.trim().length === 0 ? null : text;
}

function secureLength(text: string, maxL: number) {
  return text.length > maxL ? text.slice(0, maxL) : text;
}

interface inputProps {
  type?: string;
  name: string;
  id: string;
  key: string;
  placeholder: string;
  tag?: string;
  rows?: string;
  columns?: string;
  value: string | null | email;
  maxLength?: number;
}

interface TextInputProps {
  inputProps: inputProps;
  upperChange(e: MouseEvent, value: null | string | email): void;
  clear: boolean;
}

export default function TextInput(props: TextInputProps): React.ReactElement {
  const { maxLength = 255 } = props.inputProps;

  const [value, setValue] = useState(
    secureLength(format(props.inputProps.value), maxLength),
  );
  const { upperChange } = props;

  useEffect(() => {
    if (props.clear == true) setValue("");
  }, [props.clear]);

  function onBlur(e: MouseEvent) {
    upperChange(e, unformat(value));
  }

  function onChange(e: ChangeEvent) {
    e.target.value !== null && typeof e.target.value !== "number"
      ? setValue(secureLength(e.target.value, maxLength))
      : setValue("");
  }

  const { tag = "input" } = props.inputProps;

  return React.createElement(tag, {
    ...props.inputProps,
    value,
    onBlur,
    onChange,
    maxLength,
  });
}
