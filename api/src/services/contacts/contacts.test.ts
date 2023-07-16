import type { Contact } from '@prisma/client'

import { contacts, contact, createContact } from './contacts'
import type { StandardScenario } from './contacts.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('contacts', () => {
  scenario('returns all contacts', async (scenario: StandardScenario) => {
    const result = await contacts()

    expect(result.length).toEqual(Object.keys(scenario.contact).length)
  })

  scenario('returns a single contact', async (scenario: StandardScenario) => {
    const result = await contact({ id: scenario.contact.one.id })

    expect(result).toEqual(scenario.contact.one)
  })

  scenario('creates a contact', async () => {
    const result = await createContact({
      input: {
        name: 'String',
        email: 'email@email.com',
        message: 'String',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.email).toEqual('email@email.com')
    expect(result.message).toEqual('String')
  })

  scenario('validate email on create', async () => {
    const contactWithInvalidEmail = {
      name: 'String',
      email: 'invalidemail',
      message: 'String',
    }

    expect(async () => {
      await createContact({
        input: {
          ...contactWithInvalidEmail,
        },
      })
    }).rejects.toThrow()
  })

  scenario('validate message on create', async () => {
    const contactWithInvalidMessage = {
      name: 'String',
      email: 'valid@email.com',
    }

    expect(async () => {
      await createContact({
        input: {
          ...contactWithInvalidMessage,
        },
      })
    }).rejects.toThrow()
  })

  scenario('validate name on create', async () => {
    const contactWithInvalidName = {
      name: '',
      email: 'valid@email.com',
      message: 'String',
    }

    expect(async () => {
      await createContact({
        input: {
          ...contactWithInvalidName,
        },
      })
    }).rejects.toThrow()
  })
})
