import {useEffect, useState} from 'react'
import axios from "axios";
import {Container} from "semantic-ui-react";
import {Activity} from "../models/activity.ts";
import NavBar from "./NavBar.tsx";

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    useEffect(() => {
        axios.get<Activity[]>('http://localhost:5000/api/activities')
            .then(response => {
                setActivities(response.data);
            });
    }, []);


    return (
        <>
            <NavBar/>
            <Container style={{marginTop: '7em'}}>
                <ul>
                    {activities.map((activity: Activity) => (
                        <li key={activity.id}>{activity.title}</li>
                    ))}
                </ul>
            </Container>
        </>
    )
}

export default App
