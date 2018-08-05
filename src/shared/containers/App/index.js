import React         from 'react'
import util          from 'util'
import { WordClass } from 'Classes'
import { Modal }     from 'Components';

const word = new WordClass();
const initialState = {
  modal: {
    show: false,
    head: undefined,
    body: undefined
  },
  result: {
    status: 'initial', //initial, loading, complete
    data: undefined,
    components: undefined
  },
  chosenWord: undefined
}
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }
  handleChange = (event) => {
    let word = event.currentTarget.value;
    this.setState({
      chosenWord: word
    });
  }
  handleResult = (result, chosenWord) => {
    let components = []
    components.push(<div className="word">{ chosenWord.toUpperCase() }</div>)
    for (let key in result) {
      let current = result[key][0]
      components.push((
        <React.Fragment>
          <div className="grammar-class">{ key.toUpperCase() }</div>
          <div className="def">{ current.def }</div>
          <div className="ex">
            <div className="title">Example:</div>
            <div className="content">{ current.ex }</div>
          </div>
        </React.Fragment>
      ))
    }
    this.setState({
      result: { ...this.state.result, components, status: 'complete' }
    });
  }
  status = (status) => {
    this.setState({ result: { ...this.state.result, status }})
  }
  handleKeyDown = async (event) => {
    let key  = event.keyCode
    let val  = event.currentTarget.value;
    if (key === 27) {
      this.setState({modal: {...this.state.modal, show: false}})
    }
    if (key === 13) {
      this.status('loading')
      let result = await word.define(val)
        .then(r => { this.handleResult(r, val) })
        .catch(e => { this.status('complete'); this.setState({modal: { show: true, head: 'Error!', body: e.message}}) });
    }
  }
  render() {
    let { components, status } = this.state.result;
    return (
      <React.Fragment>
        <Modal _that={this} show={this.state.modal.show} head={this.state.modal.head} body={this.state.modal.body}></Modal>
        <div className="wrapper">
          <div className="form choose-word">
            <div className="control">
              <input value={this.state.chosenWord} onChange={this.handleChange} onKeyDown={this.handleKeyDown} type="text" className="input-text target" placeholder="Phrase or word"/>
            </div>
          </div>
          <div className="result">
            { status === 'complete' ? components : status === 'initial' ? 'Choose an word to defined' : "Loading..." }
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
