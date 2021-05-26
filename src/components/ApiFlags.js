/* import React, {useState, useEffect} from 'react';
import Formulario from './Formulario';
import axios from 'axios';

const ApiFlags = ({divisa, fecha, buscarCoti}) => {


 useEffect (() => {

    const ApiFlag = async  () => {
        if(buscarCoti === true){
            
            const url = `https://restcountries.eu/rest/v2/all`;
            const resultadoFlag = await axios.get(url);
            setFlag(resultadoFlag.data);
            // console.log(resultadoFlag.data);
            
        }
    }
            ApiFlag();
            
        }, [buscarCoti]);
 

            console.log(flag.data[0]);
    return ( 
        <div>
            <p>{flag.data}</p>
        </div>
     );
}
 
export default ApiFlags; */

