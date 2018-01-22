import React, { Component } from 'react';
import logo from './logo.svg';
import './Exercise5-6.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {description: '', date: '', todos: []}
  }

  inputChanged = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  addTodo = (event) => {
    event.preventDefault();
    const newTodo = {description: this.state.description, date: this.state.date};
    this.setState({
      //add the new todo to the current todos array
      todos: [...this.state.todos, newTodo],
      description: '',
      date: '',
    });
  }

  deleteTodo = (event) => {
    let newTodos = this.state.todos.filter((todo, i) => i!== +event.target.id);
    this.setState({
      todos: newTodos
    });
  }

  render() {
    const itemRows = this.state.todos.map((item, index) =>
      <tr key={index}>
        <td>{item.date}</td>
        <td>{item.description}</td>
        <td><button id={index} onClick={this.deleteTodo} >Delete</button></td>
      </tr>
    )
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo2" alt="logo" />
          <img src={logo} className="App-logo" alt="logo" />
          <img src={logo} className="App-logo2" alt="logo" />
          <h1 className="App-title">React TodoList</h1>
        </header>
        <form onSubmit={this.addTodo}>
          <p className="Form-header">Add todo:</p>
          Description: <input type="text" name="description"
            onChange={this.inputChanged} value={this.state.description}/>
          Date: <input type="Date" name="date"
            onChange={this.inputChanged} value={this.state.date}/>
          <input type="submit" value="Add"/>
        </form>
        <table>
          <thead>
            <tr>
              <td className="Date-column">Date</td>
              <td className="Description-column">Description</td>
              <td className="Delete-column"></td>
            </tr>
          </thead>
          <tbody>
            {itemRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
