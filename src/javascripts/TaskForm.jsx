import React from "react";

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      name: this.props.task.name
    };
    // bind
    this.handleClickCancelLink = this.handleClickCancelLink.bind(this);
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this);
    this.handleChangeTaskNameText = this.handleChangeTaskNameText.bind(this);
  }

  handleClickCancelLink() {
    this.props.cancel();
  }

  handleClickSubmitButton() {
    var name = this.state.name;
    if (name.length > 0) {
      this.props.submit({id: this.props.task.id, name: name});
    }
  }

  handleChangeTaskNameText(e) {
    this.setState({
        name: e.target.value
      }
    );
  }

  render() {
    return (
      <table>
        <tbody>
        <tr>
          <td>
            <input type="text" value={this.state.name} className="col-xs-4" onChange={this.handleChangeTaskNameText}/>
          </td>
        </tr>
        <tr>
          <td>
            <button className="primary" bsSize="small" onClick={this.handleClickSubmitButton}>{(this.props.task.id) ? "Save" : "Add task"}</button>
            <a href="#" onClick={this.handleClickCancelLink}>Cancel</a>
          </td>
        </tr>
        </tbody>
      </table>
    );
  }
}

TaskForm.propTypes = {
  submit: React.PropTypes.func.isRequired,
  cancel: React.PropTypes.func.isRequired
};

export default TaskForm;