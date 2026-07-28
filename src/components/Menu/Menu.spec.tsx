import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Menu } from "./Menu";

describe("Menu", () => {
  it("renders the menu content", () => {
    render(<Menu />);

    expect(screen.getByText("This is menu content")).toBeInTheDocument();
  });
});