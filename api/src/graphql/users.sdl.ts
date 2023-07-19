export const schema = gql`
  type User {
    id: String!
    email: String!
    name: String!
    avatar: String!
    posts: [Post]!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: [String]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    name: String!
    avatar: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: [String]!
  }

  input UpdateUserInput {
    email: String
    name: String
    avatar: String
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: [String]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    updateUserEmail(id: String!, email: String!): User! @requireAuth
    updateUserName(id: String!, name: String!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
  }
`
