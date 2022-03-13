import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs'
import axios from 'axios'
import { ethers } from 'ethers';
import lighthouse from 'lighthouse-web3'

export default async function saveEvent(mongodb, eventData) {
  try {
    const filename = uuidv4()
    const path = `tmp/${filename}.json`
    fs.writeFileSync(path, JSON.stringify(eventData), 'utf8')
    const key = await lighthouse.getKey(process.env.LIGHTHOUSE_PRIV_KEY_ENCRYPTED, process.env.LIGHTHOUSE_PASSWORD)
    const provider = new ethers.providers.JsonRpcProvider(process.env.LIGHTHOUSE_NETWORK_RPC)
    const signer = new ethers.Wallet(key.privateKey, provider)
    const messageResponse = await axios.get(
      `https://api.lighthouse.storage/api/lighthouse/get_message?publicKey=${key.publicKey}`
    )
    const message = messageResponse.data
    const signedMessage = await signer.signMessage(message)
    const deploy = await lighthouse.deploy(path, signer, false, signedMessage, key.publicKey, process.env.LIGHTHOUSE_NETWORK)
    fs.unlinkSync(path)
    const eventWithCid = {
      ...eventData,
      cid: deploy.Hash,
      tx: deploy.txObj.transactionHash,
      block_height: deploy.txObj.blockNumber
    }
    mongodb.insertOne(eventWithCid)
  } catch (err) {
    console.log(err)
  }
}