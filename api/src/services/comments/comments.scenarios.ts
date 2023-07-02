import type { Prisma, Comment } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CommentCreateArgs>({
  comment: {
    one: {
      data: {
        name: 'String',
        message: 'String',
        post: {
          create: {
            title: 'String',
            body: 'String',
            updatedAt: '2023-07-02T17:55:12.505Z',
          },
        },
      },
    },
    two: {
      data: {
        name: 'String',
        message: 'String',
        post: {
          create: {
            title: 'String',
            body: 'String',
            updatedAt: '2023-07-02T17:55:12.505Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Comment, 'comment'>
