import React, {Component} from "react";
import TaskItem from "./TaskItem";
import NewTask from "./NewTask";
import FinishedTaskList from "./FinishedTaskList";

class TaskList extends Component {
  constructor(prop) {
    super(prop);
    // state
    this.state = {
      tasks: [],
      finishedTasks: [],
      nextId: 1,
      isDragging: false
    };
    // bind
    this.createTask = this.createTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.finishTask = this.finishTask.bind(this);
    this.undoTask = this.undoTask.bind(this);
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

  /**
   * 未完了のタスクリストを返す
   * @param tasks
   * @returns {*}
   */
  buildTaskList(tasks) {
    return tasks.map(task => {
      return (
        <TaskItem
          key={task.id} task={task}
          finishTask={this.finishTask}
          updateTask={this.updateTask}/>
      );
    });
  }

  handleMouseDown() {
    this.setState({
      isDragging: true
    });
    console.log(this.state.isDragging);
  }

  render() {
    return (
      <div>
        <h2>TODO List</h2>
        <ul className="todo-list">
          {this.buildTaskList(this.state.tasks)}
          <li className="todo-list__item--new"><NewTask addTask={this.createTask}/></li>
        </ul>

        <h2>Finished tasks</h2>
        <FinishedTaskList tasks={this.state.finishedTasks} undoTask={this.undoTask}/>
      </div>
    );
  }
}

export default TaskList;
