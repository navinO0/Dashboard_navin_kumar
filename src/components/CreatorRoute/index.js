import ProfileCard from '../ProfileCard'
import EmployesCard from '../EmployesCard'

import './index.css'
import AddTaskComponent from '../AddTaskComponent'
import StoreDataContext from '../../StoreDataContext'
import TaskCard from '../TaskCard'

const CreatorRoute = () => {
  const varaible = 'sampleText'
  return (
    <StoreDataContext.Consumer>
      {value => {
        const {tasksListDt} = value
        return (
          <div className="creator-main-container">
            <div className="employee-card-creator-container">
              <EmployesCard />
            </div>
            <div className="creator-profile-card">
              <ProfileCard />
              <AddTaskComponent />
              <ul className="tasks-ul-list-container">
                {tasksListDt.map(each => (
                  <TaskCard key={each.id} each={each} />
                ))}
              </ul>
            </div>
          </div>
        )
      }}
    </StoreDataContext.Consumer>
  )
}

export default CreatorRoute
