import React, { useState, useMemo } from 'react';
import camera from "./../../assets/camera.svg";
import './styles.css';
import api from "./../../services/api";

export default function New({ history }) {
    const [company, setCompany] = useState("");
    const [techs, setTechs] = useState("");
    const [price, setPrice] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null
    }, [thumbnail]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('thumbnail', thumbnail);
            data.append('company', company);
            data.append('techs', techs);
            data.append('price', price);
            const userid = localStorage.getItem('_id');
            await api.post('spot', data, {
                headers: {
                    userid
                }
            });

            history.push('/dashboard')
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label
                id="thumbnail"
                style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input
                    type="file"
                    id="thumbnail"
                    onChange={e => setThumbnail(e.target.files[0])}
                />
                <img src={camera} alt="selector" />
            </label>
            <label htmlFor="company" >EMPRESA *</label>
            <input
                id="company"
                placeholder="Sua incrível empresa"
                onChange={e => setCompany(e.target.value)}
                value={company}
            />
            <label htmlFor="techs" >TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
            <input
                id="techs"
                placeholder="Quais tecnologias usam"
                onChange={e => setTechs(e.target.value)}
                value={techs}
            />
            <label htmlFor="price" >VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span></label>
            <input
                id="price"
                placeholder="Valor cobrado por dia"
                onChange={e => setPrice(e.target.value)}
                value={price}
            />

            <button type="submit" className="btn">Cadastrar novo Spot</button>
        </form>
    );
}
