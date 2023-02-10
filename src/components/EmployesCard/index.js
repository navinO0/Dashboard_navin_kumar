import './index.css'
import StoreDataContext from '../../StoreDataContext'
import EmployeeDetsCard from '../EmployeeDetsCard'

const EmployesCard = () => (
  <StoreDataContext.Consumer>
    {value => {
      const {usersDataList, currentUser} = value
      const filteredList = usersDataList.filter(
        each => each.username !== currentUser.username,
      )
      return (
        <div className="employs-card-left-main-container">
          <div className="company-name-container">
            <p className="label">COMPANY</p>
            <p className="company-name-element">{currentUser.companyName}</p>
          </div>
          <div className="employs-card-main-container">Employees Data</div>
          <ul className="user-list-creator-ul-list">
            {filteredList.map(eachOne => {
              if (eachOne.companyName === currentUser.companyName) {
                return (
                  <EmployeeDetsCard
                    eachOne={eachOne}
                    key={eachOne.id}
                    currentUser={currentUser}
                  />
                )
              }
              return ''
            })}
          </ul>
        </div>
      )
    }}
  </StoreDataContext.Consumer>
)

export default EmployesCard
