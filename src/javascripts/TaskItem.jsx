import React, {Component, PropTypes} from "react";
import TaskForm from "./TaskForm";

class TaskItem extends Component {
  constructor(prop) {
    super(prop);
    // state
    this.state = {
      edit: false
    };
    // bind
    this.updateTask = this.updateTask.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.handleClickFinishCheckBox = this.handleClickFinishCheckBox.bind(this);
    this.handleDoubleClickTaskName = this.handleDoubleClickTaskName.bind(this);
  }

  updateTask(form) {
    this.props.updateTask(form);
    this.setState({
      edit: false
    });
  }

  cancelEdit() {
    this.setState({edit: false});
  }

  handleClickFinishCheckBox() {
    this.props.finishTask(this.props.task.id);
  }

  handleDoubleClickTaskName() {
    this.setState({edit: true});
  }

  buildTask() {
    return (
      <p>
        <input type="checkbox" onClick={this.handleClickFinishCheckBox}/>
        <label onDoubleClick={this.handleDoubleClickTaskName} className="todo-list__item-text">
          {this.props.task.name}
        </label>
        <span className="pull-right">{this.getDeadLine()}</span>
      </p>
    );
  }

  getDeadLine() {
    return (this.props.task.deadline) ? this.props.task.deadline.format("YYYY/MM/DD") : "";
  }

  render() {
    return (
      <li className="todo-list__item">
        {(this.state.edit)
          ? <TaskForm submit={this.updateTask} cancel={this.cancelEdit} task={this.props.task}/>
          : this.buildTask()
        }
      </li>
    );
  }
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    deadline: PropTypes.object,
    finished: PropTypes.bool.isRequired
  }),
  updateTask: PropTypes.func.isRequired,
  finishTask: PropTypes.func,
  onMouseDown: PropTypes.func
};

export default TaskItem;
