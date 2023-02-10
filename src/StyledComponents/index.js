import Styled from 'styled-components'

export const TeamMemberComp = Styled.p`
background-color: ${props => props.bgColor};
padding : 4px 9px 4px 9px;
border-radius : 40px;
margin: 0px 7px 0px 3px;
color :  #e2e8f0;
font-weight : 600;
font-size: 12px;

`

export const ButtonComp = Styled.button`
  padding: 5px 15px 5px 15px;
  border: solid 1px #e2e8f0;
    margin-right : 7px;
    color : #1e293b;
  font-family: 'Roboto';
  background-color: transparent;
  border-radius: 6px;
  cursor: pointer;
  font-size : 13px;
  outline: none;

`
export const DetailsComp = Styled.p`
 font-family: 'Roboto';
  font-size: 10px;
  color: #7b8794;
  font-weight: 400;
`

export const OnlineStatus = Styled.p`
  font-family: 'roboto';
  font-size: 13px;
  margin-right: 10px;
  margin-top: 0px;
  color : ${props => (props.onStatus ? '#33991A' : '#E6331A')};
  margin-bottom: 6px;
`
export const LogButton = Styled.button`
  padding: 5px 20px 5px 20px;
  border: solid 1px ${props => (props.onStatus ? '#E6331A' : '#33991A')};
    margin-right : 7px;
    color : ${props => (props.onStatus ? '#E6331A' : '#33991A')};
  font-family: 'Roboto';
  background-color: transparent;
  border-radius: 6px;
  cursor: pointer;
  outline: none;
`

export const PriorityComp = Styled.span`

  font-family: 'Roboto';
  font-size: 10px;
  color: #7b8794;
  font-weight: 400;
  color : ${props => {
    switch (props.priority) {
      case 'HIGH':
        return '#E6331A'
      case 'MEDIUM':
        return '#B34D4D'
      case 'LOW':
        return '#6666FF'

      default:
        return ''
    }
  }};

`
