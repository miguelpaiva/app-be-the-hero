import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../../services/api';
import './styles.css';

import logoImg from '../../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    const ongID = localStorage.getItem('ongID');
    const ongName = localStorage.getItem('ongName');


    // funcao q renderiza os casos, parametro 1, uma funcao q vai a api get, q tem dentro dela a rota e o conteudo - funcao para ser executada
    //                              parametro 2, quando o dado vai ser exibido, array de dependencia, no caso , nao muda pq sao casos de uma ong so [ongID]

    // a use effect, usa a api(axios) para ir a rota /profile, autorizar com o ID, armazenado no local storage
    // depois usa uma funcao do use state pra pegar o array que vem como rresposta da requisicao GET

    useEffect( () => {   // renderizar e fazer apaercer os casos
        api.get('profile', { 
            headers: {
                authorization: ongID,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [] ); 

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    authorization : ongID,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id )) // sumir o caso sem f5 na pagina
            
        } catch (error) {
            alert('Erro ao deletar caso, tente novamente!');
        }
    }

    function handleLogout() {
        localStorage.clear();    // para deslogar - remover ongID e ongName do local storage 
        history.push('/');       // leva para pag inicial
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem-Vinda, {ongName} </span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="E02041"/>
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                { incidents.map (incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: "currency", currency: "BRL" }).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size="20" color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>


        </div>
    );
}