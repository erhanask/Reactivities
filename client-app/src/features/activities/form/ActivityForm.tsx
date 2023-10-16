import React, {ChangeEvent, useState} from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import {Activity} from "../../../app/models/activity.ts";
import {toggleMode} from "../../../app/redux/UiSlice/UiSlice.ts";
import {useDispatch} from "react-redux";
import agent from "../../../app/api/agent.ts";
import {addActivity, setSelectedActivity, updateActivity} from "../../../app/redux/ActivitySlice/ActivitySlice.ts";
import {v4 as uuid} from "uuid";

interface Props {
    activity: Activity | undefined,
    submitting: boolean
}

export const ActivityForm = ({activity: selectedActivity, submitting}:Props) => {

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    };
    const [activity, setActivity] = useState(initialState);
    const dispatch = useDispatch();

    function handleSubmit() {
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

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    }

    const closeFormHandler = () => {
        dispatch(toggleMode({
            mode: 'edit',
            status: false
        }));
    }



    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder='Title' name='title' value={activity.title} onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' name='description' value={activity.description} onChange={handleInputChange} />
                <Form.Input placeholder='Category' name='category' value={activity.category} onChange={handleInputChange} />
                <Form.Input placeholder='Date' type='date' name='date' value={activity.date} onChange={handleInputChange} />
                <Form.Input placeholder='City' name='city' value={activity.city} onChange={handleInputChange} />
                <Form.Input placeholder='Venue' name='venue' value={activity.venue} onChange={handleInputChange} />
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button floated='right' onClick={closeFormHandler} type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}