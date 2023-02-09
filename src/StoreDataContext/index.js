import React from 'react'

const StoreDataContext = React.createContext({
  employeeData: [],
  addEmployeeData: () => {},
  currentUser: {},
  setCurrentUser: () => {},
  usersDataList: [],
  updatedUsersList: () => {},
  setEmployeeLoggedFn: () => {},
  employeeLoggedDt: false,
  onAddTasksListFn: () => {},
  tasksListDt: [],
  colors: [],
  updateTasksListFn: () => {},
  setUsersDataList: () => {},
  StoreTheDataInLocalStorageFn: () => {},
})

export default StoreDataContext
