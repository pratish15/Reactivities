import React, { Fragment, useEffect, useState } from 'react';
import { ducks } from '../../demo';
import DuckItem from '../../DuckItem';
import agent from '../api/agent';
import { Container } from 'semantic-ui-react';

import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Activity } from '../models/activity';
import {v4 as uuid} from 'uuid';
import LoadingComponent from './LoadingComponents';
// ducks.map(duck => (
//   <DuckItem duck={duck}  key={duck.name} />
// ))
function App() {

  const [activities, setActivities] = useState<Activity[]>([]) // USE STATE
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, stateLoading] = useState(true);
  const[submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(response => {
      let activities: Activity[] =[];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
      setActivities(activities);
      stateLoading(false);
    })
  }, []) // [] ensures does not loop. only exuctes once

  function handleSelectActivity (id: string){
    setSelectedActivity(activities.find(x=>x.id == id));
  
  }

  function handleCancelSelectedActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string){
    id? handleSelectActivity(id) : handleCancelSelectedActivity();
    setEditMode(true);
  }

  function handleFormClose(id?: string){
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity){
    setSubmitting(true);
     // Check if activity id then it will be in Edit mode else in create mode
    if(activity.id){
      agent.Activities.update(activity).then(() =>{
      setActivities([...activities.filter(x=>x.id!=activity.id), activity]);
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
      })
    }else{
      activity.id = uuid();
      agent.Activities.create(activity).then(() =>{
        setActivities([...activities, activity]); // create activity
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleDeleteActivity(id:string){
    setSubmitting(true);
  agent.Activities.delete(id).then(()=>{
    setActivities([...activities.filter(x=>x.id !==id)])
    setSubmitting(false);
  })
   
  }
if(loading) return <LoadingComponent content='Loading app'/>

  return (
    <Fragment>
        <NavBar openForm={handleFormOpen}/>
        <Container style={{marginTop: '7em'}}>
          <ActivityDashboard 
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectedActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          />
        </Container>
       
    </Fragment>
  );
}

export default App;
