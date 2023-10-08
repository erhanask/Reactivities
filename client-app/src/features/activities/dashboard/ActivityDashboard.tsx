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
    cancelActivity: () => void,
    editMode: boolean,
    openForm: (id?:string) => void,
    closeForm: () => void,
    createOrEdit: (activity: Activity) => void,
    deleteActivity: (id: string) => void,
    submitting: boolean
}

export default function ActivityDashboard(
    {
        activities,
        selectedActivity,
        selectActivity,
        cancelActivity,
        editMode,
        openForm,
        closeForm,
        createOrEdit,
        deleteActivity,
        submitting
    }: Props
) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList submitting={submitting} activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity &&
                    !editMode &&
                    <ActivityDetails
                        activity={selectedActivity}
                        selectActivity={selectActivity}
                        cancelActivity={cancelActivity}
                        openForm={openForm}
                    />}
                {editMode &&
                    <ActivityForm
                        closeForm={closeForm}
                        activity={selectedActivity}
                        createOrEdit={createOrEdit}
                        submitting={false}
                    />}
            </Grid.Column>
        </Grid>
    );
}