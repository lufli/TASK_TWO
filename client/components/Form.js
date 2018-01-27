import React, { Component } from 'react';
import axios from 'axios';
import Head from './Head';
import { withRouter } from 'react-router';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: '',
      buttonText: ''
    }
    this.onHeadlineChange = this.onHeadlineChange.bind(this);
    this.onButtonTextChange = this.onButtonTextChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onHeadlineChange(event) {
    this.setState({
      ...this.state,
      headline: event.target.value
    })
  }

  onButtonTextChange(event) {
    this.setState({
      ...this.state,
      buttonText: event.target.value
    })
  }

  onFormSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:3000/api/create', this.state)
    .then(res => {console.log(res)});
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <Head />
        <h1>Create text pairs!</h1>
        <form onSubmit={this.onFormSubmit} >
          <input value={this.state.headline} onChange={this.onHeadlineChange} placeholder="Headline" />
          <input value={this.state.buttonText} onChange={this.onButtonTextChange} placeholder="Button Text" />
          <button type="submit">Create</button>
        </form>
      </div>
    )
  }
}

export default withRouter(Form);