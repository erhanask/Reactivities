import React from "react";
import {Grid, List} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity.ts";
import ActivityList from "./ActivityList.tsx";
import ActivityDetails from "../details/ActivityDetails.tsx";
import {ActivityForm} from "../form/ActivityForm.tsx";


interface Props {
    activities: Activity[],
    selectedActivity: Activity | undefined,
    selectActivity: (id: string) => void,
    cancelActivity: () => void
}

export default function ActivityDashboard(
    {
        activities,
        selectedActivity,
        selectActivity,
        cancelActivity
    }: Props
) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} selectActivity={selectActivity} />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && <ActivityDetails activity={selectedActivity} selectActivity={selectActivity} cancelActivity={cancelActivity}/>}
                <ActivityForm />
            </Grid.Column>
        </Grid>
    );
}