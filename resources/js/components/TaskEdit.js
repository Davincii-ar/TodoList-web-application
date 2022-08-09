// TaskEdit.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TaskEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            task: ''
        };
        // bind
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            .put(`/tasks/${this.props.match.params.id}`, {
                name: this.state.name
            })
            .then(response => {
                console.log('successfully edited the task');
                this.props.history.push('/');
            });
    }
    // get all tasks from backend
    getTasks() {
        axios.get(`/tasks/${this.props.match.params.id}/edit`).then((
            response // console.log(response.data.tasks)
        ) =>
            this.setState({
                task: response.data.task,
                name: response.data.task.name
            })
        );
    }
    // lifecycle method
    componentWillMount() {
        this.getTasks();
    }

    render() {
        console.log(this.props.match.params.id);
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Edit Task</div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <textarea
                                            onChange={this.handleChange}
                                            value={this.state.name}
                                            className="form-control"
                                            rows="5"
                                            maxLength="255"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Edit Task
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskEdit;