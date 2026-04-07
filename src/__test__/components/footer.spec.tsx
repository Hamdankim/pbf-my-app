import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "@jest/globals";
import Footer from "@/components/layouts/Footer";

describe("Footer component", () => {
  it("renders footer text", () => {
    render(<Footer />);

    expect(screen.getByText("Footer Component").textContent).toBe(
      "Footer Component",
    );
  });
});
