import React, { FC } from "react";
import * as styles from "./Header.module.scss";
import { BurgerIcon } from "../icons/BurgerIcon";
import { BackArrowIcon } from "../icons/BackArrowIcon";

export type HeaderIconType = "menu" | "back";

type HeaderProps = {
  title: string;
  iconType: HeaderIconType;
  onIconClick: () => void;
};

export const Header: FC<HeaderProps> = ({ title, iconType, onIconClick }) => {
  const label =
    iconType === "menu" ? "Open menu" : "Back to register card form";

  return (
    <header className={styles.header}>
      <button
        type="button"
        className={styles.iconButton}
        onClick={onIconClick}
        aria-label={label}
      >
        {iconType === "menu" ? <BurgerIcon /> : <BackArrowIcon />}
      </button>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
};