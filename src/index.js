var TaskList = React.createClass({
  getInitialState() {
    return {
      tasks: [],
      nextId: 1
    };
  },
  addTask(taskName) {
    var newTask = {id: this.state.nextId, name: taskName};
    this.setState({
      tasks: this.state.tasks.concat([newTask]),
      nextId: this.state.nextId + 1
    });
  },
  editTask(id) {
    // TODO
  },
  finishTask(id) {
    // todo
  },
  render() {
    var tasks = this.state.tasks.map(task => {
      return <li key={task.id}><Task task={task} /></li>;
    });
    return (
      <ul>
        {tasks}
        <li><TaskCreator addTask={this.addTask} /></li>
      </ul>
    );
  }
});

var Task = React.createClass({
  propTypes: {
    task: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired
    })
  },
  render() {
    return (
      <p>{this.props.task.name}</p>
    );
  }
});

var TaskCreator = React.createClass({
  propTypes: {
    addTask: React.PropTypes.func.isRequired
  },
  getInitialState() {
    return {
      edit: false,
      taskName: ""
    }
  },
  init() {
    this.setState({
      edit: false,
      taskName: ""
    })
  },
  handleClickAddTaskLink() {
    this.setState({edit: true});
  },
  handleClickCancelLink() {
    this.setState({edit: false});
  },
  handleClickAddTaskButton() {
    var taskName = this.state.taskName;
    if (taskName.length > 0) {
      this.props.addTask(taskName);
      this.init();
    }
  },
  handleChangeTaskNameText(e) {
    this.setState({taskName: e.target.value});
  },
  render() {
    return (
      <div>
        {(() => {
          if (this.state.edit) {
            return (
              <p>
                <input type="text" value={this.state.taskName} onChange={this.handleChangeTaskNameText}/><br/>
                <button onClick={this.handleClickAddTaskButton}>Add task</button>
                <a href="#" onClick={this.handleClickCancelLink}>Cancel</a>
              </p>
            );
          } else {
            return <p><a href="#" onClick={this.handleClickAddTaskLink}>Add task</a></p>
          }
        })()}
      </div>
    );
  }
});

ReactDOM.render(<TaskList />, document.getElementById('container'));