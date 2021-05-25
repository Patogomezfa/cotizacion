import React, {Fragment, useState} from 'react';
import styled from '@emotion/styled';

//DatePicker
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

//AddDays
import {addDays} from 'date-fns';

//---Inicio styled
const Label = styled.label `
    margin-top: 3.2rem;
    margin-bottom: .5rem;
    display: block;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
`;

/* const Div = styled.div `
display: block;
    `;  */

//----Fin Styled

const useFecha = (label) => {

        //State de DatePicker
        const [stateFecha, setFecha] = useState(null);

/* console.log(fecha.toISOString().slice(0,10)); */ //convertir fecha para url api

        const SeleccionFecha = () => (
        <Fragment>
            <Label>{label}</Label>
                <DatePicker 
                className="datepicker"
                selected={stateFecha}
                onChange={(date) => setFecha(date)}
                placeholderText="DD / MM / YYYY"
                maxDate={addDays(new Date(),0)} //Evitar seleccion de dias posteriores
                dateFormatCalendar="yyyy-MM-dd"
                />
        </Fragment>
        
     );
     //Retornar state, interfaz y fn que modifica el state
    return [stateFecha, SeleccionFecha, setFecha];
}


export default useFecha;