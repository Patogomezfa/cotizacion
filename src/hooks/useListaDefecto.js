import React, {Fragment} from 'react';

//Banderas
import CAD from '../img/CAD.png';
import GBP from '../img/GBP.png'
import USD from '../img/USD.png'
import EUR from '../img/EUR.png'

const useListaDefecto = (lista) => {
    const SelectApi = () => (
        <Fragment>
            <ul className="ul-none">
                <li>
                    <hr className="linea" />
                    <ul className="lista ul-none">
                        <li><img src={CAD} alt="Bandera canada" className="bandera"/></li>
                        <li>CAD</li>
                        <li>{lista.CAD}</li>
                    </ul>
                </li>
                <li>
                    <hr className="linea" />
                    <ul className="lista ul-none">
                        <li><img src={GBP} alt="Bandera Reino Unido" className="bandera"/></li>
                        <li>GBP</li>
                        <li>{lista.GBP}</li>
                    </ul>
                </li>
                <li>
                    <hr className="linea" />
                    <ul className="lista ul-none">
                        <li><img src={USD} alt="Bandera de EEUU" className="bandera"/></li>
                        <li>USD</li>
                        <li>{lista.USD}</li>
                    </ul>
                </li>
                <li>
                    <hr className="linea" />
                    <ul className="lista ul-none">
                        <li><img src={EUR} alt="Bandera de Europa" className="bandera"/></li>
                        <li>EUR</li>
                        <li>{lista.EUR}</li>
                    </ul>
                </li>
            </ul>
        </Fragment>
    );
        return [SelectApi];
}

export default useListaDefecto;