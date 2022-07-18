import React, { Fragment } from 'react';
import {  Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from "mobx-react-lite";
import { Route, Routes } from 'react-router-dom';
import ActivityForm from '../../features/activities/form/ActivityForm';
import HomePage from '../../features/home/HomePage';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import ServerError from '../../features/errors/ServerError';
import {ToastContainer} from 'react-toastify';
import NotFound from '../../features/errors/NotFound';

function App() {
  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar />
    <>
        <NavBar/>
        <Container style={{marginTop: '7em'}}>
          {/* <h2>{activityStore.activities.title}</h2>
          <Button content='Add exclamation!' positive onClick={activityStore.setTitle}/> */}
          <Routes >
              <Route path='/' element={<HomePage/>}/>
              <Route path='/activities' element={<ActivityDashboard/>}/>
              <Route path='/activities/:id' element={<ActivityDetails/>}/>
              <Route path= {'/createActivity'} element={<ActivityForm/>}/>
              <Route path= {'/manage/:id'} element={<ActivityForm/>}/>
              <Route path='/errors' element={<TestErrors/>} />
              <Route  path='/server-error' element={<ServerError/>} />
              <Route element={<NotFound/>} />
          </Routes>
   
        </Container>
       
    </>
    </>
    
  );
}

export default observer(App);
