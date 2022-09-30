import jsonwebtoken from 'jsonwebtoken'
import { BotMateService } from 'botmate/core'
import { LoginDTO, RegisterDTO } from 'botmate/common/interfaces/auth'
import { hash, compare } from 'botmate/common/hash'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { error } from '../logger'

class AuthService extends BotMateService {
  constructor() {
    super()
  }

  generateJwt<T extends {}>(data: T) {
    return jsonwebtoken.sign(data, 'botmate', {
      expiresIn: '1d',
    })
  }

  validateJwt(token: string) {
    return jsonwebtoken.verify(token, 'botmate')
  }

  async register(data: RegisterDTO) {
    try {
      const hashedPassword = await hash(data.password)
      const user = await this.db.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
        },
      })
      return user
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new Error('User with this email already exists')
        }
      }

      error(e.message)
      throw new Error('An error occurred')
    }
  }

  async login(data: LoginDTO) {
    try {
      const user = await this.db.user.findUnique({
        where: {
          email: data.email,
        },
      })
      if (!user) {
        throw new Error('User not found')
      }

      const isPasswordValid = await compare(data.password, user.password)
      if (!isPasswordValid) {
        throw new Error('Invalid password')
      }

      return user
    } catch (e) {
      error(e.message)
      throw new Error('An error occurred')
    }
  }
}

export { AuthService }
