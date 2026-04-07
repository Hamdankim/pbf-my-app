import { render, screen } from "@testing-library/react";
import { describe, expect, it, jest, beforeEach } from "@jest/globals";

const mockRetrieveProducts = jest.fn();
const mockRetrieveDataByID = jest.fn();
const mockFetch = jest.fn();

jest.mock("../../utils/db/servicefirebase", () => ({
  retrieveProducts: (...args: unknown[]) => mockRetrieveProducts(...args),
  retrieveDataByID: (...args: unknown[]) => mockRetrieveDataByID(...args),
}));

jest.mock("../../views/product", () => ({
  __esModule: true,
  default: ({
    products,
  }: {
    products: Array<{ id: string; name: string }>;
  }) => <div data-testid="mock-product-view">{products.length} items</div>,
}));

jest.mock("../../views/DetailProduct", () => ({
  __esModule: true,
  default: ({ products }: { products: { id: string; name: string } }) => (
    <div data-testid="mock-detail-product">{products.name}</div>
  ),
}));

const ProductDetailPage = require("../../pages/product/[produk]").default;
const ProductStaticPage = require("../../pages/product/static").default;
const ProductServerPage = require("../../pages/product/server").default;

beforeEach(() => {
  mockRetrieveProducts.mockReset();
  mockRetrieveDataByID.mockReset();
  mockFetch.mockReset();
  global.fetch = mockFetch as unknown as typeof fetch;
});

describe("Product route pages", () => {
  it("renders the product detail page", () => {
    render(
      <ProductDetailPage product={{ id: "1", name: "Produk Detail" } as any} />,
    );

    expect(screen.getByTestId("mock-detail-product").textContent).toBe(
      "Produk Detail",
    );
  });

  it("returns product static paths and props", async () => {
    mockRetrieveProducts.mockResolvedValue([{ id: "1" }, { id: "2" }]);
    mockRetrieveDataByID.mockResolvedValue({ id: "1", name: "Produk Detail" });

    await expect(
      require("../../pages/product/[produk]").getStaticPaths(),
    ).resolves.toEqual({
      paths: [{ params: { produk: "1" } }, { params: { produk: "2" } }],
      fallback: false,
    });

    await expect(
      require("../../pages/product/[produk]").getStaticProps({
        params: { produk: "1" },
      }),
    ).resolves.toEqual({
      props: { product: { id: "1", name: "Produk Detail" } },
    });
  });

  it("returns static product props", async () => {
    mockRetrieveProducts.mockResolvedValue([{ id: "1", name: "Produk A" }]);

    await expect(
      require("../../pages/product/static").getStaticProps(),
    ).resolves.toEqual({
      props: {
        products: [{ id: "1", name: "Produk A" }],
      },
      revalidate: 10,
    });
  });

  it("returns server product props", async () => {
    mockFetch.mockResolvedValue({
      json: jest
        .fn()
        .mockResolvedValue({ data: [{ id: "1", name: "Produk A" }] }),
    });

    await expect(
      require("../../pages/product/server").getServerSideProps(),
    ).resolves.toEqual({
      props: {
        products: [{ id: "1", name: "Produk A" }],
      },
    });
  });

  it("renders the server product page", () => {
    render(<ProductServerPage products={[{ id: "1", name: "Produk A" }]} />);

    expect(screen.getByTestId("mock-product-view").textContent).toBe("1 items");
  });

  it("renders the static product page", () => {
    render(<ProductStaticPage products={[{ id: "1", name: "Produk A" }]} />);

    expect(screen.getByText("Halaman Produk Static").textContent).toBe(
      "Halaman Produk Static",
    );
  });
});
