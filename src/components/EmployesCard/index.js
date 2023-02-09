import './index.css'
import StoreDataContext from '../../StoreDataContext'
import EmployeeDetsCard from '../EmployeeDetsCard'

const EmployesCard = () => (
  <StoreDataContext.Consumer>
    {value => {
      const {usersDataList} = value

      return (
        <div className="employs-card-left-main-container">
          <div className="company-name-container">
            <p className="company-name-element">company name</p>
          </div>
          <div className="employs-card-main-container">Employess data</div>
          <ul className="user-list-creator-ul-list">
            {usersDataList.map(eachOne => (
              <EmployeeDetsCard eachOne={eachOne} />
            ))}
          </ul>
        </div>
      )
    }}
  </StoreDataContext.Consumer>
)

export default EmployesCard
