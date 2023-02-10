import {useState, useEffect} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import StoreDataContext from './StoreDataContext/index'
import './App.css'
import LoginRoute from './components/LoginRoute'
import CreatorRoute from './components/CreatorRoute'
import EmployeeRoute from './components/EmployeeRoute'
import NotFound from './components/NotFound'
import HomeRoute from './components/HomeRoute'

const employeesData = [
  {
    id: '923874938',
    companyName: 'abc',
    username: 'NAVEEN',
    password: 'naveen',
    loginAs: 'EMPLOYEE',
    dateTime: '',
    status: 'ONLINE',
  },
  {
    id: '92387493823',
    companyName: 'abc',
    username: 'RAVI',
    password: '123456',
    loginAs: 'EMPLOYEE',
    dateTime: '',
    status: 'OFFLINE',
  },
  {
    id: '92387493825',
    companyName: 'abc',
    username: 'STELLA',
    password: '123456',
    loginAs: 'EMPLOYEE',
    dateTime: '',
    status: 'ONLINE',
  },
  {
    id: '92387493826',
    companyName: 'abc',
    username: 'ROSIE',
    password: '123456',
    loginAs: 'EMPLOYEE',
    dateTime: '',
    status: 'OFFLINE',
  },
  {
    id: '92387493827',
    companyName: 'abc',
    username: 'JOHN',
    password: '123456',
    loginAs: 'EMPLOYEE',
    dateTime: '',
    status: 'OFFLINE',
  },
  {
    id: '92387493828',
    companyName: 'abc',
    username: 'EMMA WATSON',
    password: '123456',
    loginAs: 'EMPLOYEE',
    dateTime: '',
    status: 'OFFLINE',
  },
  {
    id: '92387493834',
    companyName: 'abc',
    username: 'JOHN WICK',
    password: '123456',
    loginAs: 'EMPLOYEE',
    dateTime: '',
    status: 'OFFLINE',
  },
  {
    id: '9238749353',
    companyName: 'abc',
    username: 'SPIDERMAN',
    password: '123456',
    loginAs: 'EMPLOYEE',
    dateTime: '',
    status: 'OFFLINE',
  },
  {
    id: '923874938989',
    companyName: 'abc',
    username: 'SUPERMAN',
    password: '123456',
    loginAs: 'EMPLOYEE',
    dateTime: '',
    status: 'OFFLINE',
  },
  {
    id: '9238749382321',
    companyName: 'abc',
    username: 'RAMU',
    password: '123456',
    loginAs: 'EMPLOYEE',
    dateTime: '',
    status: 'ONLINE',
  },
]

const initialTaskData = [
  {
    id: '234234',
    companyName: 'abc',
    task: 'task 1',
    deadLine: '',
    priority: 'MEDIUM',
    status: 'NOT_COMPLETED',
    team: [
      {
        id: '92387493823',
        companyName: 'abc',
        username: 'RAVI',
        password: '123456',
        loginAs: 'EMPLOYEE',
        dateTime: '',
        status: 'OFFLINE',
      },

      {
        id: '92387493826',
        companyName: 'abc',
        username: 'ROSIE',
        password: '123456',
        loginAs: 'EMPLOYEE',
        dateTime: '',
        status: 'OFFLINE',
      },
      {
        id: '92387493827',
        companyName: 'abc',
        username: 'JOHN',
        password: '123456',
        loginAs: 'EMPLOYEE',
        dateTime: '',
        status: 'OFFLINE',
      },
      {
        id: '92387493828',
        companyName: 'abc',
        username: 'EMMA WATSON',
        password: '123456',
        loginAs: 'EMPLOYEE',
        dateTime: '',
        status: 'OFFLINE',
      },

      {
        id: '9238749353',
        companyName: 'abc',
        username: 'SPIDERMAN',
        password: '123456',
        loginAs: 'EMPLOYEE',
        dateTime: '',
        status: 'OFFLINE',
      },
      {
        id: '923874938989',
        companyName: 'abc',
        username: 'SUPERMAN',
        password: '123456',
        loginAs: 'EMPLOYEE',
        dateTime: '',
        status: 'OFFLINE',
      },
    ],
  },
  {
    id: '2342342',
    companyName: 'abc',
    task: 'task 2',
    deadLine: '',
    priority: 'MEDIUM',
    team: [
      {
        id: '92387493828',
        companyName: 'abc',
        username: 'EMMA WATSON',
        password: '123456',
        loginAs: 'EMPLOYEE',
        dateTime: '',
        status: 'OFFLINE',
      },

      {
        id: '9238749353',
        companyName: 'abc',
        username: 'SPIDERMAN',
        password: '123456',
        loginAs: 'EMPLOYEE',
        dateTime: '2023-02-10T12:10',
        status: 'OFFLINE',
      },
      {
        id: '923874938989',
        companyName: 'abc',
        username: 'SUPERMAN',
        password: '123456',
        loginAs: 'EMPLOYEE',
        dateTime: '2023-02-10T12:10',
        status: 'OFFLINE',
      },
    ],
    status: 'NOT_COMPLETED',
  },
]

