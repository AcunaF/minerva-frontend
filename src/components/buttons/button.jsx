import React from 'react';

const ButtonComponent = ({ handleSubmit, handleReset }) => {
    return (
        <div className="">
            <button
                onClick={handleSubmit}
                type="submit"
                className="btn btn-outline-secondary w-25 "
                aria-label="Buscar"
            >
                Buscar
            </button>
            <button
                onClick={handleReset}
                type="submit"
                className="btn btn-outline-secondary w-25 m-3"
                aria-label="Reset"
            >
                Reset
            </button>
        </div>
    );
};
export default ButtonComponent;