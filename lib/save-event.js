import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs'
import lighthouse from 'lighthouse-web3'

export default async function saveEvent(mongodb, eventData) {
  const wallet = await lighthouse.getKey(process.env.LIGHTHOUSE_PRIV_KEY_ENCRYPTED, process.env.LIGHTHOUSE_PASSWORD)
  try {
    const filename = uuidv4()
    const path = `tmp/${filename}.json`
    fs.writeFileSync(path, JSON.stringify(eventData), 'utf8')
    const quote = await lighthouse.getQuote(path, wallet.publicKey, process.env.LIGHTHOUSE_NETWORK)
    setTimeout(() => {
      fs.unlinkSync(path)
    }, 10 * 1000)
    const eventWithCid = {
      ...eventData,
      cid: "QmcBydp9QJAh5oq6xSpG9T9PnZ5LjHKsdscdgsW2etz2St" //quote.metaData[0].cid
    }
    mongodb.insertOne(eventWithCid)
  } catch (err) {
    console.log(err)
  }
}