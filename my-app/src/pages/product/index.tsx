import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TampilanProduk from "../../views/product";
import useSWR from "swr";
import fetcher from "../../utils/swr/fetcher";

const Kategori = () => {
  const { push } = useRouter();

  // Memanggil API menggunakan SWR
  const { data, error, isLoading } = useSWR("/api/produk", fetcher);

  // Menangani kondisi error (opsional tapi disarankan)
  if (error) return <div>Gagal memuat data produk.</div>;

  return (
    <div>
      {/* Menggunakan optional chaining (?.) untuk menghindari crash jika data belum ada */}
      <TampilanProduk products={isLoading ? [] : data?.data || []} />
    </div>
  );
};

export default Kategori;