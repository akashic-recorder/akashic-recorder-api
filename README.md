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
```

## post

```
$ curl -X POST -H "Content-Type: application/json" \
 -d '{"event_id": "1","start": "2022-03-09 23:13:00","end": "2022-03-09 23:15:00","order": "1"}' \
 ${host}/api/1/80001/${address}
```