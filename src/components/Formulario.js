import React, {Fragment, useEffect, useState} from 'react';
import styled from '@emotion/styled';

//Hooks
import useApi from '../hooks/useApi';
import useApiCotizar from '../hooks/useApiCotizar';
import useDivisa from '../hooks/useDivisa';
import useFecha from '../hooks/useFecha';

//Componentes
import Error from './Error';


//Axios para API
import axios from 'axios';



const BotonBuscar = styled.input `
    margin-top: 40px;
    margin-bottom: 40px;
    font-size: 18px;
    padding: 20px;
    background-color: #ee7048;
    border: none;
    width: 100%;
    border-radius: 40px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #ea532a;
        cursor: pointer;
    }
`;

const BotonVerMas = styled.input `
    margin-top: 40px;
    margin-bottom: 40px;
    font-size: 18px;
    padding: 20px;
    background-color: #fff;
    border: 2px solid #ee7048;
    color: #ee7048;
    width: 100%;
    border-radius: 40px;
    transition: all .5s ease;

    &:hover {
        color: #ea532a;
        border: 2px solid #ea532a;
        cursor: pointer;
    }
`;


const Formulario = ( { setFecha, setDivisa }) => {


    //State de la lista de las APIs
    const [flag, setFlag] = useState([]);
    const [lista, setLista] = useState({});
    const [busqueMas, setBusqueMas] = useState(false);
    const [buscarCoti, setBuscarCoti] = useState(false);


    //utilizar useDivisa
    //el state que va a retornar es segun la divisa que el usuario elija, lo estoy extrayendo en el orden en que se retornan
    //seleccionan una moneda.. se pasa como label en el hooks y el string vacio es lo que va a seleccionar y lo paso como state inicial

    const[divisa, SelectDivisa] = useDivisa('Selecciona la moneda de referencia', '', lista); 
    //el state de useDivisa que va a retornar es segun la moneda que el usuario elija. Lo ewstoy extrayendo en el orden en que se retornan


    //utilizar useFecha
    const [fecha, SelectFecha] = useFecha('Ingresa la fecha de cotizacion');

    //Utilizar useApiCotizar
    const [bandera, SelectCotizacion] = useApiCotizar(lista, flag);
    
    //utilizar useApi
    const [api, SelectApi] = useApi(lista);
    //const [vermas, guardarVerMas] = useState(''); ----------------NO SIRVE PA NADA

    //State Error
    const [error, setError] = useState(false);


//API BANDERAS
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


// API Cotizacion
    //Ejecutar llamado automatico 
    useEffect(() => {
        const consultarApi = async  () => {
                if(buscarCoti === false){
                    //console.log('primer llamado API');
                    const url = `https://api.exchangeratesapi.io/v1/latest?access_key=6feb2ec446b7478a6d4ee3885d838e9e&base=USD`;
                    const resultado = await axios.get(url);
                    setLista(resultado.data.rates);
                    setBuscarCoti(false);
                }
            }
                    consultarApi();
    }, [divisa, fecha, buscarCoti]);

//Segundo llamado
    const consultarApi2 = async () => {
        //console.log('segundo llamado API');
         //${fecha.toISOString().slice(0,10)}
        const url = `https://api.exchangeratesapi.io/v1/${fecha.toISOString().slice(0,10)}?access_key=6feb2ec446b7478a6d4ee3885d838e9e&base=${divisa}`
        const resultado = await axios.get(url);
        setLista(resultado.data.rates);
        // resultadoFlag.data
        
        
    }
    
            

//cuando el usuario hace submit
    const buscarCotizar = (e) => {
        e.preventDefault();
        setBuscarCoti(true);
        //validar que ambos campos esten llenos
        if(divisa === '' && fecha === null) {
            setError(true);
            return; //Para que no se ejecute el codigo
        }else{
        //pasar los datos al componente principal
        setError(false);
        setDivisa(divisa);
        setFecha(fecha);

        consultarApi2();

    }
    }
    
    const masCotizaciones = (e) => {
        e.preventDefault();
        setBusqueMas(true);
    }




    return (
        <Fragment>
            <form>
                {error ? <Error mensaje="Debes completar todos los campos" /> : null}
                <SelectDivisa />
                <SelectFecha />
                <BotonBuscar 
                    onClick={buscarCotizar}
                    type="submit"
                    value="Buscar cotizaciones"
                />
                <SelectApi />
            </form>
            
            {busqueMas ? <SelectCotizacion /> : null}

            <form>
                <BotonVerMas
                onClick= {masCotizaciones}
                type="submit" 
                value="Ver más cotizaciones"
                />
            </form>


        </Fragment>

    );
    }

export default Formulario;


//-------------------------CODE PATO-------------------------------

/* 

    const [error, guardarError] = useState(false);


    const DIVISAS = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'},
    ]



    //Utilizar useDivisa
    const [divisa, SelectDivisa] = useDivisa('Selecciona la moneda de referencia', '', DIVISAS);
    const [fecha, SelectFecha] = useFecha('Ingresa la fecha de cotizacion', '');
    //Ejecutar llamado a la API
    useEffect (() => {
        const consultarApi = async () => {
            const url = 'http://api.exchangeratesapi.io/v1/latest?access_key=6feb2ec446b7478a6d4ee3885d838e9e';

            const resultado = await axios.get(url);

            console.log(resultado);
        }
        consultarApi();

    }, []);

    //Cuando el usuario hace submit
    const cotizarDivisa = e => {
        e.preventDefault();

        //Validar si ambos cambos estan llenos
        if(divisa === ''){ //------------VALIDAR FECHA
            guardarError(true);
            return; //para que no se ejecute el codigo
        }

        //pasar los datos al componente principal
        guardarError(false);
        guardarDivisa(divisa);
        guardarFecha(fecha);
    }

    return ( 
        <form
            onSubmit={cotizarDivisa}
        >

            {error ? <Error mensaje="Debes completar todos los campos" />: null}

            <SelectDivisa />
            <SelectFecha />


            <Boton 
            type="submit"
            value="Calcular"
            />

        </form>
     );
}
 
    Formulario.propTypes = {

    guardarDivisa: PropTypes.func.isRequired,
    guardarCriptoDivisa: PropTypes.func.isRequired

} */