import React, { FC } from "react";
import * as styles from "./Menu.module.scss";

export const Menu: FC = () => {
  return (
    <div className={styles.menu}>
      <p>This is menu content</p>
    </div>
  );
};