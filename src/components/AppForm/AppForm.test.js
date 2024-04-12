import React from "react";

import { render, fireEvent } from "@testing-library/react";
import AppForm from "./AppForm";

describe("AppForm component", () => {
  it("Renders without crashing", () => {
    render(<AppForm />);
  });

  it("Submits form data when convert button is clicked", () => {
    const convertDataMock = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <AppForm convertData={convertDataMock} />
    );

    const textarea = getByPlaceholderText("Enter your text here...");
    const submitButton = getByText("Convert to PDF");

    fireEvent.change(textarea, { target: { value: "Sample text" } });
    fireEvent.click(submitButton);

    expect(convertDataMock).toHaveBeenCalledWith("Sample text");
  });

  it("Displays an error message if textarea is empty", () => {
    const convertDataMock = jest.fn();
    const { getByText } = render(<AppForm convertData={convertDataMock} />);

    const submitButton = getByText("Convert to PDF");

    fireEvent.click(submitButton);

    expect(getByText("Enter some text!")).toBeInTheDocument();
  });
});
