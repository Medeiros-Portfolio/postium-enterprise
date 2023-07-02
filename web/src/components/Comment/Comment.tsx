type CommentProps = {
  id: number
  name: string
  message: string
  createdAt: string
}

const Comment = (comment: CommentProps) => {
  return (
    <div className="container mx-auto flex w-full max-w-lg flex-col divide-y divide-gray-700 rounded-md p-6 dark:bg-gray-900 dark:text-gray-100">
      <div className="flex justify-between p-4">
        <div className="flex space-x-4">
          <div>
            <img
              src="https://source.unsplash.com/100x100/?portrait"
              alt=""
              className="h-12 w-12 rounded-full object-cover dark:bg-gray-500"
            />
          </div>
          <div>
            <h4 className="font-bold">{comment.name.split('@')[0]}</h4>
            <span className="text-xs dark:text-gray-400">
              {comment.createdAt}
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-2 p-4 text-sm dark:text-gray-400">
        <p>{comment.message}</p>
      </div>
    </div>
  )
}

export default Comment
