import {
  createTransformerDirective,
  TransformerDirectiveFunc,
} from '@redwoodjs/graphql-server'

export const schema = gql`
  directive @showIfPublic on FIELD_DEFINITION
`

const transform: TransformerDirectiveFunc = ({
  resolvedValue,
  context,
  root,
}) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  if (root.public) return resolvedValue

  if (context.currentUser) {
    return resolvedValue
  } else {
    return resolvedValue.slice(0, 150) + '...'
  }
}

const showIfPublicDirective = createTransformerDirective(schema, transform)

export default showIfPublicDirective
