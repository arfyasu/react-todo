import React, {Component, PropTypes} from "react";
import {Motion, spring} from "react-motion";
import ActiveTaskItem from "./ActiveTaskItem";
import findIndex from "lodash/findIndex";

const springConfig = {stiffness: 120, damping: 30};
//function reinsert(arr, from, to) {
//  const _arr = arr.slice(0);
//  const val = _arr[from];
//  _arr.splice(from, 1);
//  _arr.splice(to, 0, val);
//  return _arr;
//}
//
function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}

class ActiveTaskList extends Component {
  constructor(prop) {
    super(prop);
    // state
    this.state = {
      isDragging: false,
      lastDragged: 0,
      mouse: 0,
      delta: 0
    };
    // bind
    this.throwUpdateTask = this.throwUpdateTask.bind(this);
    this.throwFinishTask = this.throwFinishTask.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  throwUpdateTask(form) {
    this.props.updateTask(form);
  }
  throwFinishTask(form) {
    this.props.finishTask(form);
  }

  componentDidMount() {
    window.addEventListener("touchmove", this.handleTouchMove);
    window.addEventListener("touchend", this.handleMouseUp);
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
  }

  handleTouchMove(e) {
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  }

  handleMouseUp() {
    this.setState({isDragging: false, delta: 0});
  }

  handleMouseMove({pageY}) {
    const {isDragging, delta, lastDragged} = this.state;
    const tasks = this.props.tasks;
    if (isDragging) {
      const mouse = pageY - delta;
      const row = clamp(Math.round(mouse / 40), 0, tasks.length - 1);
      this.setState({mouse: mouse});
      this.props.moveTask(this.findTaskIndexById(lastDragged), row);
    }
  }

  handleTouchStart(taskId, posY, e) {
    this.handleMouseDown(taskId, posY, e.touches[0]);
  }

  handleMouseDown(taskId, posY, {pageY}) {
    this.setState({
      isDragging: true,
      lastDragged: taskId,
      mouse: posY,
      delta: pageY - posY
    });
    console.log(posY);
  }

  findTaskIndexById(id) {
    return findIndex(this.props.tasks, {id});
  }

  /**
   * 未完了のタスクリストを返す
   * @returns {*}
   */
  buildTaskList() {
    const {isDragging, lastDragged, mouse} = this.state;

    return this.props.tasks.map(task => {
      const i = this.findTaskIndexById(task.id);
      const style = (lastDragged === task.id && isDragging)
        ? {
          scale: spring(1.1, springConfig),
          y: mouse
        }
        : {
          scale: spring(1, springConfig),
          y: spring(i * 10, springConfig)
        };
      return (
        <Motion style={style} key={task.id}>
          {interpolatingStyle =>
            <ActiveTaskItem task={task}
              finishTask={this.throwFinishTask}
              updateTask={this.throwUpdateTask}
              mouseDown={this.handleMouseDown}
              touchStart={this.handleTouchStart}
              motionStyle={interpolatingStyle}/>
          }
        </Motion>
      );
    });
  }

  render() {
    return (
      <ul className="todo-list">
        {this.buildTaskList()}
      </ul>
    );
  }
}


ActiveTaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  updateTask: PropTypes.func.isRequired,
  finishTask: PropTypes.func.isRequired,
  moveTask: PropTypes.func.isRequired
};

export default ActiveTaskList;
