import React, {useEffect} from "react";
import {Segment,Item,Button} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity.ts";
import {deleteActivity, setActivities, setSelectedActivity} from "../../../app/redux/ActivitySlice/ActivitySlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {toggleMode} from "../../../app/redux/UiSlice/UiSlice.ts";
import agent from "../../../app/api/agent.ts";
import {RootState} from "../../../app/redux/store.ts";

interface Props {
    submitting: boolean
}

export default function ActivityList({submitting}: Props) {
    const dispatch = useDispatch();
    const [target,setTarget] = React.useState('');
    const {activities} = useSelector((state: RootState) => state.activity);

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