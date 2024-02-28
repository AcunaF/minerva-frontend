import React from 'react';

const ButtonComponent = ({ handleSubmit, handleReset }) => {
    return (
        <div className="container-fluid">
            <button
                onClick={handleSubmit}
                type="submit"
                className="btn btn-outline-secondary w-20 m-3"
                aria-label="Buscar"
            >
                Buscar
            </button>
            <button
                onClick={handleReset}
                type="submit"
                className="btn btn-outline-secondary w-20 m-3"
                aria-label="Reset"
            >
                Reset
            </button>
        </div>
    );
};
export default ButtonComponent;