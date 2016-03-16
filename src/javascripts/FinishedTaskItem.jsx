import React, {Component, PropTypes} from "react";

class FinishedTaskItem extends Component {
  constructor(prop) {
    super(prop);
    // bind
    this.handleClickCheckBox = this.handleClickCheckBox.bind(this);
  }

  handleClickCheckBox() {
    this.props.undoTask(this.props.task.id);
  }

  getDeadLine() {
    return (this.props.task.deadline) ? this.props.task.deadline.format("YYYY/MM/DD") : "";
  }

  render() {
    return (
      <li className="todo-list__item todo-list__item--completed">
        <p>
          <input type="checkbox" onClick={this.handleClickCheckBox}/>
          <label className="todo-list__item-text todo-list__item-text--completed">{this.props.task.name}</label>
          <span className="pull-right todo-list__item-text--completed">{this.getDeadLine()}</span>
        </p>
      </li>
    );
  }
}

FinishedTaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    deadline: PropTypes.object,
    finished: PropTypes.bool.isRequired
  }),
  undoTask: PropTypes.func.isRequired
};

export default FinishedTaskItem;
