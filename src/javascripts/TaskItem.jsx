import React, {Component, PropTypes} from "react";
import ClassNames from "classnames";
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
    this.handleClickUndoCheckBox = this.handleClickUndoCheckBox.bind(this);
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

  handleClickUndoCheckBox() {
    this.props.undoTask(this.props.task.id);
  }

  buildCompleteTask() {
    return (
      <p>
        <input type="checkbox" onClick={this.handleClickUndoCheckBox}/>
        <label className="todo-list__item-text todo-list__item-text--completed">{this.props.task.name}</label>
        <span className="pull-right todo-list__item-text--completed">{this.getDeadLine()}</span>
      </p>
    );
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
    var liClass = ClassNames({
      "todo-list__item": true,
      "todo-list__item--completed": this.props.task.finished
    });
    return (
      <li className={liClass}>
        {(this.state.edit)
          ? <TaskForm submit={this.updateTask} cancel={this.cancelEdit} task={this.props.task}/>
          :(this.props.task.finished) ? this.buildCompleteTask() : this.buildTask()
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
  undoTask: PropTypes.func
};

export default TaskItem;
