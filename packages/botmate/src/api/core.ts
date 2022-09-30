import { Router } from 'express'
import { ApiResponse } from 'botmate/common/http'

import * as authController from './controllers/auth'

class CoreApi {
  router: Router

  constructor(router: Router) {
    this.router = router

    router.get('/ping', (_req, res) => {
      const response = new ApiResponse(200, 'pong')
      response.send(res)
    })

    this.auth()
  }

  auth() {
    /** Routes related to authentication */
    this.router.post('/auth/login', authController.loginUser)
    this.router.post('/auth/register', authController.createUser)
  }
}

export { CoreApi }
