import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

import {ButtonComp} from '../../StyledComponents'

import './index.css'

const ReactPopUp = props => {
  const {
    onClosePopup,
    triggered,
    username,
    onClickAddEmployee,
    onClickProceed,
  } = props
  const onClickTrigger = () => {
    onClosePopup()
  }

  const onClickProceedBtn = () => {
    onClickProceed()
  }

  const onClickAddEmployeebtn = () => {
    onClickAddEmployee()
  }
  return (
    <div className="popup-container">
      <Popup modal open={triggered}>
        <div className="popupClass">
          <div>
            <p>
              Continue as <span>{username}</span>
            </p>
          </div>
          <ButtonComp type="button" onClick={onClickTrigger}>
            close
          </ButtonComp>
          <ButtonComp type="button" onClick={onClickProceedBtn}>
            proceed
          </ButtonComp>
          <ButtonComp type="button" onClick={onClickAddEmployeebtn}>
            Add employee
          </ButtonComp>
        </div>
      </Popup>
    </div>
  )
}
export default ReactPopUp
