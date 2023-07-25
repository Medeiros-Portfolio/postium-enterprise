import CryptoJS from 'crypto-js'
import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { validate } from '@redwoodjs/api'
import { hashPassword } from '@redwoodjs/auth-dbauth-api'

import { db } from 'src/lib/db'

import { sendEmail } from '../../lib/email'
import { renderEmail } from '../../lib/renderEmail'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const updateUserAvatar: MutationResolvers['updateUserAvatar'] = ({
  id,
  avatar,
}) => {
  return db.user.update({
    data: { avatar },
    where: { id },
  })
}

export const updateUserEmail: MutationResolvers['updateUserEmail'] = ({
  id,
  email,
}) => {
  validate(email, 'email', { presence: true, email: true })

  return db.user.update({
    data: { email },
    where: { id },
  })
}

export const updateUserName: MutationResolvers['updateUserName'] = ({
  id,
  name,
}) => {
  validate(name, 'name', {
    presence: true,
    length: {
      min: 2,
      max: 30,
    },
    format: {
      pattern: /[a-zA-Z]+/,
    },
  })

  return db.user.update({
    data: { name },
    where: { id },
  })
}

export const updateRole: MutationResolvers['updateRole'] = ({ id, role }) => {
  validate(role, 'role', {
    presence: true,
    inclusion: ['admin', 'writer', 'reader'],
  })

  return db.user.update({
    data: { roles: { push: role } },
    where: { id },
  })
}

export const User: UserRelationResolvers = {
  posts: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).posts()
  },
}

export const generateLoginToken: MutationResolvers['generateLoginToken'] =
  async ({ email }) => {
    const lookupUser = await db.user.findUnique({ where: { email } })
    if (!lookupUser) {
      return { message: 'Login request received' }
    }

    const randomNumber = generateSixDigitToken()

    const [loginToken, salt] = hashPassword(randomNumber)

    const loginTokenExpiresAt = new Date()
    loginTokenExpiresAt.setMinutes(loginTokenExpiresAt.getMinutes() + 30)

    const data = {
      loginToken,
      loginTokenExpiresAt,
      salt,
    }

    await db.user.update({
      where: {
        id: lookupUser.id,
      },
      data,
    })

    await sendEmail({
      to: email,
      subject: 'Postium - Login Token',
      text: `Your login token is ${randomNumber}`,
      html: renderEmail(randomNumber, email),
    })

    return { message: 'Login request received' }
  }

function generateSixDigitToken(): string {
  const random = CryptoJS.lib.WordArray.random(6)
  const randomString = random.toString()
  let sixDigitNumber = randomString.replace(/\D/g, '')
  if (sixDigitNumber.length < 6) {
    sixDigitNumber = sixDigitNumber.padStart(6, '0')
  }
  if (sixDigitNumber.length > 6) {
    sixDigitNumber = sixDigitNumber.slice(0, 6)
  }
  return sixDigitNumber.toString()
}
