import React, { Component } from 'react';
import axios from 'axios';
import Head from './Head';

class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: null
    }
    this.renderRecordList = this.renderRecordList.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/show').then((response) => {
      this.setState({
        records: response.data.records
      })
    })
  }

  renderRecordList() {
    return this.state.records.sort((a, b) => {
      return a.votedBy.length - b.votedBy.length;
    }).map((element) => {
      return (
        <tr key={element._id}>
          <td>{element.headline}</td>
          <td>{element.votedBy.length}</td>
        </tr>
      )
    })
  }

  render() {
    if(this.state.records===null) return <div>Loading...</div>
    else {
      return (
        <div>
          <Head />
          <table>
            <tbody>
              <tr>
                <th>Headline</th>
                <th>Count</th>
              </tr>
              {this.renderRecordList()}
            </tbody>
          </table>
        </div>
      )
    }
  }
}

export default Record;