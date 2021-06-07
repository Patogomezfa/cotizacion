import React, {Fragment, useEffect, useState} from 'react';
import styled from '@emotion/styled';

//Hooks
import useListaDefecto from '../hooks/useListaDefecto';
import useListaBusqueda from '../hooks/useListaBusqueda';
import useDivisa from '../hooks/useDivisa';
import useFecha from '../hooks/useFecha';

//Componentes
import Error from './Error';

//Axios para API
import axios from 'axios';

//---Inicio Styled
const BotonBuscar = styled.input `
    min-width: 240px;
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
        background-color: #e2451b;
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
        background-color: #e2451b;
        border: 2px solid #e2451b;
        color: #fff;
        cursor: pointer;
    }
`;
//--Fin styled

const Formulario = ( { setFecha, setDivisa }) => {

    //State de las APIs
    // const [nombre, setNombre] = useState({});
    // const [flag, setFlag] = useState({});

    const [lista, setLista] = useState({});
    const [busqueMas, setBusqueMas] = useState(false);
    const [buscarCoti, setBuscarCoti] = useState(false);


    //utilizar useDivisa
    //el state que va a retornar es segun la divisa que el usuario elija, se extrae en el orden en que se retorna
    //--seleccionan una moneda.. se pasa como label en el hooks y el string vacio es lo que va a seleccionar y lo paso como state inicial--
    const[divisa, SelectDivisa] = useDivisa('Selecciona la moneda de referencia', '', lista); 

    //utilizar useFecha
    const [fecha, SelectFecha] = useFecha('Ingresa la fecha de cotizacion');

    //Utilizar useListaBusqueda
    const [SelectCotizacion] = useListaBusqueda(lista);
    
    //utilizar useListaDefecto
    const [SelectApi] = useListaDefecto(lista);

    //State Error
    const [error, setError] = useState(false);

// ------------------------------------------- APIS

// ---- API codigo divisa

    // useEffect(() => {
    //     if(buscarCoti === false){
    //     const ApiNombre = async () => {
    //         const url = `https://api.exchangeratesapi.io/v1/symbols?access_key=6feb2ec446b7478a6d4ee3885d838e9e&base=USD`;
    //         const resNombre = await axios.get(url);
    //         setNombre(resNombre.data);
    //           }
    //         ApiNombre();
    //         }
    //     },[buscarCoti]); 
    //             const arrayNomCoti = [];
    //             for (const i in nombre.symbols) {
    //                     var itemNombre = i;
    //                     // console.log(itemNombre); 
    //                     arrayNomCoti.push(itemNombre);
    //                 }
                
// ---- API Banderas // Countries
//    useEffect (() => {

//     const ApiFlag = async  () => {
        
//             const url = `https://restcountries.eu/rest/v2/all`;
//             const resultadoFlag = await axios.get(url);
//             setFlag(resultadoFlag.data);
            
//     }
//     ApiFlag();
// }, []);

// ---- API Cotizacion
    //Llamado automatico
    useEffect(() => {
        const consultarApi = async  () => {
                if(buscarCoti === false){
                    const url = `https://api.exchangeratesapi.io/v1/latest?access_key=6feb2ec446b7478a6d4ee3885d838e9e&base=USD`;
                    const resultado = await axios.get(url);
                    setLista(resultado.data.rates);
                    setBuscarCoti(false);
                    // console.log(resultado);
                }
            }
                    consultarApi();
    }, [divisa, fecha, buscarCoti]);
// console.log(lista);

    //Segundo llamado
    const consultarApi2 = async () => {
        const url = `https://api.exchangeratesapi.io/v1/${fecha.toISOString().slice(0,10)}?access_key=6feb2ec446b7478a6d4ee3885d838e9e&base=${divisa}`
        const resultado = await axios.get(url);
        setLista(resultado.data.rates);
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
        consultarApi2(); // Ejecuta llamado a la api para Ver Mas
    }}
    
    const masCotizaciones = (e) => {
        e.preventDefault();
        setBusqueMas(true);
    }

    return (
        <Fragment>
            <form className="form">
                {error ? <Error mensaje="Completa todos los campos" /> : null}
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
            <form className="form">
              { busqueMas ? null:
                <BotonVerMas
                onClick= {masCotizaciones}
                type="submit" 
                value="Ver más cotizaciones"
                />
                }
            </form>
        </Fragment>
    );
    }
export default Formulario;
