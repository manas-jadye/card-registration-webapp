import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { App } from "./app";

describe("App navigation", () => {
  it("shows the register card form by default", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Register card form" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Credit card number")).toBeInTheDocument();
  });

  it("shows the menu when the burger icon is clicked", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));

    expect(screen.getByRole("heading", { name: "Menu" })).toBeInTheDocument();
    expect(screen.getByText("This is menu content")).toBeInTheDocument();
  });

  it("returns to the register card form when back is clicked", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    fireEvent.click(
      screen.getByRole("button", { name: "Back to register card form" })
    );

    expect(
      screen.getByRole("heading", { name: "Register card form" })
    ).toBeInTheDocument();
  });
});