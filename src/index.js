var TaskList = React.createClass({
  getInitialState() {
    return {
      tasks: [],
      nextId: 1
    };
  },
  addTask(taskName) {
    var newTask = {id: this.state.nextId, name: taskName, finished: false};
    this.setState({
      tasks: this.state.tasks.concat([newTask]),
      nextId: this.state.nextId + 1
    });
  },
  editTask(id) {
    // TODO
  },
  finishTask(id) {
    this.setState({
      task: this.state.tasks.map(task => {
        if (task.id === id) {
          task.finished = true;
        }
        return task;
      })
    });
  },
  render() {
    var tasks = this.state.tasks.map(task => {
      return <li key={task.id}><Task task={task} finishTask={this.finishTask} /></li>;
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
      name: React.PropTypes.string.isRequired,
      finished: React.PropTypes.bool.isRequired
    }),
    finishTask: React.PropTypes.func.isRequired
  },
  handleClickCheckBox() {
    this.props.finishTask(this.props.task.id);
  },
  render() {
    return (
      <p>
        {(() => {
          if (this.props.task.finished) {
            return (
              <s>{this.props.task.name}</s>
            );
          } else {
            return (
              <label>
                <input type="checkbox" onClick={this.handleClickCheckBox} />
                {this.props.task.name}
              </label>
            );
          }
        })()}
      </p>
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