import {
  FieldError,
  Form,
  FormError,
  Submit,
  TextAreaField,
  useForm,
} from '@redwoodjs/forms'
import { routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import {
  Toaster,
  toast,
  resolveValue,
  ToastBar,
} from '@redwoodjs/web/dist/toast'

import {
  CreateCommentMutation,
  CreateCommentMutationVariables,
} from '../../../types/graphql'
import { useAuth } from '../../auth'
import { QUERY as CommentsQuery } from '../CommentsCell'

const CREATE_COMMENT = gql`
  mutation CreateCommentMutation($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
    }
  }
`

interface CommentFormValues {
  commentInput: string
}

const CommentForm = ({ postId }) => {
  const { isAuthenticated, currentUser } = useAuth()

  const formMethods = useForm()

  const [create, { loading, error }] = useMutation<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >(CREATE_COMMENT, {
    onCompleted: () => {
      toast.success('Thank you for your comment!')
      formMethods.reset()
    },
    refetchQueries: [{ query: CommentsQuery, variables: { postId } }],
  })

  const onSubmit = (data: CommentFormValues) => {
    create({
      variables: {
        input: {
          name: currentUser?.email,
          message: data.commentInput,
          postId,
        },
      },
    })
  }

  return (
    <>
      {isAuthenticated ? (
        <div className="lg:px12 mx-auto flex max-w-xl flex-col rounded-xl px-8 py-3 shadow-sm dark:bg-gray-900 dark:text-gray-100 lg:py-3">
          <h3 className="pb-1 text-left text-2xl font-semibold">
            Leave your comment:
          </h3>
          <div className="flex w-full flex-col items-center">
            <Toaster>
              {(t) => (
                <ToastBar toast={t}>
                  {({ icon, message }) => (
                    <>
                      <div className="flex flex-1 flex-col border-l-8 p-4 dark:border-violet-400">
                        <span className="text-2xl">Success</span>
                        <span className="text-xs dark:text-gray-400">
                          {resolveValue(message, t)}
                        </span>
                      </div>
                      <button
                        onClick={() => toast.dismiss(t.id)}
                        className="tracki flex items-center px-4 text-xs uppercase dark:border-gray-700 dark:text-gray-400"
                      >
                        Dismiss
                      </button>
                    </>
                  )}
                </ToastBar>
              )}
            </Toaster>
            <Form
              onSubmit={onSubmit}
              className="flex w-full flex-col"
              formMethods={formMethods}
            >
              <FormError
                error={error}
                titleStyle={{ opacity: 0 }}
                listItemClassName="text-red-600 dark:text-red-400"
              />
              <TextAreaField
                name="commentInput"
                className="resize-none rounded-md p-4 dark:bg-gray-900 dark:text-gray-100"
                placeholder="I think that..."
                validation={{
                  required: true,
                }}
              />
              <FieldError name="commentInput" className="text-red-600" />
              <Submit
                disabled={loading}
                className=" my-3 max-w-xs rounded-md py-4 font-semibold dark:bg-violet-400 dark:text-gray-900"
              >
                Submit
              </Submit>
            </Form>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex max-w-xl flex-col rounded-xl p-8 shadow-sm dark:bg-gray-900 dark:text-gray-100 lg:p-12">
          <div className="flex w-full flex-col items-center">
            <h3 className="text-center text-3xl font-semibold">Comment</h3>
            <p className="text-center text-sm text-gray-500">
              Please{' '}
              <a href={routes.login()} className="text-violet-400">
                login
              </a>{' '}
              to comment.
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default CommentForm
