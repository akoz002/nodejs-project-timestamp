
import React from 'react';

/*
 * A simple React component to fetch and display the timestamp.
 */

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      timestamp: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // input field 'onChange' handler
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  // button 'onClick' handler
  handleClick() {
    // fetch data from the API
    fetch('api/timestamp/' + this.state.input.trim())
      .then(res => res.json())
      .then(json => this.setState({
        timestamp: JSON.stringify(json, null, 1),
        input: ''
      }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <h3>Demo:</h3>
        <input type="text" value={this.state.input}
          onChange={this.handleChange}
          placeholder="Enter date string..."
        />
        <button onClick={this.handleClick}>Get Timestamp</button>
        <p><code>{this.state.timestamp}</code></p>
      </div>
    );
  }
}
