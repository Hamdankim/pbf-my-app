import TampilanProduk from "../../views/product";
import { ProductType } from "../../types/Product.type";
import { retrieveProducts } from "@/utils/db/servicefirebase";

type HalamanProdukStaticProps = {
    products: ProductType[];
};

const HalamanProdukStatic = ({ products }: HalamanProdukStaticProps) => {
    return (
        <div>
            <h1>Halaman Produk Static</h1>
            <TampilanProduk products={products} />
        </div>
    );
};

export default HalamanProdukStatic;

export async function getStaticProps() {
    const products = await retrieveProducts("products");

    return {
        props: {
            products,
        },
        revalidate: 10,
    };
}