import {useState} from 'react'

import {v4} from 'uuid'
import {TeamMemberComp, ButtonComp} from '../../StyledComponents'
import './index.css'
import StoreDataContext from '../../StoreDataContext'

const priorityOptions = [
  {
    optionId: 'HIGH',
    displayText: 'HIGH',
  },
  {
    optionId: 'MEDIUM',
    displayText: 'MEDIUM',
  },
  {
    optionId: 'LOW',
    displayText: 'LOW',
  },
]

const AddTaskComponent = () => {
  const [showOptions, setShowOptions] = useState(false)
  const [priority, setPriority] = useState(priorityOptions[0].displayText)
  const [taskInp, setTaskInp] = useState('')
  const [participantsInpEle, setParticipantsInpEle] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [teamInfo, setTeamInfo] = useState([])
  const [showParticipants, setShowParticipants] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onchangeInputElement = event => {
    setTaskInp(event.target.value)
    if (taskInp.length > 1) {
      setShowOptions(true)
    } else {
      setShowOptions(false)
    }
  }

  const onChangeDateTime = event => {
    setDateTime(event.target.value)
  }

  const onChangeInpParticipantInpEle = event => {
    setParticipantsInpEle(event.target.value)
    const atObj = participantsInpEle.split('').find(eachOne => eachOne === '@')
    if (atObj !== undefined) {
      setShowParticipants(true)
    } else {
      setShowParticipants(false)
    }
  }

  return (
    <StoreDataContext.Consumer>
      {value => {
        const {onAddTasksListFn, usersDataList, currentUser, colors} = value
        const onClickAddBtn = () => {
          const {companyName} = currentUser
          const id = v4()
          const task = taskInp

          const deadLine = dateTime
          const team = [...teamInfo, currentUser]
          const status = 'NOT_COMPLETED'
          const taskData = {
            id,
            priority,
            task,
            team,
            companyName,
            status,
            deadLine,
          }
          if (task === '') {
            setErrorMessage('Enter Task')
          } else if (deadLine === '') {
            setErrorMessage('Set Deadline for the task')
          } else {
            onAddTasksListFn(taskData)
            setPriority('')
            setTaskInp('')
            setParticipantsInpEle('')
            setDateTime('')
            setTeamInfo([])
            setErrorMessage('')
            setShowParticipants(false)
          }
        }

        const compFileter = usersDataList.filter(
          eachUeser => eachUeser.companyName === currentUser.companyName,
        )

        const filteredList = compFileter.filter(each =>
          each.username
            .toLowerCase()
            .includes(
              participantsInpEle
                .slice(1, participantsInpEle.length)
                .toLowerCase(),
            ),
        )

        return (
          <div className="add-task-container-main">
            <div className="main-content-Container">
              <div className="add-task-input-container">
                <input
                  type="text"
                  id="taskinput"
                  value={taskInp}
                  placeholder="Add Task..."
                  onChange={onchangeInputElement}
                  className="task-input-element"
                />
              </div>
              {showOptions && (
                <div className="options-container">
                  <div className="set-priority-container">
                    <div className="date-time-priority-input-flex">
                      <ul className="priority-options-ul-container">
                        {priorityOptions.map(each => {
                          const {optionId, displayText} = each
                          const onChangePriority = event => {
                            setPriority(event.target.value)
                          }
                          return (
                            <li key={optionId} className="priority-li-item">
                              <input
                                type="radio"
                                value={displayText}
                                onChange={onChangePriority}
                                id={optionId}
                                checked={priority === displayText}
                              />
                              <label
                                className="priority-label"
                                htmlFor={optionId}
                              >
                                {optionId}
                              </label>
                            </li>
                          )
                        })}
                      </ul>

                      <input
                        type="datetime-local"
                        onChange={onChangeDateTime}
                        className="date-time-picker"
                      />
                    </div>
                    <div className="add-participants">
                      <input
                        type="text"
                        id="taskinput"
                        value={participantsInpEle}
                        placeholder="Add Participants..."
                        onChange={onChangeInpParticipantInpEle}
                        className="task-input-element"
                      />
                    </div>
                  </div>
                  <div className="team-add-btn-container">
                    <ul className="display-team">
                      {teamInfo.map(eachOne => {
                        const randIndex = Math.ceil(
                          Math.random() * colors.length - 1,
                        )
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
                    <div className="btn-container">
                      <ButtonComp
                        type="button"
                        onClick={onClickAddBtn}
                        className="add-task-btn"
                      >
                        Add task
                      </ButtonComp>
                    </div>
                  </div>
                  <p className="error-msg">{errorMessage}</p>
                </div>
              )}
            </div>
            {showParticipants && (
              <div className="participants-list-main-container">
                <ul className="participants-ul-list-container">
                  {filteredList.map(eachOne => {
                    const {username, id} = eachOne
                    const participantObj = teamInfo.find(each => id === each.id)
                    const btnText =
                      participantObj !== undefined ? 'Remove' : 'Add'

                    const onClickAddParticipant = () => {
                      if (!participantObj) {
                        setTeamInfo([...teamInfo, eachOne])
                      } else {
                        const removeFrom = teamInfo.filter(
                          each => eachOne.id !== each.id,
                        )
                        setTeamInfo(removeFrom)
                      }
                    }

                    return (
                      <li
                        key={eachOne.id}
                        className="participants-li-item-container"
                      >
                        <p className="label">{username}</p>
                        <ButtonComp
                          type="button"
                          onClick={onClickAddParticipant}
                          className="add-participant-btn"
                        >
                          {btnText}
                        </ButtonComp>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>
        )
      }}
    </StoreDataContext.Consumer>
  )
}

export default AddTaskComponent
