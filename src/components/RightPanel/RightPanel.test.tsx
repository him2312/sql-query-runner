import { render, screen } from "@testing-library/react";
import { RightPanel } from "./RightPanel";

describe("RightPanel", () => {
  test("renders", () => {
    render(<RightPanel/>);
    const executorElement = screen.getByTestId("executor");
    expect(executorElement).toBeInTheDocument();
  });
});
