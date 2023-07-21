import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { validate } from '@redwoodjs/api'

import { db } from 'src/lib/db'

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
