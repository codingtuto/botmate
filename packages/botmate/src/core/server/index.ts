import Express from 'express'
import { info, warn } from 'botmate/core/logger'
import { ApiService } from 'botmate/api'

class Server {
  app: Express.Application
  stopServer: () => void

  constructor() {
    this.app = Express()

    this.init()
    this.stopServer = () => {
      warn('no active server to stop')
    }
  }

  init() {
    info('initializing server...')

    this.app.use(Express.json())

    const apiService = new ApiService()
    this.app.use('/api', apiService.router)

    apiService.setup()
  }

  stop() {
    info('stopping server...')
  }

  listen(port = 3000) {
    const server = this.app.listen(port, () => {
      info(`server listening on port ${port}`)
    })

    this.stopServer = () => {
      info('stopping server...')
      server.close(() => {
        info('server stopped')
      })
    }
  }
}

export { Server }
