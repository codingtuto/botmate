import { PrismaClient } from '.prisma/client'
import { dbClient } from './database'

class BotMateService {
  db: PrismaClient

  constructor() {
    this.db = dbClient
  }
}

export { BotMateService }
