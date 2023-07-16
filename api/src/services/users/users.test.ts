import exp from 'constants'

import type { User } from '@prisma/client'

import { users, user, createUser, updateUser, deleteUser } from './users'
import type { StandardScenario } from './users.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('users', () => {
  scenario('returns all users', async (scenario: StandardScenario) => {
    const result = await users()

    expect(result.length).toEqual(Object.keys(scenario.user).length)
  })

  scenario('returns a single user', async (scenario: StandardScenario) => {
    const result = await user({ id: scenario.user.one.id })

    expect(result).toEqual(scenario.user.one)
  })

  scenario('creates a user', async () => {
    const newUser = {
      email: 'createduser@email.com',
      name: 'String',
      hashedPassword: 'String',
      salt: 'String',
    }

    const result = await createUser({
      input: {
        ...newUser,
      },
    })

    expect(result.email).toEqual(newUser.email)
    expect(result.name).toEqual(newUser.name)
    expect(result.hashedPassword).toEqual(newUser.hashedPassword)
    expect(result.salt).toEqual(newUser.salt)
  })

  scenario('validate email on create', async () => {
    const userWithInvalidEmail = {
      email: 'invalidemail',
      name: 'String',
      hashedPassword: 'String',
      salt: 'String',
    }

    expect(async () => {
      await createUser({
        input: {
          ...userWithInvalidEmail,
        },
      })
    }).rejects.toThrow()
  })

  scenario('validate name on create', async () => {
    const userWithInvalidName = {
      email: 'valid@email.com',
      name: '123',
      hashedPassword: 'String',
      salt: 'String',
    }

    expect(async () => {
      await createUser({
        input: {
          ...userWithInvalidName,
        },
      })
    }).rejects.toThrow()
  })

  scenario('updates a user', async (scenario: StandardScenario) => {
    const original = (await user({ id: scenario.user.one.id })) as User
    const result = await updateUser({
      id: original.id,
      input: { email: 'updatedemail@email.com' },
    })

    expect(result.email).toEqual('updatedemail@email.com')
  })

  scenario('deletes a user', async (scenario: StandardScenario) => {
    const original = (await deleteUser({ id: scenario.user.one.id })) as User
    const result = await user({ id: original.id })

    expect(result).toEqual(null)
  })
})
