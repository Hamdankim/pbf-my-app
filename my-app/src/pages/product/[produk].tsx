import DetailProduk from "../../views/DetailProduct";
import { ProductType } from "@/types/Product.type";
import { retrieveDataByID, retrieveProducts } from "@/utils/db/servicefirebase";

const HalamanProduk = ({ product }: { product: ProductType }) => {
  // digunakan client-side rendering
  // const Router = useRouter();

  return (
    <div>
      <DetailProduk products={product} />
    </div>
  );
};

export default HalamanProduk;

/* digunakan server-side rendering */
// export async function getServerSideProps({ params }: { params: { produk: string } }) {
//   const res = await fetch(`http://localhost:3000/api/produk/${params?.produk}`);
//   const response = await res.json();
//   // console.log("Data produk yang diambil dari API:", response);

//   return {
//     props: {
//       product: response.data, // Pastikan untuk memberikan nilai default jika data tidak tersedia
//     },
//   };
// }

/* digunakan static-site generation */
export async function getStaticPaths() {
  const products = await retrieveProducts("products");

  const paths = products.map((product: { id: string }) => ({
    params: { produk: product.id },
  }));

  // console.log("Paths yang dihasilkan untuk produk:", paths); // Debugging

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { produk: string } }) {
  const product = await retrieveDataByID("products", params?.produk);

  // console.log("Data produk yang diambil dari API:", response);

  return {
    props: {
      product,
    },
  };
}