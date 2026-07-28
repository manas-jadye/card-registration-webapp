import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "./Header";

describe("Header", () => {
  it("renders the given title", () => {
    render(
      <Header title="Register card form" iconType="menu" onIconClick={jest.fn()} />
    );

    expect(
      screen.getByRole("heading", { name: "Register card form" })
    ).toBeInTheDocument();
  });

  it("labels the icon button as 'Open menu' when iconType is menu", () => {
    render(<Header title="Register card form" iconType="menu" onIconClick={jest.fn()} />);

    expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument();
  });

  it("labels the icon button as 'Back to register card form' when iconType is back", () => {
    render(<Header title="Menu" iconType="back" onIconClick={jest.fn()} />);

    expect(
      screen.getByRole("button", { name: "Back to register card form" })
    ).toBeInTheDocument();
  });

  it("calls onIconClick when the icon button is pressed", () => {
    const onIconClick = jest.fn();
    render(<Header title="Menu" iconType="back" onIconClick={onIconClick} />);

    fireEvent.click(screen.getByRole("button"));

    expect(onIconClick).toHaveBeenCalledTimes(1);
  });
});