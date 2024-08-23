import React, {Component} from 'react';
import axios from 'axios';

import { Navigate } from 'react-router-dom';

export class Create extends Component{
    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDateStarted = this.onChangeDateStarted.bind(this);
        this.onChangeDateCompleted = this.onChangeDateCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
       
        this.state = {
            name: '',
            description: '',
            dateStarted:'' ,
            dateCompleted: '',
            redirect: false
        }
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }

    onChangeDateStarted(e){
        this.setState({
            dateStarted: e.target.value
        });
    }

    onChangeDateCompleted(e){
        this.setState({
            dateCompleted: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
       //const {history} = this.props;

        let tripObject = {
            Id: Math.floor(Math.random()*1000),
            name: this.state.name,
            description: this.state.description,
            dateStarted: this.state.dateStarted,
            dateCompleted: this.state.dateCompleted
        }

        axios.post("https://localhost:7055/api/Trips/AddTrip", tripObject).then(result => {
            this.setState({ redirect: true }); // Trigger redirection
            
        })
        .catch(error => {
            console.error("There was an error with the request:", error);
        })
    }

    render(){
        if (this.state.redirect) {
            return <Navigate to="/trips" />; // Redirect to /trips after success
        }
        return (
            <div className="trip-form" >
                <h3>Add new trip</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Trip name:  </label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={this.state.name}
                          onChange={this.onChangeName}
                         />
                    </div>
                    <div className="form-group">
                        <label>Trip description: </label>
                        <textarea 
			  type="text" 
                          className="form-control"
                          value={this.state.description}
                          onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="row">
                        <div className="col col-md-6 col-sm-6 col-xs-12">
                            <div className="form-group">
                                <label>Date of start:  </label>
                                <input 
                                  type="date" 
                                  className="form-control" 
                                  value={this.state.dateStarted}
                                  onChange={this.onChangeDateStarted}
                                />
                            </div>
                        </div>
                        <div className="col col-md-6 col-sm-6 col-xs-12">
                          <div className="form-group">
                            <label>Date of completion:  </label>
                            <input 
                                type="date" 
                                className="form-control" 
                                value={this.state.dateCompleted}
                                onChange={this.onChangeDateCompleted}
                            />
                            </div>
                        </div>
                    </div>
                    
                    
                    <div className="form-group">
                        <input type="submit" value="Add trip" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default Create;