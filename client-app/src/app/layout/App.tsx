import React, { Fragment, useEffect, useState } from 'react';
import { ducks } from '../../demo';
import DuckItem from '../../DuckItem';
import axios from 'axios';
import { Container } from 'semantic-ui-react';

import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Activity } from '../models/activity';
import {v4 as uuid} from 'uuid';
// ducks.map(duck => (
//   <DuckItem duck={duck}  key={duck.name} />
// ))
function App() {

  const [activities, setActivities] = useState<Activity[]>([]) // USE STATE
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      setActivities(response.data);
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

    // Check if activity id then it will be in Edit mode else in create mode
    activity.id? 
    setActivities([...activities.filter(x=>x.id!=activity.id), activity])
    : setActivities([...activities, {...activity, id:uuid()}]); // create activity
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id:string){
    setActivities([...activities.filter(x=>x.id !==id)])
  }

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
          />
        </Container>
       
    </Fragment>
  );
}

export default App;
