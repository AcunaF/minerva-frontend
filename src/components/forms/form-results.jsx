const ResultadosBusqueda = ({ results, selectedInstitution }) => {
    const columnasAMostrar = [
        'NOMBRE',
        'ESPACIO_FORMATIVO',
        'INSTITUCION',
        'GESTION',
        'MODALIDAD',
        'AREA_1',
        'SUBAREA_1',
        'DURACION',

    ];

    console.log('Results:', results);

    return (
        <div>
            <h2>Resultados de la búsqueda</h2>
            {results &&
                results.map(({ type, data }, index) => (
                    <div key={index}>
                        <h3>{type}</h3>
                        {data && data.resultados && data.resultados.length > 0 ? (
                            <table className="table">
                                <thead>
                                <tr>
                                    {/* nombres de las columnas */}
                                    {columnasAMostrar.map((columna, columnIndex) => (
                                        <th key={columnIndex}>{columna}</th>
                                    ))}
                                    {/* nombre de la institución */}
                                    {selectedInstitution && <th>Institución</th>}
                                </tr>

                                </thead>
                                <tbody>
                                {data.resultados.map((result, resultIndex) => (
                                    <tr key={resultIndex}>
                                        {/* valores seleccionadas */}
                                        {columnasAMostrar.map((columna, columnIndex) => (
                                            <td key={columnIndex}>{result[columna]}</td>
                                        ))}
                                        {/* Renderizar el nombre de la institución solo si hay una institución seleccionada */}
                                        {selectedInstitution && (
                                            <td key="institucion">{selectedInstitution.DISPLAY_VALUE}</td>
                                        )}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No hay resultados para mostrar.</p>
                        )}
                    </div>
                ))}
        </div>
    );
};

export default ResultadosBusqueda;
