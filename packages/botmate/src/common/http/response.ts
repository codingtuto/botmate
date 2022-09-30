import { Response } from 'express'

class ApiResponse<T extends {}> {
  statusCode: number
  message: string | undefined
  data?: T

  constructor(statusCode: number, message: string, data?: T) {
    this.statusCode = statusCode
    this.message = message
    this.data = data
  }

  send(res: Response) {
    res.status(this.statusCode).json({
      message: this.message,
      data: this.data,
    })
  }
}

export { ApiResponse }
