import { NextApiRequest, NextApiResponse } from 'next'
import websocket from 'ws'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const wss = new websocket.Server({ port: 3000 })

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      console.log(message)
      ws.send(message)
    })
  })
}
