import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RegisterCardForm } from "./RegisterCardForm";

describe("RegisterCardForm", () => {
  it("greets the user by first name", () => {
    render(<RegisterCardForm firstName="Manas" />);

    expect(screen.getByText("Welcome Manas")).toBeInTheDocument();
  });

  it("shows validation errors when submitting an empty form", () => {
    render(<RegisterCardForm firstName="Manas" />);

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getAllByRole("alert").length).toBe(3);
  });

  it("shows a success message when submitting valid details", () => {
    render(<RegisterCardForm firstName="Manas" />);

    fireEvent.change(screen.getByLabelText("Credit card number"), {
      target: { value: "4111111111111111" },
    });
    fireEvent.change(screen.getByLabelText("CVC"), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByLabelText("Expiry"), {
      target: { value: "1230" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(
      screen.getByText("Card details submitted successfully!")
    ).toBeInTheDocument();
  });
});