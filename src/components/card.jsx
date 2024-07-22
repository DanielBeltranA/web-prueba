import React from 'react'

export const Card = ({ info, delData, editProduct }) => {
    const eliminar = (item) => {
        delData(item)
    }
    return (
        <div className="row">
            {info.map((item, index) => (
                <div className="mt-3 col-6" key={index}>
                    <div className="card">
                        <div className="card-header text-center bg-success text-light">
                            <h2>{item.nombre}</h2>
                        </div>
                        <div className="card-body">
                            <p><span className="fw-bold">Fecha de ingreso: </span>{item.fecha}</p>
                            <p><span className="fw-bold">Stock: </span>{item.stock}</p>
                            <p><span className="fw-bold">Proveedor: </span>{item.proveedor}</p>
                            <p><span className="fw-bold">Correo: </span>{item.correo}</p>
                            <p><span className="fw-bold">Código: </span>{item.code}</p>
                            <p><span className="fw-bold">Precio: </span>${item.precio}</p>
                            <p><span className="fw-bold">Categoría: </span>{item.categoria}</p>
                        </div>
                        <div className="card-footer text-center">
                            <input
                                type="button"
                                value="Editar"
                                className="btn btn-warning"
                                onClick={() => editProduct(item)} />
                            <input
                                type="button"
                                value="Eliminar"
                                onClick={() => eliminar(item)}
                                className="btn btn-danger ms-5" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
