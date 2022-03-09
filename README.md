# Akaschic Recorder API

## install

```
$ yarn install
$ cp .env.local.example .env.local
```

## run

```
$ yarn dev
```

## get

```
$ export host=http://localhost:3000
$ export address=0xff93B45308FD417dF303D6515aB04D9e89a750Ca

$ curl -X GET ${host}/api/1/80001/${address}

[{"_id":"6228e760ccd880dc04ce6d54","event_id":"1","start":"2022-03-09 23:13:00","end":"2022-03-09 23:15:00","order":"1","address":"0xff93B45308FD417dF303D6515aB04D9e89a750Ca","cid":"QmVsUkKqg8pHkDMV4yPemssbguqQ7DdKzMFy57UaV69LeY","tx":"0xc5ec817fb7a4d25992104508443476ac7ef6f36a7b1d0eba2d8bb8378d9d8be4"}]
```

## post

```
$ curl -X POST -H "Content-Type: application/json" \
 -d '{"event_id": "1","start": "2022-03-10 00:13:00","end": "2022-03-10 00:15:00","order": "1"}' \
 ${host}/api/1/80001/${address}

{"event_id":"1","start":"2022-03-10 00:13:00","end":"2022-03-10 00:15:00","order":"1","address":"0xff93B45308FD417dF303D6515aB04D9e89a750Ca"}

$ curl -X GET ${host}/api/1/80001/${address}
[{"_id":"6228e760ccd880dc04ce6d54","event_id":"1","start":"2022-03-09 23:13:00","end":"2022-03-09 23:15:00","order":"1","address":"0xff93B45308FD417dF303D6515aB04D9e89a750Ca","cid":"QmVsUkKqg8pHkDMV4yPemssbguqQ7DdKzMFy57UaV69LeY","tx":"0xc5ec817fb7a4d25992104508443476ac7ef6f36a7b1d0eba2d8bb8378d9d8be4"},{"_id":"6228e8bcbab05983f91a0bfd","event_id":"1","start":"2022-03-10 00:13:00","end":"2022-03-10 00:15:00","order":"1","address":"0xff93B45308FD417dF303D6515aB04D9e89a750Ca","cid":"QmRkHS3euFpi42vYfDRn8E98DJMS3S3Ci8rK8MLPntr8ou","tx":"0x127c134895d7df6a82770e62f44a99c3c1bf11e688b913d77a0e2cec30e97988"}]

# check ipfs data
# https://gateway.lighthouse.storage/ipfs/QmRkHS3euFpi42vYfDRn8E98DJMS3S3Ci8rK8MLPntr8ou
# mumbai explorer
# https://mumbai.polygonscan.com/tx/0x127c134895d7df6a82770e62f44a99c3c1bf11e688b913d77a0e2cec30e97988
```
