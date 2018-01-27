import React, { Component } from 'react';
import axios from 'axios';
import Head from './Head';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      texts: null,
      current: null
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.onVoteButtonClick = this.onVoteButtonClick.bind(this);
    this.onChangeQuestionButtonClick = this.onChangeQuestionButtonClick.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/fetch').then((res) => {
      this.setState({
        texts: res.data.texts,
        current: Math.floor(Math.random() * res.data.texts.length)
      })
    })
  }

  onInputChange(event) {
    this.setState({
      ...this.state,
      username: event.target.value
    })
  }

  onVoteButtonClick() {
    axios.post('http://localhost:3000/api/vote', {
      username: this.state.username,
      text: this.state.texts[this.state.current]._id
    }).then(() => {
      this.setState({
        ...this.state,
        current: Math.floor(Math.random() * this.state.texts.length)
      })
    })
  }

  onChangeQuestionButtonClick() {
    this.setState({
      ...this.state,
      current: Math.floor(Math.random() * this.state.texts.length)
    })
  }
  
  render() {
    const { texts, current } = this.state;
    if(texts!==null && current!==null) {
      return (
        <div>
          <Head />
          <div className="flex-container">
            <div className="flex-item">
              <h1>Task 2</h1>
              Username: <input value={this.state.username} onChange={this.onInputChange}/>
              <p className="warning">For convinience, username is used to identify user.</p>
            </div>
            <div className="flex-item">
              <h1>Question: {texts[current].headline}</h1>
              <button className="btn-primary" onClick={this.onVoteButtonClick}>{texts[current].buttonText}</button>
              <button className="btn-default" onClick={this.onChangeQuestionButtonClick}>Change Question</button>
            </div>
          </div>
        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

export default Question;