export const schema = gql`
  type Comment {
    id: Int!
    post: Post!
    postId: Int!
    name: String!
    message: String!
    createdAt: DateTime!
  }

  type Query {
    comments(postId: Int): [Comment!]! @skipAuth
  }

  input CreateCommentInput {
    postId: Int!
    name: String!
    message: String!
  }

  input UpdateCommentInput {
    postId: Int
    name: String
    message: String
  }
`
