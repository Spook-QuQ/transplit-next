import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  return response.end(`Hello Test Api!`)
}
