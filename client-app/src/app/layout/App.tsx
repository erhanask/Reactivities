import {useEffect} from 'react'
import {Container} from "semantic-ui-react";
import {Activity} from "../models/activity.ts";
import NavBar from "./NavBar.tsx";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard.tsx";
import agent from "../api/agent.ts";
import LoadingComponent from "./LoadingComponent.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store.ts";
import {setActivities, setSelectedActivity} from "../redux/ActivitySlice/ActivitySlice.ts";
import {toggleMode} from "../redux/UiSlice/UiSlice.ts";

function App() {
    const dispatch = useDispatch();
    const {activities} = useSelector((state: RootState) => state.activity);
    const {loading} = useSelector((state: RootState) => state.ui);

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


    const handleFormOpen = (id?: string) => {
        id ? dispatch(setSelectedActivity(id)) : dispatch(setSelectedActivity(undefined));
        dispatch(toggleMode({
            mode: 'edit',
            status: true
        }));
    }

    if (loading) return <LoadingComponent content={'Loading'} />

    return (
        <>
            <NavBar openForm={handleFormOpen}/>
            <Container style={{marginTop: '7em'}}>
                <ActivityDashboard
                    activities={activities}
                    openForm={handleFormOpen}
                />
            </Container>
        </>
    )
}

export default App
