import React, {useState} from 'react';

import './global.css';

import Routes from './routes';

// JSX (JavaScript XML) - HTML integrado dentro de um arquivo .js

// Componentes no React sao funcoes que retornam HTML

// funcao do componente recebe parametro props (se estiver na propriedade tag html) { props.title }
//                                 ou children (se estiver dentro das tags html) { children }

// import {useState}, useState() retorna um array [valor, funcao de atualizacao()]

function App() {
  return (
    <Routes/>
  )
}

export default App;
