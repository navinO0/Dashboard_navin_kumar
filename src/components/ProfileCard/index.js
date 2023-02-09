import {useEffect, useState} from 'react'

import StoredDataContext from '../../StoreDataContext'
import {OnlineStatus, LogButton} from '../../StyledComponents'

import './index.css'

const ProfileCard = props => {
  const {id} = props
  const [profileDts, setProfileDts] = useState({})
  let currentUserProfile
  useEffect(() => {
    const getProfileDets = () => {
      const getDets = localStorage.getItem('storeLocalStorage')
      const parsedData = JSON.parse(getDets)
      const {userDataList} = parsedData
      console.log(userDataList)
      const fectchUserFromList = userDataList.filter(each => each.id === id)

      setProfileDts(fectchUserFromList)
      currentUserProfile = fectchUserFromList
      console.log(`log dets ${fectchUserFromList.username}`)
      console.log(id)
    }
    getProfileDets()
  }, [])

  return (
    <StoredDataContext.Consumer>
      {value => {
        const {
          currentUser,
          usersDataList,
          setUsersDataList,
          StoreTheDataInLocalStorageFn,
          setCurrentUser,
        } = value
        console.log(`state dets ${profileDts}`)
        currentUserProfile = currentUser
        const {status, username, loginAs} = currentUserProfile
        const onClickLogutBtn = () => {
          if (currentUser.status === 'ONLINE') {
            const updatedUsersList = usersDataList.map(eachOne => {
              if (currentUser.id !== eachOne.id) {
                return {...eachOne, status: 'OFFLINE'}
              }
              return eachOne
            })
            setCurrentUser({...currentUser, status: 'OFFLINE'})
            setUsersDataList(updatedUsersList)
          } else {
            const updatedUsersList = usersDataList.map(eachOne => {
              if (currentUser.id !== eachOne.id) {
                return {...eachOne, status: 'ONLINE'}
              }
              return eachOne
            })
            setCurrentUser({...currentUser, status: 'ONLINE'})
            setUsersDataList(updatedUsersList)
          }

          StoreTheDataInLocalStorageFn()
        }

        const renderLogBtn =
          currentUserProfile === 'ONLINE' ? 'Log Out' : 'Log In'

        return (
          <div>
            <div className="profile-card-container">
              <div className="details-candidate">
                <div className="employee-profile-container">
                  <p className="profile-candidate">N</p>
                </div>
                <div className="candidate-full-name-job-role">
                  <p className="candidate-details">{username}</p>
                  <p className="candidate-details">{loginAs}</p>
                </div>
              </div>
              <div className="login-status">
                <OnlineStatus onStatus={status}>{status}</OnlineStatus>
                <LogButton
                  onStatus={status}
                  type="button"
                  className="logout-btn"
                  onClick={onClickLogutBtn}
                >
                  {renderLogBtn}
                </LogButton>
              </div>
            </div>
          </div>
        )
      }}
    </StoredDataContext.Consumer>
  )
}

export default ProfileCard
