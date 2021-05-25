import React from 'react';
import styled from '@emotion/styled';

/* import PropTypes from 'prop-types'; */

const TxtError = styled.p `
    padding: 1rem;
    font-size: 22px;
    font-family: Arial, Helvetica, sans-serif;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    background-color: #c12900;
    color: #FFF;
`;

const Error = ({mensaje}) => {
    return ( 
        <TxtError>{mensaje}</TxtError>
     );
}

/* Error.propTypes = {

    mensaje: PropTypes.string.isRequired

} */
 
export default Error;