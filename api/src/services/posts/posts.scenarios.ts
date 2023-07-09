import { Prisma } from '@prisma/client'

import { ScenarioData } from '@redwoodjs/testing/api'

import { Post } from '../../../types/graphql'

export const standard = defineScenario<Prisma.PostCreateArgs>({
  post: {
    first: {
      data: {
        title: 'String',
        body: 'String',
        public: true,
        User: {
          create: {
            name: 'String1',
            email: 'String1',
            roles: ['admin'],
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    second: {
      data: {
        title: 'String',
        body: 'String',
        public: true,
        User: {
          create: {
            name: 'String2',
            email: 'String2',
            roles: ['admin'],
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Post, 'post'>
