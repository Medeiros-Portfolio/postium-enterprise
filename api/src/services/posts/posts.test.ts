import { createPost, post, posts } from './posts'
import { StandardScenario } from './posts.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('posts', () => {
  scenario(
    'standard',
    'returns all posts',
    async (scenario: StandardScenario) => {
      const result = await posts()

      expect(result.length).toEqual(Object.keys(scenario.post).length)
    }
  )

  scenario(
    'standard',
    'returns a single post',
    async (scenario: StandardScenario) => {
      const result = await post({ id: scenario.post.first.id })

      expect(result).toEqual(scenario.post.first)
    }
  )

  scenario('standard', 'creates a post', async (scenario: StandardScenario) => {
    mockCurrentUser({
      id: scenario.post.first.userId,
      roles: ['admin'],
      email: 'test@email.com',
    })

    const result = await createPost({
      input: {
        title: 'String',
        body: 'String',
        public: true,
      },
    })

    expect(result.title).toEqual('String')
    expect(result.body).toEqual('String')
    expect(result.public).toEqual(true)
    expect(result.userId).toEqual(scenario.post.first.userId)
  })
})
