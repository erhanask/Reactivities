import {useEffect} from 'react'
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
import {toggleMode} from "../redux/UiSlice/UiSlice.ts";

function App() {
    const dispatch = useDispatch();
    const {activities, selectedActivity} = useSelector((state: RootState) => state.activity);
    const {editMode, loading, submitting} = useSelector((state: RootState) => state.ui);

    useEffect(() => {
        agent.Activities.list().then(response => {
            const activityResponse: Activity[] = [];
            response.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                activityResponse.push(activity);
            })
            dispatch(setActivities(activityResponse));
            dispatch(toggleMode({
                mode: 'loading',
                status: false
            }));
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
        dispatch(toggleMode({
            mode: 'edit',
            status: true
        }));
    }

    const handleFormClose = () => {
        dispatch(toggleMode({
            mode: 'edit',
            status: false
        }));
    }

    const handleCreateOrEditActivity = (activity: Activity) => {
        dispatch(toggleMode({
            mode: 'submitting',
            status: true
        }));
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
        dispatch(toggleMode({
            mode: 'edit',
            status: false
        }));
        dispatch(toggleMode({
            mode: 'submitting',
            status: false
        }));
    }

    const handleDeleteActivity = (id: string) => {
        dispatch(toggleMode({
            mode: 'submitting',
            status: true
        }));
        agent.Activities.delete(id).then(() => {
            dispatch(deleteActivity(id));
            dispatch(toggleMode({
                mode: 'submitting',
                status: false
            }));
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
