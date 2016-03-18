import React, {Component, PropTypes} from "react";
import TaskForm from "./TaskForm";

class ActiveTaskItem extends Component {
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
    const id = this.props.task.id;
    const {scale, y} = this.props.motionStyle;
    const style = {
      transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
      WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`
      //zIndex: i === lastPressed ? 99 : i,
    };
    return (
      <li className="todo-list__item" style={style}
          onMouseDown={this.props.mouseDown.bind(null, id, y)}
          onTouchStart={this.props.touchStart.bind(null, id, y)}>
        {(this.state.edit)
          ? <TaskForm submit={this.updateTask} cancel={this.cancelEdit} task={this.props.task}/>
          : this.buildTask()
        }
      </li>
    );
  }
}

ActiveTaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    deadline: PropTypes.object,
    finished: PropTypes.bool.isRequired
  }),
  updateTask: PropTypes.func.isRequired,
  finishTask: PropTypes.func.isRequired,
  mouseDown: PropTypes.func.isRequired,
  touchStart: PropTypes.func.isRequired,
  motionStyle: PropTypes.object.isRequired
};

export default ActiveTaskItem;
