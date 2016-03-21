import React, {Component, PropTypes} from "react";
import TaskForm from "./TaskForm";

class NewTask extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {(this.props.editing)
          ? <TaskForm submit={this.props.addTask} cancel={this.props.cancelEdit} task={{id: null, name: ""}}/>
          : <button type="button" className="btn btn-link" onClick={this.props.editTask.bind(null, 0)}>Add task</button>
        }
      </div>
    );
  }
}

NewTask.propTypes = {
  addTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired
};

export default NewTask;