import React, {Component} from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
//import { withRouter } from 'react-router-dom';
export class Trips extends Component
{
    constructor(props){
        super(props);
        this.onTripUpdate = this.onTripUpdate.bind(this);
        this.state = {
            trips: [],
            loading: true,
            redirectToUpdate: null // Track redirection
        }
    }

    componentDidMount(){
        this.populateTripsData();
    }
    onTripUpdate(id){
      //  const {history} = this.props;
        console.log("trips: "+ id);
        this.setState({ redirectToUpdate: '/Update/' + id });
       
        //<Navigate to="/update/"id />; 
      //  history.push('/update/'+id);
    }
    populateTripsData(){
        axios.get("https://localhost:7055/api/Trips/GetTrips").then(result => {
            const response = result.data;
            this.setState({trips: response, loading: false});
        })
    }

    renderAllTripsTable(trips){
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Date started</th>
                        <th>Date completed</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        trips.map(trip => (
                        <tr key={trip.id}>
                            <td>{trip.name}</td>
                            <td>{trip.description}</td>
                            <td>{new Date(trip.dateStarted).toLocaleDateString()}</td>
                            <td>{trip.dateCompleted ? new Date(trip.dateCompleted).toLocaleDateString() :  '-' }</td>
                            <td> 
                            <div className="form-group">
                                    <button onClick={() => this.onTripUpdate(trip.id)} className="btn btn-success">
                                        Update
                                    </button>
                                    <button  className="btn btn-danger">
                                        Delete
                                    </button>
                                </div>

                            </td>
                        </tr>
                        ))
                    }
                    
                </tbody>
            </table>
        );
    }

    render(){
        if (this.state.redirectToUpdate) {
            // Redirect if `redirectToUpdate` is set
            return <Navigate to={this.state.redirectToUpdate} />;
        }
        let content = this.state.loading ? (
            <p>
                <em>Loading...</em>
            </p>
        ) : (
            this.renderAllTripsTable(this.state.trips)
        )

        return (
            <div>
                <h1>All trips</h1>
                <p>Here you can see all trips</p>
                {content}
            </div>
        );
    }
}
//export default withRouter(Trips);