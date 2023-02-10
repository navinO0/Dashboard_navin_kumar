import StoredDataContext from '../../StoreDataContext'
import {OnlineStatus, LogButton} from '../../StyledComponents'

import './index.css'

const ProfileCard = props => {
  const {id} = props
  let currentUserProfile
  const getDets = localStorage.getItem('storeLocalStorage')
  const parsedData = JSON.parse(getDets)
  const {userDataList} = parsedData
  const filteredUserData = userDataList.filter(eachUser => id === eachUser.id)

  return (
    <StoredDataContext.Consumer>
      {value => {
        const {
          currentUser,
          usersDataList,
          setUsersDataList,
          StoreTheDataInLocalStorageFn,
          setCurrentUser,
          updateLoginStatusFn,
        } = value
        if (filteredUserData.length !== 0) {
          const indexedCrrUser = filteredUserData[0]
          currentUserProfile = indexedCrrUser
        } else {
          currentUserProfile = currentUser
        }

        const {status, username, loginAs} = currentUserProfile
        const onClickLogutBtn = () => {
          let currUsrStatus = ''
          if (currentUser.status === 'OFFLINE') {
            currUsrStatus = 'ONLINE'
          } else {
            currUsrStatus = 'OFFLINE'
          }
          const updatedUsersList = usersDataList.map(eachOne => {
            let updated = eachOne
            if (currentUser.username === eachOne.username) {
              updated = {...eachOne, status: currUsrStatus}
            }
            return updated
          })
          updateLoginStatusFn(updatedUsersList)
          setCurrentUser({...currentUser, status: currUsrStatus})

          setUsersDataList(updatedUsersList)

          StoreTheDataInLocalStorageFn()
        }

        let initial = ''

        if (username !== undefined) {
          initial = username.slice(0, 1)
        }

        const renderLogBtn =
          currentUser.status === 'ONLINE' ? 'Log Out' : 'Log In'
        const onLineStatusD = status === 'ONLINE'

        return (
          <div>
            <div className="profile-card-container">
              <div className="details-candidate">
                <div className="employee-profile-container">
                  <p className="profile-candidate">{initial}</p>
                </div>
                <div className="candidate-full-name-job-role">
                  <p className="candidate-details">{username}</p>
                  <p className="candidate-details">{loginAs}</p>
                </div>
              </div>
              <div className="login-status">
                <OnlineStatus onStatus={onLineStatusD}>{status}</OnlineStatus>
                {filteredUserData.length === 0 && (
                  <LogButton
                    onStatus={onLineStatusD}
                    type="button"
                    className="logout-btn"
                    onClick={onClickLogutBtn}
                  >
                    {renderLogBtn}
                  </LogButton>
                )}
              </div>
            </div>
          </div>
        )
      }}
    </StoredDataContext.Consumer>
  )
}

export default ProfileCard
