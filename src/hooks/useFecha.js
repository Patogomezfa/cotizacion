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

const useFecha = (label) => {
        //State de DatePicker
        const [stateFecha, setFecha] = useState(null);

        const SeleccionFecha = () => (
        <Fragment>
            <Label>{label}</Label>
                <DatePicker 
                className="datepicker"
                selected={stateFecha}
                onChange={(date) => setFecha(date)} //guardar en setFecha
                placeholderText="DD / MM / YYYY"
                maxDate={addDays(new Date(),0)} //Evitar seleccion de dias posteriores
                dateFormatCalendar="yyyy-MM-dd"
                />
        </Fragment>
     );
    return [stateFecha, SeleccionFecha, setFecha];
}

export default useFecha;