import {useEffect, useState} from 'react'
import './App.css'
import axios from "axios";
import {Header} from "semantic-ui-react";
import {Activity} from "../models/activity.ts";

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    useEffect(() => {
        axios.get<Activity[]>('http://localhost:5000/api/activities')
            .then(response => {
                console.log(response);
                setActivities(response.data);
            });
    }, []);

    
    return (
        <div>
            <Header as='h2' icon='users' content='Reactivities' />
            <ul>
                {activities.map((activity: Activity) => (
                    <li key={activity.id}>{activity.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default App
