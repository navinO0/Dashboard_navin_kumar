import ProfileCard from '../ProfileCard'
import AddTaskComponent from '../AddTaskComponent'
import './index.css'
import StoreDataContext from '../../StoreDataContext'
import TaskCard from '../TaskCard'

const EmployeeRoute = props => {
  const {match} = props
  const {params} = match
  const {id} = params
  const getDets = localStorage.getItem('storeLocalStorage')
  const parsedData = JSON.parse(getDets)
  const {userDataList} = parsedData
  const filteredUserData = userDataList.filter(eachUser => id === eachUser.id)

  return (
    <StoreDataContext.Consumer>
      {value => {
        const {tasksListDt, currentUser} = value
        let user = currentUser

        if (filteredUserData.length !== 0) {
          const indexedUsr = filteredUserData[0]
          user = indexedUsr
        }

        return (
          <div className="employee-route">
            <ProfileCard id={id} />
            <AddTaskComponent />
            <ul className="tasks-ul-list-container">
              {tasksListDt.map(each => {
                if (each.companyName === currentUser.companyName) {
                  const userObj = each.team.find(
                    eachMem => user.username === eachMem.username,
                  )
                  if (userObj !== undefined) {
                    return <TaskCard key={each.id} each={each} />
                  }
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
