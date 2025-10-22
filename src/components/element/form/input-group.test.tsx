import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputGroup from "./input-group";

const handleSubmit = jest.fn();

describe("Custom input group", () => {
  it("renders successfully", () => {
    render(
      <InputGroup
        placeholder="search"
        id="search"
        buttonElement="Search"
        onSubmit={handleSubmit}
      />
    );
    const inputGroup = screen.getByTestId("input-group");
    expect(inputGroup).toBeInTheDocument();
  });

  it("has input and button elements", () => {
    render(
      <InputGroup
        placeholder="search"
        id="search"
        buttonElement="Search"
        onSubmit={handleSubmit}
      />
    );
    const input = screen.getByPlaceholderText("search");
    const button = screen.getByText("Search");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("calls onSubmit with input value when button is clicked", async () => {
    render(
      <InputGroup
        placeholder="search"
        id="search"
        buttonElement="Search"
        onSubmit={handleSubmit}
      />
    );
    const input = screen.getByPlaceholderText("search") as HTMLInputElement;
    const button = screen.getByRole("button");
    const user = userEvent.setup();

    
    await user.type(input, "john");
    await user.click(button);

    expect(handleSubmit).toHaveBeenCalledWith("john");

    expect(handleSubmit).toHaveBeenCalledWith("john");
  });
});
