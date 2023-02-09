import ProfileCard from '../ProfileCard'
import AddTaskComponent from '../AddTaskComponent'
import './index.css'
import StoreDataContext from '../../StoreDataContext'
import TaskCard from '../TaskCard'

const EmployeeRoute = props => {
  const {match} = props
  const {params} = match
  const {id} = params

  console.log(props)

  return (
    <StoreDataContext.Consumer>
      {value => {
        const {tasksListDt} = value
        return (
          <div className="employee-route">
            <ProfileCard id={id} />
            <AddTaskComponent />
            <ul className="tasks-ul-list-container">
              {tasksListDt.map(each => (
                <TaskCard key={each.id} each={each} />
              ))}
            </ul>
          </div>
        )
      }}
    </StoreDataContext.Consumer>
  )
}
export default EmployeeRoute