const colorArray = [
  '#FF6633',
  '#FFB399',
  '#FF33FF',

  '#00B3E6',
  '#E6B333',
  '#3366E6',
  '#999966',
  '#99FF99',
  '#B34D4D',
  '#80B300',
  '#809900',
  '#E6B3B3',
  '#6680B3',
  '#66991A',
  '#FF99E6',

  '#FF1A66',
  '#E6331A',

  '#66994D',
  '#B366CC',
  '#4D8000',
  '#B33300',
  '#CC80CC',
  '#66664D',
  '#991AFF',
  '#E666FF',
  '#4DB3FF',
  '#1AB399',
  '#E666B3',
  '#33991A',
  '#CC9999',
  '#B3B31A',
  '#00E680',
  '#4D8066',
  '#809980',

  '#999933',
  '#FF3380',
  '#CCCC00',

  '#4D80CC',
  '#9900B3',
  '#E64D66',
  '#4DB380',
  '#FF4D4D',
  '#99E6E6',
  '#6666FF',
]

const App = () => {
  const [userData, setUserData] = useState('')
  const [employeeLogged, setEmployeeLogged] = useState('')
  const [userDataList, setUserDataList] = useState(employeesData)
  const [tasksList, setTasksList] = useState(initialTaskData)

  useEffect(() => {
    const getDetailsFromLocal = () => {
      const getDets = localStorage.getItem('storeLocalStorage')
      const parsedData = JSON.parse(getDets)

      setUserData(parsedData.userData)
      setUserDataList(parsedData.userDataList)
      setTasksList(parsedData.tasksList)
    }

    getDetailsFromLocal()
  }, [])

  const StoreTheDataInLocalStorage = () => {
    const storeLocalStorage = {userData, userDataList, tasksList}
    const stringified = JSON.stringify(storeLocalStorage)
    localStorage.setItem('storeLocalStorage', stringified)
  }

  const onAddUser = user => {
    const userObj = userDataList.find(
      eachPerson => eachPerson.username === user.username,
    )
    const compObj = userDataList.find(
      eachPerson => eachPerson.companyName === user.companyName,
    )
    if (userObj === undefined && compObj !== undefined) {
      setUserDataList([...userDataList, user])
    }

    StoreTheDataInLocalStorage()
  }

  const updateLoginStatus = updatedList => {
    setUserDataList(updatedList)
  }

  const onAddTasksList = taskData => {
    setTasksList([...tasksList, taskData])
    StoreTheDataInLocalStorage()
  }

  const updateTasksList = updatedList => {
    setTasksList(updatedList)
    StoreTheDataInLocalStorage()
  }

  return (
    <StoreDataContext.Provider
      value={{
        currentUser: userData,
        setCurrentUser: setUserData,
        usersDataList: userDataList,
        setUsersDataList: setUserDataList,
        setEmployeeLoggedFn: setEmployeeLogged,
        employeeLoggedDt: employeeLogged,
        onAddTasksListFn: onAddTasksList,
        tasksListDt: tasksList,
        colors: colorArray,
        updateTasksListFn: updateTasksList,
        StoreTheDataInLocalStorageFn: StoreTheDataInLocalStorage,
        onAddUserFn: onAddUser,
        updateLoginStatusFn: updateLoginStatus,
      }}
    >
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={LoginRoute} />
            <Route exact path="/" component={HomeRoute} />
            <Route exact path="/creator" component={CreatorRoute} />
            <Route exact path="/employee/:id" component={EmployeeRoute} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </>
    </StoreDataContext.Provider>
  )
}
export default App
