import React, {Component, PropTypes} from "react";
import {DragDropContext, DropTarget} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import flow from "lodash/flow";
import ActiveTaskItem from "./ActiveTaskItem";

class ActiveTaskList extends Component {
  constructor(prop) {
    super(prop);
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
          finishTask={this.props.finishTask}
          updateTask={this.props.updateTask}
          findTask={this.props.findTask}
          moveTask={this.props.moveTask}
          cancelEdit={this.props.cancelEdit}
          editTask={this.props.editTask}
          editing={this.props.editingTaskId === task.id}/>
      );
    });
  }

  render() {
    const { connectDropTarget } = this.props;
    return connectDropTarget(
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
  findTask: PropTypes.func.isRequired,
  moveTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  editingTaskId: PropTypes.number.isRequired,
  // Injected by React DnD:
  connectDropTarget: PropTypes.func.isRequired
};


const taskTarget = {
  drop() {
  }
};
function collectTarget(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

export default  flow(
  DropTarget("task", taskTarget, collectTarget),
  DragDropContext(HTML5Backend)
)(ActiveTaskList);
