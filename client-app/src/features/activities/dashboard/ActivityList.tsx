import React from "react";
import {Segment,Item,Button} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity.ts";

interface Props {
    activities: Activity[],
    selectActivity: (id: string) => void,
    deleteActivity: (id: string) => void,
    submitting: boolean
}

export default function ActivityList({activities,selectActivity,deleteActivity,submitting}: Props) {
    const [target,setTarget] = React.useState('');

    function handleActivityDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>,id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {activities.map((activity) => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectActivity(activity.id)} floated='right' content='View' color='blue'/>
                                <Button
                                    loading={submitting && target === activity.id}
                                    onClick={() => handleActivityDelete(activity.id)}
                                    floated='right'
                                    content='Delete'
                                    color='red'/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    );
}