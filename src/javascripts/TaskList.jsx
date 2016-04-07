import React, {Component} from "react";
import ActiveTaskList from "./ActiveTaskList";
import FinishedTaskList from "./FinishedTaskList";
import NewTask from "./NewTask";

class TaskList extends Component {
  constructor(prop) {
    super(prop);
    // state
    this.state = {
      editingTaskId: -1
    };
    // bind
    this.createTask = this.createTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.finishTask = this.finishTask.bind(this);
    this.undoTask = this.undoTask.bind(this);
    this.findTask = this.findTask.bind(this);
    this.moveTask = this.moveTask.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.editTask = this.editTask.bind(this);
  }

  componentWillMount() {
    const tasks = this.loadTasks("tasks");
    const finishedTasks = this.loadTasks("finishedTasks");
    let nextId = 0;
    tasks.concat(finishedTasks).forEach(task => {
      if (task.id > nextId) {
        nextId = task.id;
      }
    });
    nextId++;
    this.setState({tasks, finishedTasks, nextId});
  }

  loadTasks(key) {
    //return [];
    try {
      const tasks = localStorage.getItem(key);
      return (!tasks || tasks === "undefined") ? [] : JSON.parse(tasks);
    } catch (e) {
      return [];
    }
  }


  createTask(form) {
    var newTask = {
      id: this.state.nextId,
      name: form.name,
      deadline: form.deadline,
      finished: false
    };
    this.saveTasks(this.state.tasks.concat([newTask]));
    this.setState({nextId: this.state.nextId + 1});
    this.cancelEdit();
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
    this.cancelEdit();
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
    this.saveTasks(tasks);
    this.saveFinishedTasks([finishedTask].concat(this.state.finishedTasks));
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
    this.saveTasks(this.state.tasks.concat([undoTask]));
    this.saveFinishedTasks(finishedTasks);
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
    this.saveTasks(tasks);
  }

  saveTasks(tasks) {
    this.setState({tasks});
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  saveFinishedTasks(finishedTasks) {
    this.setState({finishedTasks});
    localStorage.setItem("finishedTasks", JSON.stringify(finishedTasks));
  }

  cancelEdit() {
    this.setState({editingTaskId: -1});
  }

  editTask(id) {
    this.setState({editingTaskId: id});
  }


  render() {
    const {tasks, finishedTasks, editingTaskId} = this.state;
    return (
      <div>
        <h2>TODO List({tasks.length})</h2>
        <ActiveTaskList tasks={tasks} finishTask={this.finishTask} updateTask={this.updateTask}
                        findTask={this.findTask} moveTask={this.moveTask} cancelEdit={this.cancelEdit}
                        editTask={this.editTask} editingTaskId={editingTaskId}/>

        <ul className="todo-list">
          <li className="todo-list__item--new">
            <NewTask addTask={this.createTask} cancelEdit={this.cancelEdit}
                     editTask={this.editTask} editing={editingTaskId === 0}/>
          </li>
        </ul>

        <h2>Finished tasks</h2>
        <FinishedTaskList tasks={finishedTasks} undoTask={this.undoTask}/>
      </div>
    );
  }
}

export default TaskList;
