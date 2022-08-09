import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            tasks: []
        };
        // bind
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderTasks = this.renderTasks.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    // handle change
    handleChange(e) {
        this.setState({
            name: e.target.value
        });
        // console.log('onChange', this.state.name);
    }
    // create handleSubmit method right after handleChange method
    handleSubmit(e) {
        // stop browser's default behaviour of reloading on form submit
        e.preventDefault();
        axios
            .post('/tasks', {
                name: this.state.name
            })
            .then(response => {
                console.log('from handle submit', response);
                // set state
                this.setState({
                    tasks: [response.data, ...this.state.tasks]
                });
                // then clear the value of textarea
                this.setState({
                    name: ''
                });
            });
    }
    // render tasks
    renderTasks() {
        return this.state.tasks.map(task => (
            <div key={task.id} className="media">
                <div className="media-body">
                    <div>
                        {task.name}{' '}
                        <span className="text-muted">
                            {' '}
                            <br />by {task.user.name} |{' '}
                            {task.updated_at
                                .split(' ')
                                .slice(1)
                                .join(' ')}
                        </span>
                        <div className="btn-group float-right">
                            <Link className="btn btn-sm btn-success" to={`/${task.id}/edit`}>
                                Edit
                            </Link>
                            <button onClick={() => this.handleDelete(task.id)} className="btn btn-sm btn-warning">
                                Delete
                            </button>
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
        ));
    }
    // get all tasks from backend
    getTasks() {
        axios.get('/tasks').then((
            response // console.log(response.data.tasks)
        ) =>
            this.setState({
                tasks: [...response.data.tasks]
            })
        );
    }
    // lifecycle method
    componentWillMount() {
        this.getTasks();
    }
    // handle delete
    handleDelete(id) {
        // remove from local state
        const isNotId = task => task.id !== id;
        const updatedTasks = this.state.tasks.filter(isNotId);
        this.setState({ tasks: updatedTasks });
        // make delete request to the backend
        axios.delete(`/tasks/${id}`);
    }
    // handle update
    handleUpdate(id) {
        axios.put(`/tasks/${id}`).then(response => {
            this.getTasks();
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Create Task</div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <textarea
                                            onChange={this.handleChange}
                                            value={this.state.name}
                                            className="form-control"
                                            rows="5"
                                            maxLength="255"
                                            placeholder="Create a new task"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Create Task
                                    </button>
                                </form>
                                <br />
                                {this.renderTasks()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}