import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import api from "./../../services/api";
import './styles.css';

export default function Dashboard() {
    const [spots, setSpots] = useState([]);
    const loadSpots = async () => {
        try {
            const _id = localStorage.getItem('_id');
            const res = await api.get('/dashboard', {
                headers: {
                    user: _id
                }
            });
            setSpots(res.data);

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        loadSpots();
    }, [])
    return (
        <>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>
            <Link to="/new">
                <button className="btn">Cadastrar novo Spot</button>
            </Link>
        </>
    );
}
