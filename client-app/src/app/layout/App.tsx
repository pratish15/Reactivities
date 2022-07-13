import React, { Fragment, useEffect } from 'react';
import {  Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponents';
import { useStore } from '../stores/store';
import { observer } from "mobx-react-lite";

function App() {
  const {activityStore} = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]) // [] ensures does not loop. only exuctes once
  
if(activityStore.loadingInitial) return <LoadingComponent content='Loading app'/>

  return (
    <Fragment>
        <NavBar/>
        <Container style={{marginTop: '7em'}}>
          {/* <h2>{activityStore.activities.title}</h2>
          <Button content='Add exclamation!' positive onClick={activityStore.setTitle}/> */}
          <ActivityDashboard 
          />
        </Container>
       
    </Fragment>
  );
}

export default observer(App);
