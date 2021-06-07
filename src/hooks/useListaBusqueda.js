import React, {useState, Fragment} from 'react';
import styled from '@emotion/styled';
import blanca from '../img/blanca.png';

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

const useListaBusqueda = (lista) => {
    const [paginaActual, setPaginaActual] = useState(1);
    const arrayItem = [];

    // ----Para lista
    function generaNuevoArray (objeto) {
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
                        coti: `${objeto[i]}`,
                        // bandera: `${ PONER E.FLAG ACA }`
                    };
                    arrayItem.push(itemLista);
                }
            }
        }
    }
    generaNuevoArray(lista);

    // console.log(arrayItem);

    //-----Para banderas
/* 
    for (const i in nombre.symbols) {
        var itemNombre = i;
        // console.log(itemNombre); 
        arrayNomCoti.push(itemNombre);
    }
//Pureba para obtener codigo y bandera

// const ultra = [...flag, ...arrayNomCoti];

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
}); */

// console.log(otroArr);

// otroArr.forEach(i => {
//     // console.log(i.codigo);
//     const bander = i.bandera;
//     // console.log(bander);
//     // console.log(bander);
// });

    //Unir arrays

    // const ultraArr = [...arrayItem, ...otroArr];

    // console.log(ultraArr);

    //If para obtener banderas

 /*    ultraArr.forEach(i => {
        if (i.codigo === i.divisa){
            console.log('eureka!!!!!!!!');
        }
    }); */

    // if(objeto.hasOwnProperty(i)) {
    //     var aux = `${i}`;
    //     var banderaOK;
        
    //     aux === "CAD"||aux === "GBP"||aux === "USD"||aux ==="EUR"
    //     ? (banderaOK = false)
    //     : (banderaOK = true);
    //     if (banderaOK) {
    //         var itemLista = {
    //             divisa: `${i}`,
    //             coti: `${objeto[i]}`,
    //             // bandera: `${ PONER E.FLAG ACA }`
    //         };
    //         arrayItem.push(itemLista);
    //     }
    // }
    
    // if (OtroArr[0] === arrayItem.divisa){
    //     console.log('Y ahora?');
    // }else{
    //     console.log('No paso nada')
    // }

    //--Mostrar mas cotizaciones
    var maxPag = arrayItem.length / 4;

    //Definir cerrar pagina
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
                        <li key= {item.divisa.toString()}>
                            <hr className="linea" />
                            <ul className="lista ul-none">
                                <img src={blanca}  alt="Bandera de pais" className="bandera"/>
                                <li>{item.divisa}</li>
                                <li>{item.coti}</li>
                            </ul>
                        </li>
                )
                )
                }
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
    return [SelectCotizacion];
};
 
export default useListaBusqueda;