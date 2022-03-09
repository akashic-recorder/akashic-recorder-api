import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs'

export default async function saveEvent(mongodb, eventData) {
  try {
    const filename = uuidv4()
    const path = `tmp/${filename}.json`
    fs.writeFileSync(path, JSON.stringify(eventData), 'utf8')
    setTimeout(() => {
      fs.unlinkSync(path)
    }, 10 * 1000)
    const eventWithCid = {
      ...eventData,
      cid: "QmcBydp9QJAh5oq6xSpG9T9PnZ5LjHKsdscdgsW2etz2St"
    }
    mongodb.insertOne(eventWithCid)
  } catch (err) {
    console.log(err)
  }
}