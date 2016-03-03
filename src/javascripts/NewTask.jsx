import React from "react";
import TaskForm from "./TaskForm";

class NewTask extends React.Component {
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

  init() {
    this.setState({edit: false})
  }

  cancelEdit() {
    this.init();
  }

  addTask(form) {
    this.props.addTask(form);
    this.init();
  }

  handleClickAddTaskLink() {
    this.setState({edit: true})
  }

  render() {
    return (
      <div>
        {(this.state.edit)
          ? <TaskForm submit={this.addTask} cancel={this.cancelEdit} task={{id: null, name: ""}}/>
          : <a href="#" onClick={this.handleClickAddTaskLink}>Add task</a>
        }
      </div>
    );
  }
}

NewTask.propTypes = {
  addTask: React.PropTypes.func.isRequired
};

export default NewTask;