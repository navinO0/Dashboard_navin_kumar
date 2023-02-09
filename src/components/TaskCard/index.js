import {useState} from 'react'

import './index.css'
import StoreDataContext from '../../StoreDataContext'
import {
  TeamMemberComp,
  ButtonComp,
  DetailsComp,
  LogButton,
  PriorityComp,
} from '../../StyledComponents/index'

const statusParameters = [
  {
    id: 'IN_PROGRESS',
    displayText: 'IN PROGRESS',
  },
  {
    id: 'NOT_COMPLETED',
    displayText: 'NOT COMPLETED',
  },
  {
    id: 'COMPLETED',
    displayText: 'COMPLETED',
  },
]

const TaskCard = props => {
  const {each} = props
  const {id, task, team, priority, deadLine, status} = each
  const [updatePriority, setUpdatePriority] = useState(status)
  const [displayOptions, setDisplayOptions] = useState(false)

  const onClickUpdateBtn = () => {
    setDisplayOptions(true)
  }
  const options = {
    month: 'long',
    day: 'numeric',
  }

  const dateTime = new Date(deadLine)
  const formattedDateTime = dateTime.toLocaleDateString('en-US', options)
  const getTime = `${dateTime.getUTCHours()}:${dateTime.getUTCMinutes()}`
  const displayDeadline = `${formattedDateTime} (${getTime})`

  return (
    <StoreDataContext.Consumer>
      {value => {
        const {colors, updateTasksListFn, tasksListDt} = value
        const onDeleteBtn = () => {
          const deletedList = tasksListDt.filter(eachItem => eachItem.id !== id)
          updateTasksListFn(deletedList)
        }

        return (
          <div className="task-main-container">
            <div className="priority-status">
              <div>
                <DetailsComp>
                  Priority:{' '}
                  <PriorityComp priority={priority}>{priority}</PriorityComp>
                </DetailsComp>
              </div>
              <div className="update-btn-container">
                {!displayOptions ? (
                  <div className="update-delete-btn">
                    <ButtonComp
                      type="button"
                      onClick={onClickUpdateBtn}
                      className="update-task-btn"
                    >
                      Update Status
                    </ButtonComp>
                    <LogButton
                      onStatus="ONLINE"
                      type="button"
                      onClick={onDeleteBtn}
                      className="delete-btn"
                    >
                      Delete
                    </LogButton>
                  </div>
                ) : (
                  <div className="update-status-options">
                    <ul className="update-status-ul-container">
                      {statusParameters.map(eachOne => {
                        const onClickupdationStatus = event => {
                          setUpdatePriority(eachOne.id)
                          const updatedList = tasksListDt.map(eachTask => {
                            if (eachTask.id === id) {
                              return {...eachTask, status: event.target.value}
                            }
                            return eachTask
                          })
                          setDisplayOptions(false)
                          updateTasksListFn(updatedList)
                        }
                        return (
                          <li key={eachOne.id} className="update-opt-li-item">
                            <input
                              type="radio"
                              id={eachOne.id}
                              value={eachOne.displayText}
                              checked={updatePriority === eachOne.id}
                              onChange={onClickupdationStatus}
                            />
                            <label className="label-opt" htmlFor={eachOne.id}>
                              {eachOne.displayText}
                            </label>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="task-status">
              <div className="task-card-content-task-container">
                <p className="task-card-content-task">{task}</p>
              </div>
            </div>
            <div className="task-status-container">
              <ul className="display-team">
                {team.map(eachOne => {
                  const randIndex = Math.ceil(Math.random() * colors.length - 1)
                  const randomBackground = colors[randIndex]

                  return (
                    <li key={eachOne.id} className="team-list">
                      <TeamMemberComp bgColor={randomBackground}>
                        {eachOne.username.slice(0, 1)}
                      </TeamMemberComp>
                    </li>
                  )
                })}
              </ul>
              <div className="deadline-priority-container">
                <DetailsComp>{status}</DetailsComp>
                <DetailsComp>
                  Dead Line: <span>{displayDeadline}</span>
                </DetailsComp>
              </div>
            </div>
          </div>
        )
      }}
    </StoreDataContext.Consumer>
  )
}

export default TaskCard
