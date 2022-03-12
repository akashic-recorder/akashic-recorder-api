import Cors from 'cors'
import initMiddleware from '../../../../../lib/init-middleware'
import validateMiddleware from '../../../../../lib/validate-middleware'
import withDatabase from '../../../../../lib/database-middleware'
import saveEvent from '../../../../../lib/save-event'
import { NextApiRequest, NextApiResponse } from 'next'
import { Event } from '../../../../../interfaces'
import { check, validationResult } from 'express-validator'

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)

const validateBody = initMiddleware(
  validateMiddleware([
      check('event_id').isInt(),
      check('start_time').isISO8601(),
      check('end_time').isISO8601(),
      check('event_name').isString(),
      check('rank_num').isInt()
  ], validationResult)
)

const handler = async (req, res: NextApiResponse) => {
  const { query: {gameid, chainid, address }, method } = req
  await cors(req, res)

  switch (method) {
    case 'GET':
      const resData = await req.db.find({address: address}).toArray()
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
      await validateBody(req, res)
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }
      const body: Event = {
        ...req.body,
        address: address
      }
      res.status(200).json(body)
      console.log(body)
      saveEvent(req.db, body)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default withDatabase(handler, "game-event");
