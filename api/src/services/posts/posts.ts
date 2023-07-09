import type {
  QueryResolvers,
  MutationResolvers,
  PostRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

import { isAuthenticated } from '../../lib/auth'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore-next-line
export const posts: QueryResolvers['posts'] = async () => {
  return db.post
    .findMany({
      include: {
        User: true,
      },
    })
    .then((posts) => {
      return posts.map((post) => {
        return {
          id: post.id,
          public: post.public,
          title: post.title,
          body: post.body.slice(0, 100) + '...',
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          User: {
            name: post.User.name,
          },
        }
      })
    })
}

export const post: QueryResolvers['post'] = ({ id }) => {
  return db.post
    .findUnique({
      where: { id },
    })
    .then((post) => {
      if (!post.public && !isAuthenticated()) {
        return
      } else {
        return post
      }
    })
}

export const createPost: MutationResolvers['createPost'] = ({ input }) => {
  return db.post.create({
    data: {
      ...input,
      userId: context.currentUser.id,
    },
  })
}

export const updatePost: MutationResolvers['updatePost'] = ({ id, input }) => {
  return db.post.update({
    data: input,
    where: { id },
  })
}

export const deletePost: MutationResolvers['deletePost'] = ({ id }) => {
  return db.post.delete({
    where: { id },
  })
}

export const Post: PostRelationResolvers = {
  comments: (_obj, { root }) => {
    return db.post.findUnique({ where: { id: root?.id } }).comments()
  },
  User: (_obj, { root }) => {
    return db.post.findUnique({ where: { id: root?.id } }).User()
  },
}
