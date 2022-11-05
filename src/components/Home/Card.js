import React from 'react';

const Card = ({ info }) => {
    const { price, origin, destination, departure_date, return_date } = info;
    return (
        <div className='card-style'>
            <p className='price'>${price}</p>
            <p className="other-info">
                {origin} {`>>`} {destination}
            </p>
            <p className="other-info">
                Depart: {departure_date}
            </p>
            <p className="other-info">
                Return: {return_date}
            </p>
            
        </div>
    );
};

export default Card;