import React, {useState, useEffect} from 'react';
import Formulario from './Formulario';
import axios from 'axios';

const ApiFlags = (buscarCoti) => {

    const [flag, setFlag] = useState([]);

        const ApiFlag = async  () => {
            if(buscarCoti === true){
                
                const url = `https://restcountries.eu/rest/v2/all`;
                const resultadoFlag = await axios.get(url);
                setFlag(resultadoFlag.data);
                
            }
        }
        ApiFlag();
        
                

                return ( 
                    <div>
            <p>{flag.data}</p>
        </div>
     );
}
 
export default ApiFlags;

