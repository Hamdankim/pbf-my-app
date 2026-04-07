import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Head>
        <title>Praktikum Next.js Pages Router</title>
        <meta
          name="description"
          content="Halaman praktikum Next.js menggunakan Pages Router untuk mahasiswa D4 Pengembangan Web."
        />
      </Head>

      <h1>Praktikum Next.js Pages Router</h1>
      <p>Mahasiswa D4 Pengembangan Web</p>

      <br />

      <Image
        src="/nextjs.png"
        alt="Ilustrasi Next.js"
        width={300}
        height={200}
      />

      <br />
      <br />

      <p>
        <Link href="/about">About Page</Link>
      </p>
    </div>
  );
}
