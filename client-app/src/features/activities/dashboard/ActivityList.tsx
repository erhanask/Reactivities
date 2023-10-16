import React from "react";
import {Segment,Item,Button} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity.ts";
import {deleteActivity, setSelectedActivity} from "../../../app/redux/ActivitySlice/ActivitySlice.ts";
import {useDispatch} from "react-redux";
import {toggleMode} from "../../../app/redux/UiSlice/UiSlice.ts";
import agent from "../../../app/api/agent.ts";

interface Props {
    activities: Activity[],
    submitting: boolean
}

export default function ActivityList({activities, submitting}: Props) {
    const dispatch = useDispatch();
    const [target,setTarget] = React.useState('');

    function handleActivityDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>,id: string) {
        setTarget(e.currentTarget.name);
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
    const handleSelectActivity = (id: string) => {
        dispatch(setSelectedActivity(id));
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
                                <Button onClick={() => handleSelectActivity(activity.id)} floated='right' content='View' color='blue'/>
                                <Button
                                    loading={submitting && target === activity.id}
                                    onClick={(e) => handleActivityDelete(e,activity.id)}
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