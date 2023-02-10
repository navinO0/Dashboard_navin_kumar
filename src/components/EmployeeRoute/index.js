import ProfileCard from '../ProfileCard'
import AddTaskComponent from '../AddTaskComponent'
import './index.css'
import StoreDataContext from '../../StoreDataContext'
import TaskCard from '../TaskCard'

const EmployeeRoute = props => {
  const {match} = props
  const {params} = match
  const {id} = params

  return (
    <StoreDataContext.Consumer>
      {value => {
        const {tasksListDt, currentUser} = value
        return (
          <div className="employee-route">
            <ProfileCard id={id} />
            <AddTaskComponent />
            <ul className="tasks-ul-list-container">
              {tasksListDt.map(each => {
                if (each.companyName === currentUser.companyName) {
                  return <TaskCard key={each.id} each={each} />
                }
                return ''
              })}
            </ul>
          </div>
        )
      }}
    </StoreDataContext.Consumer>
  )
}
export default EmployeeRoute
