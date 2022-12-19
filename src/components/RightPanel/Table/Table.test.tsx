import { render, screen } from "@testing-library/react";
import { Table } from "./Table";

describe("Table", () => {
  test("renders", () => {
    render(<Table/>);
    const tableElement = screen.getByTestId("table-box");
    expect(tableElement).toBeInTheDocument();
  });
});
