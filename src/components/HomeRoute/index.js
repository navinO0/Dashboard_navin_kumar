import {Redirect, Link} from 'react-router-dom'

import {ButtonComp} from '../../StyledComponents'

import './index.css'
import StoreDataContext from '../../StoreDataContext'

const HomeRoute = () => (
  <StoreDataContext.Consumer>
    {value => {
      const {currentUser} = value
      if (currentUser.status === 'OFFLINE') {
        return <Redirect to="/login" />
      }

      return (
        <div className="home-route-main-container">
          <h1 className="home-route-main-heading">Welcome to Dashboard</h1>
          <div>
            <Link to="/login" className="link-item">
              <ButtonComp type="button">Login</ButtonComp>
            </Link>
          </div>
        </div>
      )
    }}
  </StoreDataContext.Consumer>
)

export default HomeRoute
