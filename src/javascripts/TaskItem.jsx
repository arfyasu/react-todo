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

  render() {
    var deadline = (this.props.task.deadline) ? this.props.task.deadline.format("YYYY/MM/DD") : "";
    return (
      <div>
        {(() => {
          if (this.state.edit) {
            return (
              <TaskForm submit={this.updateTask} cancel={this.cancelEdit} task={this.props.task}/>
            );
          } else {
            if (this.props.task.finished) {
              return (
                <p>
                  <input type="checkbox" onClick={this.handleClickUndoCheckBox}/>
                  <s className="todo-list__tasks-item-text">{this.props.task.name}</s>
                  <span className="pull-right">
                    {deadline}
                  </span>
                </p>
              );
            } else {
              return (
                <p>
                  <input type="checkbox" onClick={this.handleClickFinishCheckBox}/>
                  <label onDoubleClick={this.handleDoubleClickTaskName} className="todo-list__tasks-item-text">
                    {this.props.task.name}
                  </label>
                  <span className="pull-right">
                    {deadline}
                  </span>
                </p>
              );
            }
          }
        })()}
      </div>
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
