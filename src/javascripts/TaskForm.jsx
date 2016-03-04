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
    });
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="form-group">
          <div className="col-xs-12">
            <input type="text" className="form-control" value={this.state.name}
                   onChange={this.handleChangeTaskNameText}/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-12">
            <button type="button" className="btn btn-default"
                    onClick={this.handleClickSubmitButton}>{(this.props.task.id) ? "Save" : "Add task"}</button>
            <button type="button" className="btn btn-link" onClick={this.handleClickCancelLink}>Cancel</button>
          </div>
        </div>
      </form>
    );
  }
}

TaskForm.propTypes = {
  task: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired
  }),
  submit: React.PropTypes.func.isRequired,
  cancel: React.PropTypes.func.isRequired
};

export default TaskForm;