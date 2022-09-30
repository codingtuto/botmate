import { CustomRouter } from 'botmate/common/http/router'
import { CoreApi } from './core'

class ApiService extends CustomRouter {
  constructor() {
    super()
  }

  setup() {
    const routes = [CoreApi]

    routes.forEach((route) => {
      new route(this.router)
    })
  }
}

export { ApiService }
