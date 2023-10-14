import {useEffect, useState} from 'react'
import {Container} from "semantic-ui-react";
import {Activity} from "../models/activity.ts";
import NavBar from "./NavBar.tsx";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard.tsx";
import {v4 as uuid} from 'uuid';
import agent from "../api/agent.ts";
import LoadingComponent from "./LoadingComponent.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store.ts";
import {addActivity, deleteActivity, setActivities, updateActivity, setSelectedActivity} from "../redux/ActivitySlice/ActivitySlice.ts";

function App() {
    const dispatch = useDispatch();
    const {activities, selectedActivity} = useSelector((state: RootState) => state.activity);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        agent.Activities.list().then(response => {
            const activityResponse: Activity[] = [];
            response.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                activityResponse.push(activity);
            })
            dispatch(setActivities(activityResponse));
            setLoading(false);
            });
    }, []);

    const handleSelectActivity = (id: string) => {
        dispatch(setSelectedActivity(id));
    }

    const handleCancelSelectActivity = () => {
        dispatch(setSelectedActivity(undefined));
    }

    const handleFormOpen = (id?: string) => {
        id ? handleSelectActivity(id) : handleCancelSelectActivity();
        setEditMode(true);
    }

    const handleFormClose = () => {
        setEditMode(false);
    }

    const handleCreateOrEditActivity = (activity: Activity) => {
        setSubmitting(true);
        if (activity.id) {
            agent.Activities.update(activity).then(() => {
                dispatch(updateActivity(activity));
            })
        } else {
            activity.id = uuid();
            agent.Activities.create(activity).then(() => {
                dispatch(addActivity(activity));
            })
        }
        dispatch(setSelectedActivity(activity.id));
        setEditMode(false);
        setSubmitting(false);
    }

    const handleDeleteActivity = (id: string) => {
        setSubmitting(true);
        agent.Activities.delete(id).then(() => {
            dispatch(deleteActivity(id));
            setSubmitting(false);
        });
    }

    if (loading) return <LoadingComponent content={'Loading'} />

    return (
        <>
            <NavBar openForm={handleFormOpen}/>
            <Container style={{marginTop: '7em'}}>
                <ActivityDashboard
                    activities={activities}
                    selectActivity={handleSelectActivity}
                    cancelActivity={handleCancelSelectActivity}
                    selectedActivity={selectedActivity}
                    editMode={editMode}
                    openForm={handleFormOpen}
                    closeForm={handleFormClose}
                    createOrEdit={handleCreateOrEditActivity}
                    deleteActivity={handleDeleteActivity}
                    submitting={submitting}
                />
            </Container>
        </>
    )
}

export default App
