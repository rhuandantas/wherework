import React, { useEffect, useState, useMemo } from 'react';
import { Link } from "react-router-dom";
import api from "./../../services/api";
import './styles.css';
import socket from "socket.io-client";

export default function Dashboard() {
    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);

    const user_id = localStorage.getItem('_id')
    const socketio = useMemo(() => socket('http://localhost:3001', {
        query: {
            user_id
        }
    }), [user_id]);

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
        socketio.on('booking_request', data => {
            setRequests([...requests, data])
        });
    }, [requests, socketio]);
    useEffect(() => {
        loadSpots();
    }, []);
    const handleAccept = async (id) => {
        try {
            await api.post(`/booking/${id}/approval`);
            setRequests(requests.filter(request => request.id !== id));
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleReject = async (id) => {
        try {
            await api.post(`/booking/${id}/rejection`);
            setRequests(requests.filter(request => request.id !== id));
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <>
            <ul className="notifications">
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                            <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
                        </p>
                        <button className="accept" onClick={() => handleAccept(request._id)}>Aceitar</button>
                        <button className="reject" onClick={() => handleReject(request._id)}>Rejeitar</button>
                    </li>
                ))}
            </ul>
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
