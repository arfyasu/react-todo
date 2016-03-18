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
    this.findTask = this.findTask.bind(this);
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

  findTask(id) {
    const {tasks} = this.state;
    const task = tasks.filter(task => task.id === id)[0];
    return {
      task,
      index: tasks.indexOf(task)
    };
  }

  moveTask(id, toIndex) {
    const {tasks} = this.state;
    let { task, index } = this.findTask(id);
    tasks.splice(index, 1);
    tasks.splice(toIndex, 0, task);
    this.setState({tasks});
  }


  render() {
    return (
      <div>
        <h2>TODO List</h2>
        <ActiveTaskList tasks={this.state.tasks} finishTask={this.finishTask} updateTask={this.updateTask}
                        findTask={this.findTask} moveTask={this.moveTask}/>

        <ul className="todo-list">
          <li className="todo-list__item--new"><NewTask addTask={this.createTask}/></li>
        </ul>

        <h2>Finished tasks</h2>
        <FinishedTaskList tasks={this.state.finishedTasks} undoTask={this.undoTask}/>
      </div>
    );
  }
}

export default TaskList;
