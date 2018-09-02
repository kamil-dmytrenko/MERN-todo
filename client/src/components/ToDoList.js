import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import ToDoInput from './ToDoInput';
import ToDoItem from './ToDoItem';
import '../styles/ToDoList.css';

const API = '/api';

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
    this.loadTodos = this.loadTodos.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  async componentWillMount() {
    await this.loadTodos()
  }

  async loadTodos() {
    try {
      const response = await fetch(API);
      const todos = await response.json();
      this.setState({ todos: todos });
    } catch (e) {
      console.log(e)
    }
  }

  async addTodo(inputValue) {
    try {
      const response = await fetch(API, {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({name:inputValue})
      });
      const todo = await response.json();
      this.setState({ todos: [...this.state.todos, todo] });
    } catch (e) {
      console.log(e)
    }
  }

  async deleteTodo(id) {
    try {
      await fetch(`${API}/${id}`, {
        method: 'delete'
      });
      const todos = this.state.todos.filter(todo => todo._id !== id);
      this.setState({ todos: todos });
    } catch (e) {
      console.log(e)
    }
  }

  async updateTodo(todo) {
    try {
      const response = await fetch(`${API}/${todo._id}`, {
        method: 'put',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({completed: !todo.completed})
      });
      const updatedTodo = await response.json();
      const todos = this.state.todos.map(todo =>
        (todo._id === updatedTodo._id) ? {...todo, completed: !todo.completed} : todo
      );
      this.setState({ todos: todos });
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const todos = this.state.todos.map((el) => (
      <ToDoItem
        {...el}
        key={el._id}
        onDelete={this.deleteTodo.bind(this, el._id)}
        onToggle={this.updateTodo.bind(this, el)}
      />
    ));
    return (
      <div>
        <Paper className='Paper' elevation={10}>
          <header>
            <h1>todo<span>list</span></h1>
          </header>
          <ToDoInput addTodo={this.addTodo}/>
          <ul>
            {todos}
          </ul>
        </Paper>
      </div>
    )
  }
}

export default ToDoList;
