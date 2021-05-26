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

const useApiCotizar = (lista, flag, buscarCoti) => {


    //state hook
    const [state, setState] = useState();

    const [paginaActual, setPaginaActual] = useState(1);

    const listaAux = lista;

    const arrayItem = [];

   /*  let dosApis = [...flag, ...lista]; */

   // ---Para bandera

 /*    flag.map(bandera => {
        return bandera;
    })
    console.log(flag.bandera); */

/*     console.log(arrayItem[0].divisa);
console.log(dosApis[0].name); */

/* let dosApis = [...flag, ...arrayItem]; */

 /*    console.log(ArrayBandera); */

    //---FILTER NO FUNCA
/*     const banderas = flag.filter(bandera => {
        return bandera.alpha3Code === 'ARS';
    });

    console.log(banderas);
     */
/* 
    const bandera = ArrayBandera.find( bandera =>{
        return bandera.currencies[0].code === 'ARS';
    });

    banderaAux = toString(bandera.flag); */
    //  const AuxBandera = toString(bandera.flag);
    /*     console.log(Object.keys(flag));
    */
// console.log(flag);



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


/* function generaNvoFlag (object) {
    for (var i in object) {
        if(object.hasOwnProperty(i)) {
            var aux = `${i}`
            var banderaOK;
            aux === "CAD"||aux === "GBP"||aux === "USD"||aux ==="EUR"
                        ? (banderaOK = false)
                        : (banderaOK = true);
                        if (banderaOK) {
                            var itemBandera = {
                                bandera: `${i}`,
                                codigo: `${object[i]}`
                            };
                            arrayItem2.push(itemBandera);
             }
        }
    }
}
generaNvoFlag(banderaAux)
   console.log(banderaAux); */


    //Calculo cantidad maxima de paginas
    var maxPag = arrayItem.length / 4;

    //Definir la pagina anterior
/*     const paginaAnterior = () => {
        const nuevaPaginaActual = paginaActual - 1;
        if (nuevaPaginaActual === 0) return;
        setPaginaActual(nuevaPaginaActual);
    }; */

    //Definir la pagina siguiente
    const paginaSiguiente = () => {
        const nuevaPaginaActual = paginaActual + 1;
        if (nuevaPaginaActual > maxPag) return;
        setPaginaActual(nuevaPaginaActual);
    }

    const SelectCotizacion = (divisa) => (
        //Lo que esta en SelectCotizacion es lo que se muestra en pantalla

        <Fragment>


            <ul className="ul-none" >
                {arrayItem
                    .slice('', paginaActual * 4) // presenta cotizaciones 4 + 4
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
                
                {/* {paginaActual === 1 ? null : (

                    <button
                        type="button"
                        onClick={paginaAnterior}
                        >&laquo; {" "}</button>
                )} */}

                {paginaActual === maxPag ? null : (

                <BotonVerMas
                    type="button"
                    onClick={paginaSiguiente}
                    value="Ver más cotizaciones"
                    />
                )}
            </div>
        </Fragment>
    );

    //Retornar state, interfaz y fn que modifica el state
    return [state, SelectCotizacion, setState];
    
};
 
export default useApiCotizar;