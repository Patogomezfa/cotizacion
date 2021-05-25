import React, {useState, Fragment} from 'react';
import styled from '@emotion/styled';


const Boton = styled.input `
    margin-top: 40px;
    font-size: 22px;
    padding: 22px;
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

const useApiCotizar = (lista) => {


    //state hook
    const [state, setState] = useState();

    const [paginaActual, setPaginaActual] = useState(1);

    const listaAux = lista;

    const arrayItem = [];

    function generaNvoArray (objeto) {
        for (var i in objeto) {
            //objeto.hasOwnProperty se usa para filtrar las propiedades del objeto
            if(objeto.hasOwnProperty(i)) {
                var aux = `${i}`;
                var banderaOK;

                    aux === "CAD"||aux === "GBP"||aux === "USD"||aux ==="EUR"
                        ? (banderaOK = false)
                        : (banderaOK = true);
                if (banderaOK) {
                    var itemLista = {
                        divisa: `${i}`,
                        coti: `${objeto[i]}`
                    };
                    arrayItem.push(itemLista);
                }
            }
        }
    }

    generaNvoArray(listaAux);

    //Calculo cantidad maxima de paginas
    var maxPag = Math.ceil(arrayItem.length / 4);

    //Definir la pagina anterior
    const paginaAnterior = () => {
        const nuevaPaginaActual = paginaActual - 1;
        if (nuevaPaginaActual === 0) return;
        setPaginaActual(nuevaPaginaActual);
    };

    //Definir la pagina siguiente
    const paginaSiguiente = () => {
        const nuevaPaginaActual = paginaActual + 1;
        if (nuevaPaginaActual > maxPag) return;
        setPaginaActual(nuevaPaginaActual);
    }

    const SelectCotizacion = () => (
        //Lo que esta en SelectCotizacion es lo que se muestra en pantalla

        <Fragment>


<ul className="ul-none">
                {arrayItem
                    .slice(paginaActual * 4 - 4, paginaActual * 4)
                    .map((item) => (
                        <li>
                    <hr className="linea"></hr>
                    <ul className="lista ul-none">
                        <li>&#x1f3f4;&#xe0067;&#xe0062;&#xe0073;&#xe0063;&#xe0074;&#xe007f;</li>
                        <li>{item.divisa}</li>
                        <li>{item.coti}</li>
                    </ul>
                </li>
                ))}
            </ul>


            <div>
                {paginaActual === 1 ? null : (

                    <button
                        type="button"
                        onClick={paginaAnterior}
                        >&laquo; {" "}</button>
                )}

                {paginaActual === maxPag ? null : (

                <button
                    type="button"
                    onClick={paginaSiguiente}
                    >&raquo;</button>
                )}
            </div>
        </Fragment>
    );

    //Retornar state, interfaz y fn que modifica el state
    return [state, SelectCotizacion, setState];
    
};
 
export default useApiCotizar;