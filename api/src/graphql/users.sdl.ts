export const schema = gql`
  type User {
    id: String!
    email: String!
    name: String!
    avatar: String!
    posts: [Post]!
    loginToken: String!
    loginTokenExpiresAt: DateTime
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
    loginToken: String!
    loginTokenExpiresAt: DateTime
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: [String]!
  }

  input UpdateUserInput {
    email: String
    name: String
    avatar: String
    loginToken: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: [String]!
  }

  type UserTokenResponse {
    message: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    updateUserName(id: String!, name: String!): User! @requireAuth
    updateUserAvatar(id: String!, avatar: String!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth(roles: ["admin"])
    updateRole(id: String!, role: String!): User! @requireAuth(roles: ["admin"])
    generateLoginToken(email: String!): UserTokenResponse! @skipAuth
  }
`
