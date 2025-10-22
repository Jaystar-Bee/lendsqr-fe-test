"use client";
import { ReactNode, useState } from "react";
import styles from "./input-group.module.scss";

interface PropsType {
  placeholder: string;
  id: string;
  buttonElement: ReactNode | string;
  name?: string;
  inputClassName?: string;
  buttonClassName?: string;
  onSubmit: (search: string) => void;
}
const InputGroup = ({
  placeholder,
  id,
  name,
  inputClassName,
  buttonClassName,
  buttonElement,
  onSubmit,
}: PropsType) => {
  const [search, setSearch] = useState("");
  return (
    <div data-testid="input-group" className={styles.container}>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        id={id}
        name={name || id}
        placeholder={placeholder}
        className={styles.input + " " + inputClassName}
      />
      <button
        className={styles.button + " " + buttonClassName}
        onClick={() => (search ? onSubmit(search) : undefined)}
      >
        {buttonElement}
      </button>
    </div>
  );
};

export default InputGroup;
