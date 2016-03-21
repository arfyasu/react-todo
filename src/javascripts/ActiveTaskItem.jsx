import React, {Component, PropTypes} from "react";
import TaskForm from "./TaskForm";
import {DragSource, DropTarget} from "react-dnd";
import flow from "lodash/flow";

/**
 * Implements the drag source contract.
 */
const taskSource = {
  beginDrag(props) {
    return {
      id: props.task.id,
      originalIndex: props.findTask(props.task.id).index
    };
  },

  endDrag(props, monitor) {
    const { id, originalIndex } = monitor.getItem();
    if (!monitor.didDrop()) {
      // 元に戻す
      props.moveTask(id, originalIndex);
    }
  }
};

/**
 * Specifies the props to inject into your component.
 */
function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const taskTarget = {
  canDrop() {
    return false;
  },

  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const overId = props.task.id;

    if (draggedId !== overId) {
      const { index } = props.findTask(overId);
      props.moveTask(draggedId, index);
    }
  }
};

function collectTarget(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}


class ActiveTaskItem extends Component {
  constructor(prop) {
    super(prop);
    // bind
    this.updateTask = this.updateTask.bind(this);
    this.handleClickFinishCheckBox = this.handleClickFinishCheckBox.bind(this);
    this.handleDoubleClickTaskName = this.handleDoubleClickTaskName.bind(this);
  }

  updateTask(form) {
    this.props.updateTask(form);
  }

  handleClickFinishCheckBox() {
    this.props.finishTask(this.props.task.id);
  }

  handleDoubleClickTaskName() {
    this.props.editTask(this.props.task.id);
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
    const { connectDragSource, isDragging, connectDropTarget} = this.props;
    const opacity = isDragging ? 0 : 1;
    return connectDragSource(connectDropTarget(
      <li className="todo-list__item" style={{opacity}}>
        {(this.props.editing)
          ? <TaskForm submit={this.updateTask} cancel={this.props.cancelEdit} task={this.props.task}/>
          : this.buildTask()
        }
      </li>
    ));
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
  findTask: PropTypes.func.isRequired,
  moveTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired
};


export default flow(
  DragSource("task", taskSource, collectSource),
  DropTarget("task", taskTarget, collectTarget)
)(ActiveTaskItem);
