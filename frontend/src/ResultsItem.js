import React from 'react'
import Card from 'react-bootstrap/Card'
import Marker, {Source, Layer} from "react-map-gl";


export default function ResultsItem({ name, popularity, address }) {
    return (
        <div className='supermarket-result'>
            <Card style={{ width: '18rem' , backgroundColor:'white'}}>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{address}</Card.Subtitle>
                    <Card.Text>
                        The supermarket currently has {popularity} people inside
                    </Card.Text>
                </Card.Body>
            </Card>
            {/* <Marker latitude={-37.8136} longitude={144.9631} offsetLeft={-20} offsetTop={-10}>
                <div>You are here</div>
            </Marker> */}
        </div>
    )
}
