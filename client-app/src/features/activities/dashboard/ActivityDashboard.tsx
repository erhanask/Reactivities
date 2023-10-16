import React from "react";
import {Grid} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity.ts";
import ActivityList from "./ActivityList.tsx";
import ActivityDetails from "../details/ActivityDetails.tsx";
import {ActivityForm} from "../form/ActivityForm.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../../app/redux/store.ts";


interface Props {
    activities: Activity[],
    openForm: (id?:string) => void,
}

export default function ActivityDashboard(
    {
        activities,
        openForm,
    }: Props
) {
    const {selectedActivity} = useSelector((state: RootState) => state.activity);
    const {editMode, submitting} = useSelector((state: RootState) => state.ui);


    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList
                    submitting={submitting}
                    activities={activities}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity &&
                    !editMode &&
                    <ActivityDetails
                        activity={selectedActivity}
                        openForm={openForm}
                    />}
                {editMode &&
                    <ActivityForm
                        activity={selectedActivity}
                        submitting={false}
                    />}
            </Grid.Column>
        </Grid>
    );
}