import React from 'react';
import { Link } from "react-router-dom";
import {Button, Header, Icon, Segment} from 'semantic-ui-react';

export default function NotFound(){
    return(
        <>
        <Header as='h1' content='Not Found' />
        <Segment placeholder>
            <Header icon>
                <Icon name = 'search'/>
                Oops- we've looked everywhere and could not find this.
            </Header>
            <Segment.Inline>
                <Button as ={Link} to='/activities' primary>
                    return to activities page
                </Button>
            </Segment.Inline>
        </Segment>  
        </>
   
    )
}