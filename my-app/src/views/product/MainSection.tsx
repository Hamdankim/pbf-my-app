import { useEffect, useState } from "react";

type ProductType = {
  id: string;
  name: string;
  price: number;
  size: string;
  category: string;
};

type Props = {
  productId?: string;
};

const MainSection = ({ productId }: Props) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [product, setProduct] = useState<ProductType | null>(null);

  const fetchData = () => {
    fetch("/api/produk")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);

        if (productId) {
          const found = data.data.find(
            (item: ProductType) => item.id === productId
          );
          setProduct(found || null);
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, [productId]);

  return (
    <section className="flex justify-center py-10">
      <div className="bg-white shadow-md rounded-lg p-6 text-center w-full max-w-md">

        {/* BUTTON REFRESH */}
        <button
          onClick={fetchData}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refresh Data
        </button>

        {/* MODE LIST */}
        {!productId &&
          products.map((item) => (
            <div key={item.id} className="mb-4">
              <h2>{item.name}</h2>
              <p>Harga: {item.price}</p>
              <p>Ukuran: {item.size}</p>
              <p>Kategori: {item.category}</p>
            </div>
          ))}

        {/* MODE DETAIL */}
        {productId && product && (
          <>
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p>Harga: {product.price}</p>
            <p>Ukuran: {product.size}</p>
            <p>Kategori: {product.category}</p>
          </>
        )}
      </div>
    </section>
  );
};

export default MainSection;