import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  revalidated: boolean;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // 1. Validasi Keamanan: Mengecek token dari query parameter
  if (req.query.token !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({
      revalidated: false,
      message: "Insert correct token",
    });
  }

  // 2. Validasi Parameter Data
  if (req.query.data === "produk") {
    try {
      // Melakukan On-demand Revalidation
      await res.revalidate("/produk/static");
      return res.status(200).json({ revalidated: true });
    } catch (error) {
      // Log error jika revalidasi gagal (misal: path salah)
      console.error("Error in API route:", error);
      return res.status(500).send({ revalidated: false });
    }
  }

  // 3. Respon jika parameter 'data' tidak sesuai
  return res.json({
    revalidated: false,
    message: "Invalid query parameter. Expected 'data=produk'.",
  });
}