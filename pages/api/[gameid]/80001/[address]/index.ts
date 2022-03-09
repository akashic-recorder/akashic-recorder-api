import Cors from 'cors'
import initMiddleware from '../../../../../lib/init-middleware'
import { NextApiRequest, NextApiResponse } from 'next'
import { sampleEventData } from '../../../../../utils/sample-event'

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query: {gameid, chainid, address }, method } = req
  await cors(req, res)

  switch (method) {
    case 'GET':
      const resData = sampleEventData.map(e => {
        return {
          ...e,
          address: address
        }
      })
      try {
        if (!Array.isArray(resData)) {
          throw new Error('Cannot find user data')
        }
        res.status(200).json(resData)
      } catch (err: any) {
        res.status(500).json({ statusCode: 500, message: err.message })
      }
      break
    case 'POST':
      // Update or create data in your database
      res.status(200).json({})
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler
