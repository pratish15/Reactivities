import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ducks } from './demo';
import DuckItem from './DuckItem';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

// ducks.map(duck => (
//   <DuckItem duck={duck}  key={duck.name} />
// ))
function App() {

  const [activities, setActivities] = useState([]) // USE STATE

  
  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then(response => {
      console.log(response);
      setActivities(response.data);
    })
  }, []) // [] ensures does not loop. only exuctes once
  return (
    <div >
      <header className="App-header">
        <Header as='h2' icon='users' content='Reactivities' />
        <List>
          {activities.map((activity:any) =>(
              <List.Item key ={activity.id}>
                  {activity.title}
              </List.Item>
            ))}
        </List>
   






      </header>
    </div>
  );
}

export default App;
