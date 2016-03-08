import React, {Component, PropTypes} from "react";
import TaskForm from "./TaskForm";

class NewTask extends Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      edit: false
    };
    // bind
    this.cancelEdit = this.cancelEdit.bind(this);
    this.addTask = this.addTask.bind(this);
    this.handleClickAddTaskLink = this.handleClickAddTaskLink.bind(this);
  }

  cancelEdit() {
    this.setState({
      edit: false
    });
  }

  addTask(form) {
    this.props.addTask(form);
    this.cancelEdit();
  }

  handleClickAddTaskLink() {
    this.setState({
      edit: true
    });
  }

  render() {
    return (
      <div>
        {(this.state.edit)
          ? <TaskForm submit={this.addTask} cancel={this.cancelEdit} task={{id: null, name: ""}}/>
          : <button type="button" className="btn btn-link" onClick={this.handleClickAddTaskLink}>Add task</button>
        }
      </div>
    );
  }
}

NewTask.propTypes = {
  addTask: PropTypes.func.isRequired
};

export default NewTask;