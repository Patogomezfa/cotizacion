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

const Formulario = ( { setFecha, setDivisa, paginaSiguiente }) => {

    //State de las APIs
    const [nombre, setNombre] = useState({});
    const [flag, setFlag] = useState({});

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
    const [bandera, SelectCotizacion] = useListaBusqueda(lista, flag, nombre);
    
    //utilizar useListaDefecto
    const [api, SelectApi] = useListaDefecto(lista);

    //State Error
    const [error, setError] = useState(false);

// ---- APIS

// --- API Nombre

    useEffect(() => {

        if(buscarCoti === false){

        const ApiNombre = async () => {

            const url = `https://api.exchangeratesapi.io/v1/symbols?access_key=6feb2ec446b7478a6d4ee3885d838e9e&base=USD`;
            const resNombre = await axios.get(url);
            setNombre(resNombre.data);
              }
            ApiNombre();
            }
            
        },[buscarCoti]); 
            
                const arrayNomCoti = [];
            
                for (const i in nombre.symbols) {
                        var itemNombre = i;
                        // console.log(itemNombre); 
                        arrayNomCoti.push(itemNombre);
                    }
                
// ---- API BANDERAS
   useEffect (() => {

    const ApiFlag = async  () => {
        
            const url = `https://restcountries.eu/rest/v2/all`;
            const resultadoFlag = await axios.get(url);
            setFlag(resultadoFlag.data);
            
    }
    ApiFlag();
}, [buscarCoti]);




//-----------------------------------------------------------
//----------No sirve
//Recuperar nombres de monedas API restcountris (Flags)

//Con este obtengo las banderas!
/* const arrayFlag = [];
for (let i of flag){
    var bande = i.flag;
    arrayFlag.push(bande); //Lo pongo en un array
} */

// Y con este obtengo los nombres de currencies
/*         const arrayNomApiFlags = [];
        for (let v of flag){
            for(let w of v.currencies){
                var nameFlag = w.code;
                arrayNomApiFlags.push(nameFlag);
            }
        } */
        //----------Fin No sirve




        /* //--Se fue a useListaBusqueda
        const otroArr = [];
        flag.forEach(function(e, i) {
            const ee = e.currencies[0].code;
            arrayNomCoti.forEach(function(elemento1, ii) {
                
                if (ee === elemento1){ 
                    var arrayBandera = {
                        codigo: `${elemento1}`,
                         bandera: `${e.flag}`
                        };
                        otroArr.push(arrayBandera);
                }
            });
        });
        // console.log(); */
  


        //----------------------------------------------------
// API Cotizacion
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
    
    // >> ------- Pruebas para mostrar banderas --------- <<

/* 
        const nuevoFlag = [];
        const nuevoNombre = [];

        nuevoFlag.push(flag);
        nuevoNombre.push(nombre);

 */

/* useEffect (() => {

        const dosApis = [...nuevoFlag, ...nuevoNombre];
        // console.log(dosApis);


const encuentra1 = nuevoFlag.find(element => element === nuevoNombre.symbols);
console.log('encuentra1');
console.log(encuentra1);

if(nuevoNombre.symbols === nuevoFlag[0].name){
    console.log('soy un genio papii');
}

    }, [buscarCoti]); */


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
