import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
//import Update from './components/Trip/Update';

export const Update = () => {
    const { id } = useParams(); // Getting the id from the route params
    const navigate = useNavigate(); // For navigation after update
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dateStarted, setDateStarted] = useState('');
    const [dateCompleted, setDateCompleted] = useState('');

    useEffect(() => {
        axios.get(`https://localhost:7055/api/Trips/SingleTrip/${id}`)
            .then(trip => {
                const response = trip.data;
                setName(response.name);
                setDescription(response.description);
                setDateStarted(new Date(response.dateStarted).toISOString().slice(0, 10));
                setDateCompleted(response.dateCompleted ? new Date(response.dateCompleted).toISOString().slice(0, 10) : '');
            });
    }, [id]);

    const onSubmit = (e) => {
        e.preventDefault();
        const tripObject = {
            name,
            description,
            dateStarted: new Date(dateStarted).toISOString(),
            dateCompleted: dateCompleted ? new Date(dateCompleted).toISOString() : null
        };

        axios.put(`https://localhost:7055/api/Trips/updateTrip/${id}`, tripObject)
            .then(() => navigate('/trips'));
    };

    return (
        <div className="trip-form">
            <h3>Update trip</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Trip name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Trip description:</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="row">
                    <div className="col col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                            <label>Date of start:</label>
                            <input
                                type="date"
                                className="form-control"
                                value={dateStarted}
                                onChange={(e) => setDateStarted(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                            <label>Date of completion:</label>
                            <input
                                type="date"
                                className="form-control"
                                value={dateCompleted}
                                onChange={(e) => setDateCompleted(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <button type="button" onClick={() => navigate('/trips')} className="btn btn-default">Cancel</button>
                    <button type="submit" className="btn btn-success">Update</button>
                </div>
            </form>
        </div>
    );
};

//export default Update; 
export default Update;