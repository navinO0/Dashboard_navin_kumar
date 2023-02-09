import {useState} from 'react'
import {v4} from 'uuid'
import StoreDataContext from '../../StoreDataContext/index'
import {ButtonComp} from '../../StyledComponents'
import './index.css'
import ReactPopUp from '../PopUpCompoenent'

const LoginPage = props => {
  const {history} = props
  const [username, setUsername] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [password, setPassword] = useState('')
  const [loginAs, setLoginAs] = useState('CREATOR')
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

  const selectWhoIsLogin = event => {
    setLoginAs(event.target.value)
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
          employeeLoggedDt,
          StoreTheDataInLocalStorageFn,
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
            loginAs,
            dateTime,
            status: 'ONLINE',
          }
          if (companyName === '') {
            setErrorMessage('Enter Company Name')
          } else if (username === '') {
            setErrorMessage('Enter User Name')
          } else if (password === '') {
            setErrorMessage('Enter Password')
          } else {
            setCurrentUser(loginDets)
            StoreTheDataInLocalStorageFn()
            const formateedDate = `${
              dateTime.getMonth() + 1
            } ${dateTime.getUTCMonth()} /${dateTime.getDate()}   time: ${dateTime.getHours()} : ${dateTime.getHours()}`
            const options = {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }

            const formattedDateTime = dateTime.toLocaleDateString(
              'en-US',
              options,
            )
            redirectToDashBoard(loginAs)
          }
        }

        const onClickProceed = () => {
          history.push(`/employee/${redirectId}`)
        }

        const onClickAddEmployee = () => {
          setUsername('')
          setPassword('')
          setLoginAs('EMPLOYEE')
          setEmployeeLoggedFn(false)
          setTriggered(false)
        }

        return (
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
              <div className="username-topic-container">
                <p className="creator-or-employee-qn">Creator or Employee ?</p>
                <div className="options-container">
                  <div className="creator-employee-inputs">
                    <input
                      type="radio"
                      name="creatorOrEmployee"
                      value="CREATOR"
                      id="creator"
                      onChange={selectWhoIsLogin}
                      checked={loginAs === 'CREATOR'}
                    />
                    <label className="label" htmlFor="creator">
                      CREATOR
                    </label>
                  </div>
                  <div className="creator-employee-inputs">
                    <input
                      type="radio"
                      name="creatorOrEmployee"
                      value="EMPLOYEE"
                      id="employee"
                      onChange={selectWhoIsLogin}
                      checked={loginAs === 'EMPLOYEE'}
                    />
                    <label className="label" htmlFor="employee">
                      EMPLOYEE
                    </label>
                  </div>
                </div>
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
        )
      }}
    </StoreDataContext.Consumer>
  )
}

export default LoginPage
