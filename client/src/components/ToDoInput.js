import React, {Component} from 'react';

class ToDoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      inputValue: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addTodo(this.state.inputValue);
    this.setState({
      inputValue: ''
    });
  };

  render() {
    const styles = {
      width: '80%',
      height: '60px',
      background: 'none',
      margin: '1em auto 2em',
      border: 'none',
      borderBottom: '1px solid #34495e',
      outline: 'none',
      font: '300 28px \'Ubuntu\', sans-serif',
      color: '#34495e'
    };

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          style={styles}
          type='text'
          value={this.state.inputValue}
          onChange={this.handleChange}
          placeholder="Insert your task here..."
          required
        />
      </form>
    )
  }
}

export default ToDoInput;
