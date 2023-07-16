import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { validate } from '@redwoodjs/api'

import { db } from 'src/lib/db'

export const contacts: QueryResolvers['contacts'] = () => {
  return db.contact.findMany()
}

export const contact: QueryResolvers['contact'] = ({ id }) => {
  return db.contact.findUnique({
    where: { id },
  })
}

export const createContact: MutationResolvers['createContact'] = ({
  input,
}) => {
  validate(input.email, 'email', { presence: true, email: true })
  validate(input.name, 'name', {
    presence: true,
    length: {
      minimum: 2,
    },
    format: {
      pattern: /[a-zA-Z]+/,
    },
  })
  validate(input.message, 'message', {
    presence: true,
    length: {
      minimum: 2,
    },
  })

  return db.contact.create({
    data: input,
  })
}
