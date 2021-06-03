import React, {useState, Fragment} from 'react';
import styled from '@emotion/styled';

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

const useListaBusqueda = (lista, flag, nombre) => {

    //state hook
    const [state, setState] = useState();

    const [paginaActual, setPaginaActual] = useState(1);

    const listaAux = lista;

    const arrayItem = [];

    // const otroAux = otroArr;

    const otroArr = [];

    const arrayNomCoti = [];
            
    

    for (const i in nombre.symbols) {
            var itemNombre = i;
            // console.log(itemNombre); 
            arrayNomCoti.push(itemNombre);
        }
    
    flag.forEach(function(e) {
        const ee = e.currencies[0].code;
        arrayNomCoti.forEach(function(elemento1) {
            
            if (ee === elemento1){ 
                var arrayBandera = {
                    codigo: `${elemento1}`,
                     bandera: `${e.flag}`
                    };
                    otroArr.push(arrayBandera);
            }
        });
    });

    // console.log(otroArr);
    // otroArr.forEach(i => {
    //         console.log(i.codigo);
    // });

 
    
    // ----Para lista
    function generaNvoArray (objeto) {
        for (var i in objeto) {
            //objeto.hasOwnProperty -->filtrar las propiedades del objeto
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

      
    
    // if (OtroArr[0] === arrayItem.divisa){
    //     console.log('Y ahora?');
    // }else{
    //     console.log('No paso nada')
    // }
/* console.log(OtroArr[0]); //COMPARAR LAS DIVISAS CON NOMBREAPI CODE  PARA MOSTRAR BANDERA
//TENGO QUE IMPORTAR OTROARR PARA ACCEDER A NOMBRE COTI Y FLAG
 */
    var maxPag = arrayItem.length / 4;

    //Definir la pagina anterior
    const cerrarCuatro = () => {
        const agregaPagina = paginaActual - 1;
        if (agregaPagina === 0) return;
        setPaginaActual(agregaPagina);
    };

    //Definir la pagina siguiente
    const agregarCuatro = () => {
        const agregaPagina = paginaActual + 1;
        if (agregaPagina > maxPag) return;
        setPaginaActual(agregaPagina);
    }

    const SelectCotizacion = () => (
        <Fragment>
            <ul className="ul-none" >
                {arrayItem
                    .slice('', paginaActual * 4) // presenta cotizaciones 4 + 4
                    .map((item) => (
                        <li>
                    <hr className="linea"></hr>
                    <ul className="lista ul-none">
                        <li>&#127988;</li>
                        <li>{item.divisa}</li>
                        <li>{item.coti}</li>
                    </ul>
                </li>
                ))}
            </ul>

            <div>
                
                {paginaActual === 1 ? null : (
                    <button
                    className="cerrar"
                    onClick={cerrarCuatro}
                        >&times;</button>
                )}

                {paginaActual === maxPag ? null : (

                <BotonVerMas
                    type="button"
                    onClick={agregarCuatro}
                    value="Ver más cotizaciones"
                    />
                )}
            </div>
        </Fragment>
    );
    return [state, SelectCotizacion, setState];
};
 
export default useListaBusqueda;