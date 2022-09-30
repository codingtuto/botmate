import { Router } from 'express'

class CustomRouter {
  router: Router

  constructor() {
    this.router = Router()
  }
}

export { CustomRouter }
