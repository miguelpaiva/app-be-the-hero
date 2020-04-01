import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css';
import api from '../../../services/api'

import logoImg from '../../../assets/logo.svg';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ongID = localStorage.getItem('ongID');

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,  
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    authorization: ongID,
                }
            });
            history.push('/profile');

        } catch (error) {
            alert('Erro ao cadastrar novo caso, tente novamente!');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                    <section>
                        <img src={ logoImg } alt="Be The Hero"/>
                        <h1>Cadastrar novo caso</h1>
                        <p>
                            Descreva o caso detalhadamente e encontre um herói para resolvê-lo!
                        </p>
                        <Link className="back-link" to="/profile">
                            <FiArrowLeft size={20} color="E02041"/>
                            Voltar para Perfil
                        </Link>
                    </section>

                    <form onSubmit={handleNewIncident}>
                        <input 
                            placeholder="Título do Caso"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <textarea 
                            placeholder="Descrição"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <input 
                            placeholder="Valor em R$"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />                           
                        <button className="button" type="submit" >Cadastrar</button>
                    </form>
                </div>
        </div>        
    );
}