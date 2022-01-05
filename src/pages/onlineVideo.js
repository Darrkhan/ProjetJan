import React from 'react';
import './onlineVideo.css';
import { Navbar, Container, Form, Card, Placeholder, Button } from 'react-bootstrap';
import miniature from '../assets/miniature.png'
import { useAppContext } from '../appContext';


function OnlineVideo() {
    const { setState } = useAppContext();
    return (
        <div>
            <Navbar expand="lg" variant="dark" bg="dark">
                <Container>
                    <Navbar.Brand href="">Browse our online videos</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Form.Control id='search-bar' placeholder="Search" />
                        <Button
                            className="btn btn-secondary"
                            onClick={ () => setState(0) }
                        >
                            Go back to menu
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="d-flex flex-wrap">
                <div>
                    <Card style={{ width: '18rem', backgroundColor:"#212529", color:"white", margin:'5px' }}>
                        <Card.Img variant="top" src={miniature} />
                        <Card.Body>
                        <Card.Title>Youtube video</Card.Title>
                        <Card.Text>
                            This is a youtube video to explain how ot make a good youtube thumbnail !
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div>
                    <Card style={{ width: '18rem', backgroundColor:"#212529", color:"white", margin:'5px' }}>
                        <Card.Img variant="top" src={miniature} />
                        <Card.Body>
                            <Placeholder as={Card.Title} animation="glow">
                                <Placeholder xs={6} />
                            </Placeholder>
                            <Placeholder as={Card.Text} animation="glow">
                                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                <Placeholder xs={6} /> <Placeholder xs={8} />
                            </Placeholder>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
        
    ); 
}
export default OnlineVideo;