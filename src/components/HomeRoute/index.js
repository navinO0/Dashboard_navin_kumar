import {Redirect} from 'react-router-dom'

import {ButtonComp} from '../../StyledComponents'

import './index.css'
import StoreDataContext from '../../StoreDataContext'

const HomeRoute = props => (
  <StoreDataContext.Consumer>
    {value => {
      const {history} = props
      const {currentUser, setWhoIsFn} = value
      const onClickCreator = () => {
        setWhoIsFn('CREATOR')
        history.replace('/login')
      }
      const onClickEmployee = () => {
        setWhoIsFn('EMPLOYEE')
        history.replace('/login')
      }
      if (currentUser.status === 'OFFLINE') {
        return <Redirect to="/login" />
      }

      return (
        <div className="home-route-main-container">
          <h1 className="home-route-main-heading">Welcome to Dashboard</h1>
          <div>
            <ButtonComp type="button" onClick={onClickCreator}>
              Creator
            </ButtonComp>
            <ButtonComp type="button" onClick={onClickEmployee}>
              Employee
            </ButtonComp>
          </div>
        </div>
      )
    }}
  </StoreDataContext.Consumer>
)

export default HomeRoute
