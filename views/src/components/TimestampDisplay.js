
import React from 'react';

/*
 * A simple React component to fetch and display the timestamp.
 */

export default class TimestampDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      fetching: false,
      timestamp: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.getTimestamp = this.getTimestamp.bind(this);
  }

  // input field 'onChange' handler
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  // 'onSubmit' handler
  getTimestamp(e) {
    e.preventDefault();

    const dateString = this.state.input.trim();

    this.setState({
      input: '',
      fetching: true,
      timestamp: ''
    });

    // fetch data from the API
    fetch('api/timestamp/' + dateString)
      .then(res => res.json())
      .then(json => this.setState({
        fetching: false,
        timestamp: json
      }))
      .catch(err => console.error(err));
  }

  // formats output value with quotes and/or comma
  formatValue(key, index, length) {
    const value = this.state.timestamp[key];
    const result = typeof value === "string" ? `"${value}"` : `${value}`;
    return index < length - 1 ? result + ',' : result;
  }

  render() {
    let timestampResult = null;
    if (this.state.fetching) {
      timestampResult = (
        <p className='code-block'>
          <code>Fetching timestamp...</code>
        </p>
      );
    }
    else if (this.state.timestamp) {
      timestampResult = (
        <ul className='code-block'>
          <code>
            <li>{'{'}</li>
            <ul>
              {Object.keys(this.state.timestamp).map((key, index, array) =>
                <li key={key}>
                  "{key}": {this.formatValue(key, index, array.length)}
                </li>
              )}
            </ul>
            <li>{'}'}</li>
          </code>
        </ul>
      );
    }

    return (
      <form onSubmit={this.getTimestamp}>
        <div className='input-container'>
          <label for="date-string">Date string:</label>
          <input id="date-string" type="text" value={this.state.input}
            onChange={this.handleChange}
            placeholder="Enter date string..."
          />
          <input type="submit" value="Get Timestamp" />
        </div>
        {timestampResult}
      </form>
    );
  }
}
