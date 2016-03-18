import React, {Component} from "react";
import ActiveTaskList from "./ActiveTaskList";
import FinishedTaskList from "./FinishedTaskList";
import NewTask from "./NewTask";

class TaskList extends Component {
  constructor(prop) {
    super(prop);
    // state
    this.state = {
      tasks: [],
      finishedTasks: [],
      nextId: 1
    };
    // bind
    this.createTask = this.createTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.finishTask = this.finishTask.bind(this);
    this.undoTask = this.undoTask.bind(this);
    this.moveTask = this.moveTask.bind(this);
  }

  createTask(form) {
    var newTask = {
      id: this.state.nextId,
      name: form.name,
      deadline: form.deadline,
      finished: false
    };
    this.setState({
      tasks: this.state.tasks.concat([newTask]),
      nextId: this.state.nextId + 1
    });
  }

  updateTask(form) {
    this.setState({
      tasks: this.state.tasks.map(task => {
        if (task.id === form.id) {
          task.name = form.name;
          task.deadline = form.deadline;
        }
        return task;
      })
    });
  }

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
  }

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
  }

  //function reinsert(arr, from, to) {
//  const _arr = arr.slice(0);
//  const val = _arr[from];
//  _arr.splice(from, 1);
//  _arr.splice(to, 0, val);
//  return _arr;
//}
  moveTask(from, to) {
    let tasks = this.state.tasks;
    //const tmp = tasks[to];
    //tasks[to] = tasks[from];
    //tasks[from] = tmp;
    const val = tasks[from];
    tasks.splice(from, 1);
    tasks.splice(to, 0, val);
    this.setState({tasks: tasks});
  }

  render() {
    return (
      <div>
        <h2>TODO List</h2>
        <div className="todo">
          <ActiveTaskList tasks={this.state.tasks} finishTask={this.finishTask} updateTask={this.updateTask} moveTask={this.moveTask}/>
        </div>

        <div className="todo">
          <ul className="todo-new">
            <li className="todo-new__item"><NewTask addTask={this.createTask}/></li>
          </ul>
        </div>

        <h2>Finished tasks</h2>
        <div className="todo">
          <FinishedTaskList tasks={this.state.finishedTasks} undoTask={this.undoTask}/>
        </div>
      </div>
    );
  }
}

export default TaskList;
