import React from 'react'
import Card from 'react-bootstrap/Card'

export default function ResultsItem({ name, popularity, address }) {
    return (
        <div className='supermarket-result row px-5 py-1'>
            <Card classstyle={{ width: '18rem' , backgroundColor:'white'}}>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{address}</Card.Subtitle>
                    <Card.Text>
                        The supermarket currently has {popularity} people inside
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
