import { render, screen } from "@testing-library/react";
import { describe, expect, it, jest } from "@jest/globals";

const mockUseRouter = jest.fn();

jest.mock("next/router", () => ({
  useRouter: () => mockUseRouter(),
}));

const BlogSlugPage = require("../../pages/blog/[slug]").default;
const CategoryPage = require("../../pages/category/[[...slug]]").default;
const ShopPage = require("../../pages/shop/[[...slug]]").default;

describe("Routing pages", () => {
  it("renders blog slug page", () => {
    mockUseRouter.mockReturnValue({ query: { slug: "testing-next" } });

    render(<BlogSlugPage />);

    expect(screen.getByText("Blog Post: testing-next").textContent).toBe(
      "Blog Post: testing-next",
    );
  });

  it("renders category page with slug segments", () => {
    mockUseRouter.mockReturnValue({ query: { slug: ["tech", "frontend"] } });

    render(<CategoryPage />);

    expect(screen.getByText("Halaman Category").textContent).toBe(
      "Halaman Category",
    );
    expect(screen.getByText("tech").textContent).toBe("tech");
    expect(screen.getByText("frontend").textContent).toBe("frontend");
  });

  it("renders shop page with slug segments", () => {
    mockUseRouter.mockReturnValue({ query: { slug: ["sepatu", "laki-laki"] } });

    render(<ShopPage />);

    expect(screen.getByText("Halaman Toko").textContent).toBe("Halaman Toko");
    expect(screen.getByText("Toko: sepatu-laki-laki").textContent).toBe(
      "Toko: sepatu-laki-laki",
    );
  });
});
