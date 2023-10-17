import {Container} from "semantic-ui-react";
import NavBar from "./NavBar.tsx";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard.tsx";
import LoadingComponent from "./LoadingComponent.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store.ts";
import {setSelectedActivity} from "../redux/ActivitySlice/ActivitySlice.ts";
import {toggleMode} from "../redux/UiSlice/UiSlice.ts";

function App() {
    const dispatch = useDispatch();
    const {loading} = useSelector((state: RootState) => state.ui);


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
                    openForm={handleFormOpen}
                />
            </Container>
        </>
    )
}

export default App
