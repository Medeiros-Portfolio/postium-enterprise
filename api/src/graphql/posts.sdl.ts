export const schema = gql`
  type Post {
    id: Int!
    public: Boolean!
    title: String!
    body: String! @showIfPublic
    comments: [Comment]!
    createdAt: DateTime!
    updatedAt: DateTime!
    User: User
    userId: String
  }

  type Query {
    posts: [Post!]! @skipAuth
    post(id: Int!): Post @skipAuth
  }

  input CreatePostInput {
    public: Boolean!
    title: String!
    body: String!
    userId: String
  }

  input UpdatePostInput {
    public: Boolean
    title: String
    body: String
    userId: String
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post! @requireAuth
    updatePost(id: Int!, input: UpdatePostInput!): Post! @requireAuth
    deletePost(id: Int!): Post! @requireAuth
  }
`
