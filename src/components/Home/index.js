import Header from '../Header'
import './index.css'

const Home = () => {
  return (
    <div className="home-container">
      <Header />

      <div className="home-content">
        <h1 className="home-heading">Your Flexibility, Our Excellence</h1>

        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="home-image"
        />
      </div>
    </div>
  )
}

export default Home
