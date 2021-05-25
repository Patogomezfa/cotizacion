import React, {Fragment, useState} from 'react';

//Banderas
import CAD from '../img/canada.png';
import GBP from '../img/united-kingdom.png'
import USD from '../img/usd.png'
import EUR from '../img/eur.png'



const useApi = (lista) => {


    //State
    const [state, setState] = useState();

  /*   const [flag, setFlag] = useState([]);


    useEffect (() => {
        
        const apiflag = async () => {
            const url1 = await fetch(`http://countryapi.gear.host/v1/Country/getCountries`);
   
            const resultado1 = await url1.json()
            
           console.log(resultado1);
        }
            apiflag();
    }, []);
 */

    const SelectApi = () => (
        <Fragment>
            <ul className="ul-none">
                <li>
                    <hr className="linea"></hr>
                    <ul className="lista ul-none">
                        <li><img src={CAD} alt="Bandera de pais" className="bandera"/></li>
                        <li>CAD</li>
                        <li>{lista.CAD}</li>
                    </ul>
                </li>
                <li>
                    <hr className="linea"></hr>
                    <ul className="lista ul-none">
                        <li><img src={GBP} alt="Bandera de pais" className="bandera"/></li>
                        <li>GBP</li>
                        <li>{lista.GBP}</li>
                    </ul>
                </li>
                <li>
                    <hr className="linea"></hr>
                    <ul className="lista ul-none">
                        <li><img src={USD} alt="Bandera de pais" className="bandera"/></li>
                        <li>USD</li>
                        <li>{lista.USD}</li>
                    </ul>
                </li>
                <li>
                    <hr className="linea"></hr>
                    <ul className="lista ul-none">
                        <li><img src={EUR} alt="Bandera de pais" className="bandera"/></li>
                        <li>EUR</li>
                        <li>{lista.EUR}</li>
                    </ul>
                </li>
            </ul>
        </Fragment>

    );
        return [state, SelectApi, setState];
}

export default useApi;