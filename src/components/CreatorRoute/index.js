import ProfileCard from '../ProfileCard'
import EmployesCard from '../EmployesCard'

import './index.css'
import AddTaskComponent from '../AddTaskComponent'
import StoreDataContext from '../../StoreDataContext'
import TaskCard from '../TaskCard'

const CreatorRoute = () => (
  <StoreDataContext.Consumer>
    {value => {
      const {tasksListDt, currentUser} = value
      return (
        <div className="creator-main-container">
          <div className="employee-card-creator-container-lg">
            <EmployesCard />
          </div>
          <div className="creator-profile-card">
            <ProfileCard />
            <AddTaskComponent />
            <ul className="tasks-ul-list-container-creator">
              {tasksListDt.map(each => {
                if (each.companyName === currentUser.companyName) {
                  return <TaskCard key={each.id} each={each} />
                }
                return ''
              })}
            </ul>
          </div>
        </div>
      )
    }}
  </StoreDataContext.Consumer>
)

export default CreatorRoute
