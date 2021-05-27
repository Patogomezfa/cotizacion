import React, {Fragment, useState} from 'react';
import styled from '@emotion/styled';

//-- Inicio styled
const Label = styled.label `
    margin-top: 3.5rem;
    margin-bottom: .5rem;
    display: block;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
`;

const Select = styled.select `
    width: 100%;
    margin-top: .5rem;
    padding: .8rem;
    display: block;
    border: none;
    border-radius: 10px;
    font-size:1.2rem;
    --webkit-appearance: none;
    color: #8a8a8a;

`;

//---Fin styled

const useDivisa = (label, stateInicial, divisas) => {
    
    //State del hook
    const [state, actualizarState] = useState(stateInicial);
    
    //Para mostrar en interfaz
    const SeleccionarDivisa = () => ( 

        <Fragment>
            <Label>{label}</Label>
            <div className="downSelect">
            <Select
            onChange={ e => actualizarState(e.target.value)}
            value={state}
            >
                <option>Moneda</option>
                {Object.keys(divisas).map(opcion => (
                    <option
                    key={opcion.toString()}
                    value={opcion}>{opcion}
                    </option>
                ))}

            </Select>
            </div>
        </Fragment>

    );

    return [state, SeleccionarDivisa, actualizarState];
}

export default useDivisa;