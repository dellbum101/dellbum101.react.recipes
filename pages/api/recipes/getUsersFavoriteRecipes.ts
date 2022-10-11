// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<number[]>
) {
  const recipes = [637876, 638002, 638148]
  res.status(200).json(recipes)
}
