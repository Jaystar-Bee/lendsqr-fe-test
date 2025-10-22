import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Login from "@/app/page";
import { MantineProvider } from "@mantine/core";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img  alt={props.alt || "image"} {...props} fill="false" />;
  },
}));

describe("Login Page", () => {
  it("renders successfully", () => {
    render(
      <MantineProvider>
        <Login />
      </MantineProvider>
    );
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
  });

  it("displays the logo", () => {
    render(
      <MantineProvider>
        <Login />
      </MantineProvider>
    );
    const logo = screen.getByAltText("logo");
    expect(logo).toBeInTheDocument();
  });

  it("renders ImageSection and FormSection components", () => {
    render(
      <MantineProvider>
        <Login />
      </MantineProvider>
    );
    const imageSection = screen.getByTestId("image-section");
    const formSection = screen.getByTestId("form-section");

    expect(imageSection).toBeInTheDocument();
    expect(formSection).toBeInTheDocument();
  });
});
