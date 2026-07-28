import React, { useState } from "react";
import * as styles from "./app.module.scss";
import { Header } from "./components/Header/Header";
import { Menu } from "./components/Menu/Menu";
import { RegisterCardForm } from "./components/RegisterCardForm/RegisterCardForm";

type View = "form" | "menu";

// Placeholder for the authenticated user, in place of real user data/session.
const user = { firstName: "Manas" };

export const App = () => {
  const [view, setView] = useState<View>("form");

  const showMenu = () => setView("menu");
  const showForm = () => setView("form");

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <Header
          title={view === "form" ? "Register card form" : "Menu"}
          iconType={view === "form" ? "menu" : "back"}
          onIconClick={view === "form" ? showMenu : showForm}
        />
        <main className={styles.content}>
          {view === "form" ? (
            <RegisterCardForm firstName={user.firstName} />
          ) : (
            <Menu />
          )}
        </main>
      </div>
    </div>
  );
};