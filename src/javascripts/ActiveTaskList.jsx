import React, {Component, PropTypes} from "react";
import ActiveTaskItem from "./ActiveTaskItem";

class ActiveTaskList extends Component {
  constructor(prop) {
    super(prop);
    // state
    this.state = {
      isDragging: false
    };
    // bind
    this.throwUpdateTask = this.throwUpdateTask.bind(this);
    this.throwFinishTask = this.throwFinishTask.bind(this);
  }

  throwUpdateTask(form) {
    this.props.updateTask(form);
  }
  throwFinishTask(form) {
    this.props.finishTask(form);
  }

  /**
   * 未完了のタスクリストを返す
   * @returns {*}
   */
  buildTaskList() {
    return this.props.tasks.map(task => {
      return (
        <ActiveTaskItem
          key={task.id} task={task}
          finishTask={this.throwFinishTask}
          updateTask={this.throwUpdateTask}/>
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
      <ul className="todo-list">
        {this.buildTaskList()}
      </ul>
    );
  }
}


ActiveTaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  updateTask: PropTypes.func.isRequired,
  finishTask: PropTypes.func.isRequired
};

export default ActiveTaskList;
