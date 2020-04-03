import React, { useState } from 'react';
import api from "./../../services/api";
import { useHistory } from 'react-router-dom';

// import { Container } from './styles';

export default function Login() {
    const [email, setEmail] = useState("");
    const history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/user', { email });
            const { _id } = res.data;

            localStorage.setItem('_id', _id);

            history.push('/dashboard')
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <>
            <p>
                Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
        </p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-mail *</label>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" id="email" placeholder="Digite seu email" />
                <button className="btn" type="submit">Entrar</button>
            </form>
        </>

    );
}
