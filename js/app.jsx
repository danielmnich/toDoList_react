import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Title extends Component{
    render(){
        return(
            <h1> Your ToDo List </h1>
        )
    }
}

class TaskForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            valueInput: ""
        }
    }
     handleChange = (event) => {
        this.setState ({
            valueInput: event.target.value
        })
    }

    handleClick= (event) => {
        if(this.state.valueInput) {
            this.props.addTask(this.state.valueInput)
            this.setState({
                valueInput: ''
            })
        }
    }

    render(){
        return(
            <div>
                <textarea type ="text"
                        value = {this.state.valueInput}
                        onChange ={this.handleChange}
                />
                <button type="button" onClick = {this.handleClick}> Add Task</button>
            </div>
        )
    }
}

class Task extends Component{
    handleClick = () =>{
        if(typeof this.props.removeTask === "function"){
            this.props.removeTask(this.props.index);
        }

    }
    render(){
        return(
            <li> <span><h3> Task Number {this.props.index + 1}</h3></span>{this.props.text}
              <button type = "button" onClick= {this.handleClick}>Remove</button>
             </li>
        )
    }
}

class Tasks extends Component{
    constructor(props){
        super(props);
        this.state = {
            allTasks: [],
        }
    }
    render(){
        const items = this.props.tasks.map((el,i)=>{
            return (
                <Task key = {i}
                    text={el}
                    index={i}
                    removeTask = {this.props.removeTask}
                    />
            )
        })
        return(
            <ul>
            {items}
            </ul>
        )
    }
}

class RemoveAllTasks extends Component{
    handleClick = ()=>{
        this.props.removeTasks();
    }
    render(){
        return(
            <button
            type="button" className = "removeAll" onClick={this.handleClick}> Remove All Tasks </button>
        )
    }
}

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            allTasks: [],
        }
    }
    addTask = (oneTask)=> {
        this.setState({
            allTasks: [...this.state.allTasks, oneTask],
        })
    }

    removeTask = (index) =>{
        this.setState({
            allTasks: [
                ...this.state.allTasks.slice(0, index),
                ...this.state.allTasks.slice(index + 1)
            ],
        })
    }

    remove = () =>{
        this.setState({
            allTasks: [],
        })
    }
    render(){
        return(
            <div className = "Container">
                <Title />
                <TaskForm addTask={this.addTask}/>
                <Tasks
                    tasks={this.state.allTasks}
                    removeTask ={this.removeTask}
                />
                <RemoveAllTasks removeTasks={this.remove}/>
            </div>

        )
    }
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});