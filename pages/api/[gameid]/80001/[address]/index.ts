import { NextApiRequest, NextApiResponse } from 'next'
import { sampleEventData } from '../../../../../utils/sample-event'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { gameid, chainid, address } = req.query
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
}

export default handler
