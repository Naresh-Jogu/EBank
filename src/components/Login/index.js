import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

const Login = props => {
  const {history} = props
  const [userId, setUserId] = useState('')
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  const handleLogin = async event => {
    event.preventDefault()

    setLoading(true)

    const userDetails = {
      user_id: userId,
      pin,
    }

    const url = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok) {
      console.log(data)
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      history.replace('/ebank')
    } else {
      setError(data.error_msg)
    }

    setLoading(false)
  }

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <img
          className="login-image"
          src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
          alt="website login"
        />

        <form className="login-card" onSubmit={handleLogin}>
          <h1 className="login-title">Welcome Back</h1>

          <div className="input-group">
            <label className="input-label" htmlFor="userId">
              User ID
            </label>
            <input
              className="input-field"
              id="userId"
              type="text"
              placeholder="Enter User id"
              value={userId}
              onChange={e => setUserId(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="pin">
              PIN
            </label>
            <input
              className="input-field"
              id="pin"
              type="text"
              placeholder="Enter PIN"
              value={pin}
              onChange={e => setPin(e.target.value)}
            />
          </div>

          <button className="login-button" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className="error-msg-card">
            {error && <p className="error-msg">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
