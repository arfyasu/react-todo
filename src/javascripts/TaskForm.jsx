import React, {Component, PropTypes} from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    // bind
    this.handleClickSubmitButton = this.handleClickSubmitButton.bind(this);
    this.handleChangeTaskNameText = this.handleChangeTaskNameText.bind(this);
    this.handleChangeDeadLine = this.handleChangeDeadLine.bind(this);
  }

  componentWillMount() {
    const {name, deadline} = this.props.task;
    this.setState({name,
      deadline: deadline ? moment(deadline, "YYYY/MM/DD") : moment()
    });
  }

  handleClickSubmitButton() {
    const {name, deadline}  = this.state;
    if (name.length > 0) {
      this.props.submit({
        id: this.props.task.id,
        name,
        deadline: deadline ? deadline.format("YYYY/MM/DD") : ""
      });
    }
  }

  handleChangeTaskNameText(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleChangeDeadLine(date) {
    this.setState({
      deadline: date
    });
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="form-group">
          <div className="col-xs-8">
            <input type="text" className="form-control" value={this.state.name} onChange={this.handleChangeTaskNameText}/>
          </div>
          <div className="col-xs-4">
            <DatePicker selected={this.state.deadline} onChange={this.handleChangeDeadLine} className="form-control"/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-12">
            <button type="button" className="btn btn-default" onClick={this.handleClickSubmitButton}>
              {(this.props.task.id) ? "Save" : "Add task"}
            </button>
            <button type="button" className="btn btn-link" onClick={this.props.cancel}>Cancel</button>
          </div>
        </div>
      </form>
    );
  }
}

TaskForm.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    deadline: PropTypes.string
  }),
  submit: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
};

export default TaskForm;