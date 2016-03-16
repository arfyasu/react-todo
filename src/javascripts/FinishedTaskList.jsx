import React, {Component, PropTypes} from "react";
import FinishedTaskItem from "./FinishedTaskItem";

class FinishedTaskList extends Component {
  constructor(prop) {
    super(prop);
    // bind
    this.throwUndoTask = this.throwUndoTask.bind(this);
  }

  throwUndoTask(id) {
    this.props.undoTask(id);
  }

  /**
   * 完了タスクリストを返す
   * @returns {*}
   */
  buildFinishedTaskList() {
    return this.props.tasks.map(task => {
      return <FinishedTaskItem key={task.id} task={task} undoTask={this.throwUndoTask}/>;
    });
  }

  render() {
    return (
      <ul className="todo-list">
        {this.buildFinishedTaskList()}
      </ul>
    );
  }
}

FinishedTaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  undoTask: PropTypes.func.isRequired
};

export default FinishedTaskList;
