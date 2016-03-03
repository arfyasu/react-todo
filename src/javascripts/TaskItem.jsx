import React from "react";
import TaskForm from "./TaskForm";

class TaskItem extends React.Component {
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
    return (
      <table>
        <tbody>
        {(() => {
          if (this.state.edit) {
            return <TaskForm submit={this.updateTask} cancel={this.cancelEdit} task={this.props.task} />;
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
        </tbody>
      </table>
    );
  }
}

TaskItem.propTypes = {
  task: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    finished: React.PropTypes.bool.isRequired
  }),
  //finishTask: React.PropTypes.func.isRequired,
  updateTask: React.PropTypes.func.isRequired
};

export default TaskItem;
