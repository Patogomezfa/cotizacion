import React, {useState} from 'react';
import styled from '@emotion/styled';
import Formulario from './components/Formulario';

//---Inicio Styled
const Contenedor = styled.div `

  max-width: 480px;
  margin: 3.5rem auto;
  padding: 5rem;
  border-radius: 10px;
  box-shadow: 2px 2px 8px 4px rgba(0, 0, 0, 0.1);
  `;
 const Subcontenedor = styled.div `
  width: 85%;
  margin: 0 auto;
 `;

const Header = styled.header `
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  font-weight: 500;
  font-size: 38px;
  margin-bottom: 50px;
  margin-top: 0px;
  margin-right: 0;
  padding: 0;
`;
//---Fin styled


function App() {

  const [divisa, setDivisa] = useState('');
  const [fecha, setFecha] = useState('');

  return (
    <Contenedor>
        <Header>Histórico de cotizaciones</Header>
      <Subcontenedor>
        <Formulario 
          setDivisa={setDivisa}
          setFecha={setFecha}
        />
</Subcontenedor>
    </Contenedor>
  );
}

export default App;
