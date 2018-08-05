import styled, { css } from 'styled-components'
import React from 'react'
import ReactDOM from 'react-dom';

const CssOfLittleModal = css`
  width: 100%;
  height: auto;
  max-height: 320px;
  overflow-y: auto;
  top: 25px;
  left: 0px;
`
const CssOfNormalModal = css`
  width: 60%;
  height: 60%;
  min-height: 480px;
  min-width: 320px;
  top: 20%;
  left: 20%;
  @media (max-width: 400px) {
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
  }
`
const StyledModal = styled.div`
  position: fixed;
  background: #414455;
  ${props => props.little ? CssOfLittleModal : CssOfNormalModal};

  & > * {
    color: white;
  }
  transform: translateY(-200%);
  transition: transform .5s;
`
const Head = styled.div`
  width: 100%;
  font-size: 32px;
  line-height: 40px;
  text-align: center;
`;
const Body = styled.div`
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 8px;
`
const Close = styled.div`
  color: indianred;
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  right: 10px;
  top: 10px;
  user-select: none;
  cursor: pointer;
`
const Foot = styled.div`
  color: indianred;
  font-weight: bold;
  text-align: center;
  margin-bottom: 8px;
`

class Modal extends React.Component {
  handleClose = () => {
    let _that = this.props._that
    _that.setState({..._that.state, modal: { ..._that.state.modal, show: false }});
    this.animComponentOut();
  }
  animComponentOut = () => {
    this.thisModal.style.transform = 'translateY(-200%)';
  }
  animComponentIn  = () => {
    this.thisModal.style.transform = 'translateY(0%)';
  }
  componentDidMount = () => {
    this.thisModal = ReactDOM.findDOMNode(this)
  }
  componentDidUpdate = () => {
    if (this.props.show)
      this.animComponentIn();
    else
      this.animComponentOut();
  }
  render() {
    return(
      <StyledModal little>
        <Close onClick={this.handleClose}>X</Close>
        <Head>{this.props.head}</Head>
        <Body>{this.props.body}</Body>
        <Foot>[Esc] to close the modal</Foot>
      </StyledModal>
    );
  }
}

export default Modal
