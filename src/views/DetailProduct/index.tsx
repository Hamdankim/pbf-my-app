import { ProductType } from "../../types/Product.type";
import Image from "next/image";
import styles from "./detailProduct.module.scss";

const DetailProduk = ({ products }: { products: ProductType }) => {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Detail Produk</h1>

        <div className={styles.produkdetail}>
          <div className={styles.produkdetail__image}>
            <Image
              src={products.image || "/nextjs.png"}
              alt={products.name}
              width={600}
              height={600}
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </div>

          <div className={styles.produkdetail__info}>
            <h1 className={styles.produkdetail__name}>{products.name}</h1>

            <p className={styles.produkdetail__category}>{products.category}</p>

            <p className={styles.produkdetail__price}>
              Rp {products.price?.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProduk;
