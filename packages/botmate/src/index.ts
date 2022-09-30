import { Server } from 'botmate/core/server'

class BotMate {
  server: Server

  constructor() {
    this.server = new Server()
  }

  init() {
    this.server.listen()
  }
}

const botmate = new BotMate()
botmate.init()
