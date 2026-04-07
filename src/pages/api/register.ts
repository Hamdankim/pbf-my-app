// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { signUp } from '@/utils/db/servicefirebase'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const email = String(req.body?.email || '').trim()
    const fullname = String(req.body?.fullname || '').trim()
    const password = String(req.body?.password || '')

    if (!email) {
      return res.status(400).json({ message: 'Email wajib diisi' })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password minimal 6 karakter' })
    }

    await signUp({ email, fullname, password }, (result: { status: string; message: string }) => {
      if (result.status === 'success') {
        res.status(200).json({ message: result.message })
      } else {
        const statusCode = result.message === 'User already exists' ? 400 : 500
        res.status(statusCode).json({ message: result.message })
      }
    })
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}