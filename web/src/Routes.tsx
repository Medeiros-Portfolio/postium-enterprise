// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'
import MainLayout from './layouts/MainLayout/MainLayout'
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage'
import LoginPage from './pages/LoginPage/LoginPage'
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage'
import SignupPage from './pages/SignupPage/SignupPage'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={MainLayout}>
        <Route path="/articles/{id:Int}" page={ArticlePage} name="article" />
        <Route path="/articles" page={ArticlesPage} name="articles" />
        <Route path="/home" page={HomePage} name="home" />
        <Route path="/contact" page={ContactPage} name="contact" />
        <Route path="/about" page={AboutPage} name="about" />
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
        <Private unauthenticated="login" roles={['admin', 'writer']}>
          <Set wrap={ScaffoldLayout} title="Posts" titleTo="posts" buttonLabel="New Post" buttonTo="newPost">
            <Route path="/posts/new" page={PostNewPostPage} name="newPost" />
            <Route path="/posts/{id:Int}/edit" page={PostEditPostPage} name="editPost" />
            <Route path="/posts/{id:Int}" page={PostPostPage} name="post" />
            <Route path="/posts" page={PostPostsPage} name="posts" />
          </Set>
        </Private>
        <Private unauthenticated="login" roles={'admin'}>
          <Route path="/users" page={UsersPage} name="users" />
        </Private>
        <Private unauthenticated="login">
          <Route path="/profile" page={ProfilePage} name="profile" />
        </Private>
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
