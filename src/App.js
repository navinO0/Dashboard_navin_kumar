import {useState, useEffect} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import StoreDataContext from './StoreDataContext/index'
import './App.css'
import LoginRoute from './components/LoginRoute'
import CreatorRoute from './components/CreatorRoute'
import EmployeeRoute from './components/EmployeeRoute'
import NotFound from './components/NotFound'

const employeesData = [
  {
    id: '923874938',
    companyName: 'abc',
    username: 'Employee1',
    password: 'asjdiopfjasd',
    loginAs: 'EMPLOYEE',
    dateTime: '',
    status: 'LOGGED_IN',
  },
  {
    id: '92387493823',
    companyName: 'abc',
    username: 'Employee2',
    password: 'asjdiopfjasd',
    loginAs: 'EMPLOYEE',
    dateTime: '',
    status: 'LOGGED_OUT',
  },
  {
    id: '92387493825',
    companyName: 'abc',
    username: 'Employee3',
    password: 'asjdiopfjasd',
    loginAs: 'EMPLOYEE',
    dateTime: '',
    status: 'LOGGED_IN',
  },
  {
    id: '92387493826',
    companyName: 'abc',
    username: 'Employee4',
    password: 'asjdiopfjasd',
    loginAs: 'EMPLOYEE',
    dateTime: '',
    status: 'LOGGED_IN',
  },
  {
    id: '92387493827',
    companyName: 'abc',
    username: 'Employee5',
    password: 'asjdiopfjasd',
    loginAs: 'EMPLOYEE',
    dateTime: '',
    status: 'LOGGED_IN',
  },
  {
    id: '92387493828',
    companyName: 'abc',
    username: 'Employee6',
    password: 'asjdiopfjasd',
    loginAs: 'EMPLOYEE',
    dateTime: '',
    status: 'LOGGED_IN',
  },
  {
    id: '92387493834',
    companyName: 'abc',
    username: 'Employee7',
    password: 'asjdiopfjasd',
    loginAs: 'EMPLOYEE',
    dateTime: '',
    status: 'LOGGED_IN',
  },
  {
    id: '9238749353',
    companyName: 'abc',
    username: 'Employee8',
    password: 'asjdiopfjasd',
    loginAs: 'EMPLOYEE',
    dateTime: '',
    status: 'LOGGED_IN',
  },
  {
    id: '923874938989',
    companyName: 'abc',
    username: 'Employee9',
    password: 'asjdiopfjasd',
    loginAs: 'EMPLOYEE',
    dateTime: '',
    status: 'LOGGED_IN',
  },
  {
    id: '9238749382321',
    companyName: 'abc',
    username: 'Employee10',
    password: 'asjdiopfjasd',
    loginAs: 'EMPLOYEE',
    dateTime: '',
    status: 'ONLINE',
  },
]

const initialTaskData = [
  {
    id: '234234',
    task: 'task 1',
    deadLine: '',
    priority: 'MEDIUM',
    status: 'NOT_COMPLETED',
    team: [],
  },
  {
    id: '2342342',
    task: 'task 2',
    deadLine: '',
    priority: 'MEDIUM',
    team: [],
    status: 'NOT_COMPLETED',
  },
  {
    id: '2342343',
    task: 'task 3',
    deadLine: '',
    priority: 'MEDIUM',
    team: [],
    status: 'NOT_COMPLETED',
  },
  {
    id: '2342344',
    task: 'task 4',
    deadLine: '',
    priority: 'MEDIUM',
    team: [],
    status: 'NOT_COMPLETED',
  },
  {
    id: '2342345',
    task: 'task 5',
    deadLine: '',
    priority: 'MEDIUM',
    team: [],
    status: 'NOT_COMPLETED',
  },
  {
    id: '2342346',
    task: 'task 6',
    deadLine: '',
    priority: 'MEDIUM',
    team: [],
    status: 'NOT_COMPLETED',
  },
  {
    id: '2342347',
    task: 'task 7',
    deadLine: '',
    team: [],
    priority: 'MEDIUM',
    status: 'NOT_COMPLETED',
  },
  {
    id: '2342348',
    task: 'task 8',
    deadLine: '',
    team: [],
    priority: 'MEDIUM',
    status: 'NOT_COMPLETED',
  },
  {
    id: '2342349',
    task: 'task 9',
    deadLine: '',
    priority: 'MEDIUM',
    team: [],
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
  '#CCFF1A',
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
  '#E6FF80',

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
      }}
    >
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={LoginRoute} />
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
