import { Request, Response } from 'express'

import { AuthService } from 'botmate/core/auth'
import { ApiResponse } from 'botmate/common/http'
import { LoginDTO, RegisterDTO } from 'botmate/common/interfaces/auth'

const authService = new AuthService()

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const body = req.body as RegisterDTO
  let response: InstanceType<typeof ApiResponse>

  try {
    const user = await authService.register(body)
    const jwt = authService.generateJwt({ id: user.id })
    response = new ApiResponse(200, 'User account created', { jwt })
  } catch (e) {
    response = new ApiResponse(400, e.message)
  }

  response.send(res)
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const body = req.body as LoginDTO
  let response: InstanceType<typeof ApiResponse>

  try {
    const user = await authService.login(body)
    const jwt = authService.generateJwt({ id: user.id })
    response = new ApiResponse(200, 'User logged in', { jwt, user })
  } catch (e) {
    response = new ApiResponse(400, e.message)
  }

  response.send(res)
}
