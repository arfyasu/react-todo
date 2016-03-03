// CSSを取り込む
require('../stylesheets/app');

import React from "react";
import ReactDOM from "react-dom";


var TaskList = React.createClass({
  getInitialState() {
    return {
      tasks: [],
      finishedTasks: [],
      nextId: 1
    };
  },
  createTask(form) {
    var newTask = {id: this.state.nextId, name: form.name, finished: false};
    this.setState({
      tasks: this.state.tasks.concat([newTask]),
      nextId: this.state.nextId + 1
    });
  },
  updateTask(form) {
    this.setState({
      tasks: this.state.tasks.map (task => {
        if (task.id === form.id) {
          task.name = form.name;
        }
        return task;
      })
    });
  },
  finishTask(id) {
    var finishedTask;
    var tasks = [];
    this.state.tasks.forEach(task => {
      if (task.id === id) {
        task.finished = true;
        finishedTask = task;
      } else {
        tasks.push(task);
      }
    });
    this.setState({
      tasks: tasks,
      finishedTasks: [finishedTask].concat(this.state.finishedTasks)
    });
  },
  undoTask(id) {
    var undoTask;
    var finishedTasks = [];
    this.state.finishedTasks.forEach(task => {
      if (task.id === id) {
        task.finished = false;
        undoTask = task;
      } else {
        finishedTasks.push(task);
      }
    });
    this.setState({
      tasks: this.state.tasks.concat([undoTask]),
      finishedTasks: finishedTasks
    });
  },
  render() {
    var tasks = this.state.tasks.map(task => {
      return <li key={task.id}><Task task={task} finishTask={this.finishTask} updateTask={this.updateTask} /></li>;
    });
    var finishedTasks = this.state.finishedTasks.map(task => {
      return <li key={task.id}><Task task={task} undoTask={this.undoTask} updateTask={this.updateTask} /></li>;
    });
    return (
      <div>
        <h2>TODO List</h2>
        <ul>
          {tasks}
        </ul>
        <p>
          <NewTask addTask={this.createTask} />
        </p>

        <h2>Finished tasks</h2>
        <ul>
          {finishedTasks}
        </ul>
      </div>
    );
  }
});

var Task = React.createClass({
  propTypes: {
    task: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      finished: React.PropTypes.bool.isRequired
    }),
    //finishTask: React.PropTypes.func.isRequired,
    updateTask: React.PropTypes.func.isRequired
  },
  getInitialState() {
    return {
      edit: false
    }
  },
  updateTask(form) {
    this.props.updateTask(form);
    this.setState({
      edit: false
    });
  },
  cancelEdit() {
    this.setState({edit: false});
  },
  handleClickFinishCheckBox() {
    this.props.finishTask(this.props.task.id);
  },
  handleDoubleClickTaskName() {
    this.setState({edit: true});
  },
  handleClickUndoCheckBox() {
    this.props.undoTask(this.props.task.id);
  },
  render() {
    return (
      <table>
        {(() => {
          if (this.state.edit) {
            return <TaskForm submit={this.updateTask} cancel={this.cancelEdit} task={this.props.task} />
          } else {
            if (this.props.task.finished) {
              return (
                <tr>
                  <td><input type="checkbox" onClick={this.handleClickUndoCheckBox} /></td>
                  <td><s>{this.props.task.name}</s></td>
                </tr>
              );
            } else {
              return (
                <tr>
                  <td><input type="checkbox" onClick={this.handleClickFinishCheckBox} /></td>
                  <td>
                    <label onDoubleClick={this.handleDoubleClickTaskName}>
                      {this.props.task.name}
                    </label>
                  </td>
                </tr>
              );
            }
          }
        })()}
      </table>
    );
  }
});

var NewTask = React.createClass({
  propTypes: {
    addTask: React.PropTypes.func.isRequired
  },
  getInitialState() {
    return {
      edit: false
    }
  },
  init() {
    this.setState({edit: false})
  },
  cancelEdit() {
    this.init();
  },
  addTask(form) {
    this.props.addTask(form);
    this.init();
  },
  handleClickAddTaskLink() {
    this.setState({edit: true})
  },
  render() {
    return (
      <table>
        {(this.state.edit)
          ? <TaskForm submit={this.addTask} cancel={this.cancelEdit} task={{id: null, name: ""}} />
          : <tr><td><a href="#" onClick={this.handleClickAddTaskLink}>Add task</a></td></tr>}
      </table>
    );
  }
});



var TaskForm = React.createClass({
  propTypes: {
    submit: React.PropTypes.func.isRequired,
    cancel: React.PropTypes.func.isRequired
  },
  getInitialState() {
    return {
      name: this.props.task.name
    }
  },
  handleClickCancelLink() {
    this.props.cancel();
  },
  handleClickSubmitButton() {
    var name = this.state.name;
    if (name.length > 0) {
      this.props.submit({id: this.props.task.id, name: name});
    }
  },
  handleChangeTaskNameText(e) {
    this.setState({
      name: e.target.value}
    );
  },
  render() {
    return (
      <tr>
        <td>
          <form>
            <table>
              <tr>
                <td><input type="text" value={this.state.name} className="col-xs-4" onChange={this.handleChangeTaskNameText} /></td>
              </tr>
              <tr>
                <td>
                  <button className="primary" bsSize="small" onClick={this.handleClickSubmitButton}>{(this.props.task.id) ? "Save" : "Add task"}</button>
                  <a href="#" onClick={this.handleClickCancelLink}>Cancel</a>
                </td>
              </tr>
            </table>
          </form>
        </td>
      </tr>
    );
  }
});

ReactDOM.render(<TaskList />, document.getElementById('container'));