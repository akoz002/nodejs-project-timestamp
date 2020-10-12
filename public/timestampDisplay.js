'use strict';

/*
 * A simple React component to fetch and display the timestamp.
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimestampDisplay = function (_React$Component) {
  _inherits(TimestampDisplay, _React$Component);

  function TimestampDisplay(props) {
    _classCallCheck(this, TimestampDisplay);

    var _this = _possibleConstructorReturn(this, (TimestampDisplay.__proto__ || Object.getPrototypeOf(TimestampDisplay)).call(this, props));

    _this.state = {
      input: '',
      timestamp: ''
    };

    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  // input field 'onChange' handler


  _createClass(TimestampDisplay, [{
    key: 'handleChange',
    value: function handleChange(event) {
      this.setState({
        input: event.target.value
      });
    }

    // button 'onClick' handler

  }, {
    key: 'handleClick',
    value: function handleClick() {
      var _this2 = this;

      // fetch data from the API
      fetch('api/timestamp/' + this.state.input.trim()).then(function (res) {
        return res.json();
      }).then(function (json) {
        return _this2.setState({
          timestamp: JSON.stringify(json, null, 1),
          input: ''
        });
      }).catch(function (err) {
        return console.error(err);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h3',
          null,
          'Demo:'
        ),
        React.createElement('input', { type: 'text', value: this.state.input,
          onChange: this.handleChange,
          placeholder: 'Enter date string...'
        }),
        React.createElement(
          'button',
          { onClick: this.handleClick },
          'Get Timestamp'
        ),
        React.createElement(
          'p',
          null,
          React.createElement(
            'code',
            null,
            this.state.timestamp
          )
        )
      );
    }
  }]);

  return TimestampDisplay;
}(React.Component);

ReactDOM.render(React.createElement(TimestampDisplay, null), document.getElementById('timestamp-display'));