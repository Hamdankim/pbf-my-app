import { render, screen } from "@testing-library/react";
import { describe, expect, it, jest } from "@jest/globals";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/product/[produk]",
      pathname: "",
      query: {},
      asPath: "",
      push: jest.fn(),
      event: {
        on: jest.fn(),
        off: jest.fn(),
      },
      isReady: true,
    };
  },
}));

const TampilanProduk = require("../../pages/product").default;

describe("Product Page", () => {
  it("renders product page correctly", () => {
    const page = render(<TampilanProduk />);

    expect(screen.getByTestId("title").textContent).toBe("Daftar Produk");
    expect(page).toMatchSnapshot();
  });
});
