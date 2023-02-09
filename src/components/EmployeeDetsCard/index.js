import {Link} from 'react-router-dom'
import './index.css'

import {OnlineStatus, TeamMemberComp} from '../../StyledComponents'
import StoreDataContext from '../../StoreDataContext'

const EmployeeDetsCard = props => {
  const {eachOne} = props
  const {
    id,

    username,

    status,
  } = eachOne
  return (
    <StoreDataContext.Consumer>
      {value => {
        const {colors} = value
        const randIndex = Math.ceil(Math.random() * colors.length - 1)
        const randomBackground = colors[randIndex]
        return (
          <Link to={`/employee/${id}`}>
            <li key={id}>
              <div className="employee-dets-card">
                <div className="username-initial-container">
                  <TeamMemberComp bgColor={randomBackground}>
                    {eachOne.username.slice(0, 1)}
                  </TeamMemberComp>
                  <p>{username}</p>
                </div>

                <OnlineStatus onStatus={status}>{status}</OnlineStatus>
              </div>
            </li>
          </Link>
        )
      }}
    </StoreDataContext.Consumer>
  )
}

export default EmployeeDetsCard
