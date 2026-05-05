import * as React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'
import fireJenkins from '../assets/fire-jenkins.svg'

const NotFoundPage = () => {
  const title = 'Page not found'

  return (
    <main className="notfound-page">
      <title>{title}</title>
      <img src={fireJenkins} alt="Jenkins icon" className="notfound-image" />
      <h1 className="notfound-heading">Page not found</h1>
      <p className="notfound-text">
        Sorry{' '}
        <span role="img" aria-label="Pensive emoji">
          😔
        </span>{' '}
        we couldn’t find what you were looking for.
      </p>
      <p className="notfound-action">
        <Link to="/" className="notfound-link">
          Go home
        </Link>
      </p>
    </main>
  )
}

export default NotFoundPage
