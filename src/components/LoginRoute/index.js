import {Redirect} from 'react-router-dom'
import {useState} from 'react'
import {v4} from 'uuid'
import StoreDataContext from '../../StoreDataContext/index'

import './index.css'
import ReactPopUp from '../PopUpCompoenent'

const LoginPage = props => {
  const {history} = props
  const [username, setUsername] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState('')

  const [triggered, setTriggered] = useState(false)
  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onchangePassword = event => {
    setPassword(event.target.value)
  }

  const onchangeCompanyName = event => {
    setCompanyName(event.target.value)
  }

  const onClosePopup = () => {
    setTriggered(false)
  }

  const redirectToDashBoard = loginAsarg => {
    if (loginAsarg === 'CREATOR') {
      history.push('/creator')
    } else {
      setTriggered(true)
    }
  }
  let redirectId = null

  return (
    <StoreDataContext.Consumer>
      {value => {
        const {
          currentUser,
          setCurrentUser,
          setEmployeeLoggedFn,
          usersDataList,
          whoIsDt,
          StoreTheDataInLocalStorageFn,
          onAddUserFn,
        } = value

        const onSubmitForm = event => {
          event.preventDefault()
          const dateTime = new Date()
          const id = v4()
          redirectId = id
          const loginDets = {
            id,
            companyName,
            username,
            password,
            loginAs: whoIsDt,
            dateTime,
            status: 'ONLINE',
          }

          const getUserObj = usersDataList.find(
            eachPerson => eachPerson.username === username,
          )
          const getUserFromDataBase = usersDataList.find(
            eachPerson => eachPerson.password === password,
          )
          const compObj = usersDataList.find(
            eachPerson => eachPerson.companyName === companyName,
          )

          if (companyName === '') {
            setErrorMessage('Enter Company Name')
          } else if (username === '') {
            setErrorMessage('Enter User Name')
          } else if (password === '') {
            setErrorMessage('Enter Password')
          } else if (
            getUserObj !== undefined &&
            compObj !== undefined &&
            getUserFromDataBase === undefined
          ) {
            setErrorMessage('Enter Correct Password')
          } else {
            onAddUserFn(loginDets)
            setCurrentUser(loginDets)

            StoreTheDataInLocalStorageFn()

            redirectToDashBoard(whoIsDt)
          }
        }

        const onClickProceed = () => {
          history.push(`/employee/${redirectId}`)
        }

        const onClickAddEmployee = () => {
          setUsername('')
          setPassword('')

          setEmployeeLoggedFn(false)
          setTriggered(false)
          setCompanyName('')
        }

        if (whoIsDt === '') {
          return <Redirect to="/" />
        }

        if (currentUser !== undefined) {
          ;<Redirect to={`/${currentUser.loginAs}`} />
        }

        return (
          <div>
            <div className="login-main-container">
              <div className="login-image-container">
                <img
                  src="https://res.cloudinary.com/dzapdxkgc/image/upload/v1675513043/4957136_fi4aqg.jpg"
                  alt="website Login"
                  className="register-image"
                />
              </div>

              <form onSubmit={onSubmitForm}>
                <h1 className="login-main-heading">Let us join</h1>
                <p>
                  Enter <span>{whoIsDt} Details</span>
                </p>
                <div className="username-topic-container">
                  <label htmlFor="companyName" className="label">
                    COMPANY NAME
                  </label>
                  <input
                    className="user-name-input"
                    id="companyName"
                    onChange={onchangeCompanyName}
                    placeholder="Company Name"
                    value={companyName}
                  />
                </div>
                <div className="username-topic-container">
                  <label htmlFor="username" className="label">
                    NAME
                  </label>
                  <input
                    className="user-name-input"
                    id="username"
                    onChange={onChangeUsername}
                    placeholder="Your Name"
                    value={username}
                  />
                </div>
                <div className="username-topic-container">
                  <label htmlFor="password" className="label">
                    PASSWORD
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="user-name-input"
                    placeholder="Password"
                    onChange={onchangePassword}
                    value={password}
                  />
                </div>

                <div className="buttons-container">
                  <button type="submit" className="register-now-btn">
                    Login
                  </button>
                </div>
                <ReactPopUp
                  triggered={triggered}
                  username={username}
                  onClosePopup={onClosePopup}
                  onClickAddEmployee={onClickAddEmployee}
                  onClickProceed={onClickProceed}
                />

                <p className="error-msg">{errorMessage}</p>
              </form>
            </div>
            <div className="bottom-hint-container">
              <div className="credential-hint">
                <p className="label-hint">
                  Use these login details form creator
                </p>
                <p className="label-hint">
                  username : <span>abc</span>{' '}
                </p>
                <p className="label-hint">
                  username : <span>NAVEEN</span>{' '}
                </p>
                <p className="label-hint">
                  Password : <span>naveen</span>
                </p>
                <p className="label-hint">
                  login as : <span>creator</span>
                </p>
              </div>
              <div className="credential-hint">
                <p className="label-hint">
                  Use these login details form employee
                </p>
                <p className="label-hint">
                  username : <span>abc</span>{' '}
                </p>
                <p className="label-hint">
                  username : <span>STELLA</span>{' '}
                </p>
                <p className="label-hint">
                  Password : <span>123456</span>
                </p>
                <p className="label-hint">
                  login as : <span>Employee</span>
                </p>
              </div>
            </div>
            <div>
              <p className="label-hint">
                {' '}
                Or else enter new company name and add employs by click on add
                employee on popup
              </p>
            </div>
          </div>
        )
      }}
    </StoreDataContext.Consumer>
  )
}

export default LoginPage
