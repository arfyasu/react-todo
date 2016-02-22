var Button = ReactBootstrap.Button;
var Input = ReactBootstrap.Input;
var ListGroup = ReactBootstrap.ListGroup;
var ListGroupItem = ReactBootstrap.ListGroupItem;

var TaskList = React.createClass({
  getInitialState() {
    return {
      tasks: [],
      finishedTasks: [],
      nextId: 1
    };
  },
  createTask(form) {
    var newTask = {id: this.state.nextId, name: form.name, finished: false};
    this.setState({
      tasks: this.state.tasks.concat([newTask]),
      nextId: this.state.nextId + 1
    });
  },
  updateTask(form) {
    this.setState({
      tasks: this.state.tasks.map (task => {
        if (task.id === form.id) {
          task.name = form.name;
        }
        return task;
      })
    });
  },
  finishTask(id) {
    var finishedTask;
    var tasks = [];
    this.state.tasks.forEach(task => {
      if (task.id === id) {
        task.finished = true;
        finishedTask = task;
      } else {
        tasks.push(task);
      }
    });
    this.setState({
      tasks: tasks,
      finishedTasks: [finishedTask].concat(this.state.finishedTasks)
    });
  },
  undoTask(id) {
    var undoTask;
    var finishedTasks = [];
    this.state.finishedTasks.forEach(task => {
      if (task.id === id) {
        task.finished = false;
        undoTask = task;
      } else {
        finishedTasks.push(task);
      }
    });
    this.setState({
      tasks: this.state.tasks.concat([undoTask]),
      finishedTasks: finishedTasks
    });
  },
  render() {
    var tasks = this.state.tasks.map(task => {
      return <ListGroupItem key={task.id}><Task task={task} finishTask={this.finishTask} updateTask={this.updateTask} /></ListGroupItem>;
    });
    var finishedTasks = this.state.finishedTasks.map(task => {
      return <ListGroupItem key={task.id}><Task task={task} undoTask={this.undoTask} updateTask={this.updateTask} /></ListGroupItem>;
    });
    return (
      <div>
        <h2>TODO List</h2>
        <ListGroup>
          {tasks}
        </ListGroup>
        <p>
          <NewTask addTask={this.createTask} />
        </p>

        <h2>Finished tasks</h2>
        <ListGroup>
          {finishedTasks}
        </ListGroup>
      </div>
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
    //finishTask: React.PropTypes.func.isRequired,
    updateTask: React.PropTypes.func.isRequired
  },
  getInitialState() {
    return {
      edit: false
    }
  },
  updateTask(form) {
    this.props.updateTask(form);
    this.setState({
      edit: false
    });
  },
  cancelEdit() {
    this.setState({edit: false});
  },
  handleClickFinishCheckBox() {
    this.props.finishTask(this.props.task.id);
  },
  handleDoubleClickTaskName() {
    this.setState({edit: true});
  },
  handleClickUndoCheckBox() {
    this.props.undoTask(this.props.task.id);
  },
  render() {
    return (
      <div>
        {(() => {
          if (this.state.edit) {
            return <TaskForm submit={this.updateTask} cancel={this.cancelEdit} task={this.props.task} />
          } else {
            if (this.props.task.finished) {
              return (
                <p>
                  <input type="checkbox" onClick={this.handleClickUndoCheckBox} />
                  <s>{this.props.task.name}</s>
                </p>
              );
            } else {
              return (
                <p>
                  <input type="checkbox" onClick={this.handleClickFinishCheckBox} />
                  <label onDoubleClick={this.handleDoubleClickTaskName}>
                    {this.props.task.name}
                  </label>
                </p>
              );
            }
          }
        })()}
      </div>
    );
  }
});

var NewTask = React.createClass({
  propTypes: {
    addTask: React.PropTypes.func.isRequired
  },
  getInitialState() {
    return {
      edit: false
    }
  },
  init() {
    this.setState({edit: false})
  },
  cancelEdit() {
    this.init();
  },
  addTask(form) {
    this.props.addTask(form);
    this.init();
  },
  handleClickAddTaskLink() {
    this.setState({edit: true})
  },
  render() {
    return (
      <div>
        {(this.state.edit)
          ? <TaskForm submit={this.addTask} cancel={this.cancelEdit} task={{id: null, name: ""}} />
          : <p><a href="#" onClick={this.handleClickAddTaskLink}>Add task</a></p>}
      </div>
    );
  }
});


var TaskForm = React.createClass({
  propTypes: {
    submit: React.PropTypes.func.isRequired,
    cancel: React.PropTypes.func.isRequired
  },
  getInitialState() {
    return {
      name: this.props.task.name
    }
  },
  handleClickCancelLink() {
    this.props.cancel();
  },
  handleClickSubmitButton() {
    var name = this.state.name;
    if (name.length > 0) {
      this.props.submit({id: this.props.task.id, name: name});
    }
  },
  handleChangeTaskNameText(e) {
    this.setState({
      name: e.target.value}
    );
  },
  render() {
    return (
      <form>
        <Input type="text" value={this.state.name} wrapperClassName="col-xs-4" onChange={this.handleChangeTaskNameText} />
        <Button bsStyle="primary" bsSize="small" onClick={this.handleClickSubmitButton}>{(this.props.task.id) ? "Save" : "Add task"}</Button>
        <a href="#" onClick={this.handleClickCancelLink}>Cancel</a>
      </form>
    );
  }
});

ReactDOM.render(<TaskList />, document.getElementById('container'));