import React, { Component } from 'react';
import './App.css';
import App, { deleteTodo } from './Exercise7-SeparateTableComponent.js';

class TodoTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="App">
      <table>
        <thead>
          <tr>
            <td className="Date-column">Date</td>
            <td className="Description-column">Description</td>
            <td className="Delete-column"></td>
          </tr>
        </thead>
        <tbody>
        {this.props.todos.map((item, index) =>
          <tr key={index}>
            <td>{item.date}</td>
            <td>{item.description}</td>
            <td><button id={index} onClick={this.props.deleteTodo} >Delete</button></td>
          </tr>
        )}
        </tbody>
      </table>
      </div>
    )
  }
}

export default TodoTable;
