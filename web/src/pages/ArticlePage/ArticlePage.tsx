import { MetaTags } from '@redwoodjs/web'

import ArticleCell from 'src/components/ArticleCell'
import CommentsCell from 'src/components/CommentsCell'

type ArticlePageProps = {
  id: number
}

const ArticlePage = ({ id }: ArticlePageProps) => {
  return (
    <>
      <MetaTags title="Article" description="Article page" />
      <ArticleCell id={id} />
      <CommentsCell postId={id} />
    </>
  )
}

export default ArticlePage
