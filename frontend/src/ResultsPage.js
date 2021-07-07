import React from 'react'

export default function ResultsPage({ supermarkets, setSupermarkets }) {
    return (
        <div>
            {
                supermarkets.map((value, index) => {
                    <h1>{value.Name}</h1>
                })
            }
        </div>
        
    )
}
