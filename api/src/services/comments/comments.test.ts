import { comments, createComment } from './comments'
import type { StandardScenario } from './comments.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('comments', () => {
  scenario('returns all comments', async (scenario: StandardScenario) => {
    const result = await comments({ postId: scenario.comment.one.postId })

    expect(result.length).toEqual(1)
  })

  scenario('creates a comment', async (scenario: StandardScenario) => {
    const result = await createComment({
      input: {
        postId: scenario.comment.two.postId,
        name: 'String',
        message: 'String',
      },
    })

    expect(result.postId).toEqual(scenario.comment.two.postId)
    expect(result.name).toEqual('String')
    expect(result.message).toEqual('String')
  })
})
