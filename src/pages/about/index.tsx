import Link from 'next/link'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function About() {
  return (
    <div>
      <h1 data-testid="title">About Page</h1> <br />
      <h1>Nama: Hamdan Azizul Hakim <br /> NIM: 2341720251 <br /> Program Studi: D4 Teknik Informatika</h1><br />
      <Link href="/">Kembali ke Home</Link>
    </div>
  )
}
