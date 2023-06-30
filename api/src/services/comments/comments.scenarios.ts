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
            updatedAt: '2023-06-30T01:32:14.713Z',
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
            updatedAt: '2023-06-30T01:32:14.713Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Comment, 'comment'>
