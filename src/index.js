var TaskList = React.createClass({
  getInitialState() {
    return {
      tasks: [
        {id: 1, name: "hoge"}
      ]
    };
  },
  render() {
    var tasks = this.state.tasks.map(task => {
      return <li key={task.id}><Task task={task} /></li>;
    });
    return (
      <ul>{tasks}</ul>
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

ReactDOM.render(<TodoList />, document.getElementById('container'));