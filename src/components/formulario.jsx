import React, { useState, useEffect } from 'react'

export const Formulario = ({ addNew, selectedProduct, data = [] }) => {
    const valoresVacios = {
        nombre: '',
        fecha: '',
        precio: '',
        stock: '',
        proveedor: '',
        correo: '',
        code: '',
        categoria: ''
    }

    const [valores, setValores] = useState(valoresVacios)
    const [errores, setErrores] = useState({})

    useEffect(() => {
        if (selectedProduct) {
            setValores(selectedProduct)
        } else {
            setValores(valoresVacios)
        }
        setErrores({})
    }, [selectedProduct])

    const { nombre, fecha, precio, stock, proveedor, correo, code, categoria } = valores

    const validar = () => {
        const errores = {}
        if (!nombre.trim()) {
            errores.nombre = "Nombre del producto es requerido."
        }
        
        if (!fecha) {
            errores.fecha = "Fecha de ingreso es requerida."
        }
        
        if (!precio.trim()) {
            errores.precio = "Precio es requerido."
        } else if (!precio || precio <= 0) {
            errores.precio = "Precio debe ser un número positivo."
        }

        if (!stock.trim()) {
            errores.stock = "Stock es requerido."
        } else if (!stock || stock <= 0) {
            errores.stock = "Stock debe ser un número positivo."
        }

        if (!proveedor.trim()) {
            errores.proveedor = "Proveedor es requerido."
        }
        
        if (!correo.trim()) {
            errores.correo = "Correo electrónico es requerido."
        } else if (!/\S+@\S+\.\S+/.test(correo)) {
            errores.correo = "Correo electrónico inválido."
        }
        
        if (!code.trim()) {
            errores.code = "Código del producto es requerido."
        } else if (data.some(item => item.code === code && item !== selectedProduct)) {
            errores.code = "El código del producto ya existe."
        }
        
        if (!categoria.trim()) {
            errores.categoria = "Categoría es requerida."
        }        

        setErrores(errores)
        return Object.keys(errores).length === 0
    }

    const actualizar = (e) => {
        setValores({
            ...valores,
            [e.target.name]: e.target.value
        })
    }

    const guardar = () => {
        if (validar()) {
            addNew(valores)
            setValores(valoresVacios)
        }
    }

    return (
        <form className="card mt-3">
            <div className="card-header text-center">
                <h1>Formulario</h1>
            </div>
            <div className="card-body">
                <div className="mb-3">
                    <label>Nombre del Producto</label>
                    <input
                        type="text"
                        name="nombre"
                        value={nombre}
                        className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                        onChange={actualizar} />
                    <div className="invalid-feedback">{errores.nombre}</div>
                </div>
                <div className="mb-3">
                    <label>Fecha de Ingreso</label>
                    <input
                        type="date"
                        name="fecha"
                        value={fecha}
                        className={`form-control ${errores.fecha ? 'is-invalid' : ''}`}
                        onChange={actualizar} />
                    <div className="invalid-feedback">{errores.fecha}</div>
                </div>
                <div className="mb-3">
                    <label>Categoría</label>
                    <select
                        className={`form-select ${errores.categoria ? 'is-invalid' : ''}`}
                        name="categoria"
                        value={categoria}
                        onChange={actualizar}>
                        <option value="" disabled>--Elige una categoría--</option>
                        <option value="Ropa">Ropa</option>
                        <option value="Comida">Comida</option>
                        <option value="Electrónica">Electrónica</option>
                    </select>
                    <div className="invalid-feedback">{errores.categoria}</div>
                </div>
                <div className="mb-3">
                    <label>Precio</label>
                    <input
                        type="number"
                        name="precio"
                        value={precio}
                        className={`form-control ${errores.precio ? 'is-invalid' : ''}`}
                        min="1"
                        onChange={actualizar} />
                    <div className="invalid-feedback">{errores.precio}</div>
                </div>
                <div className="mb-3">
                    <label>Cantidad en Stock</label>
                    <input
                        type="number"
                        name="stock"
                        value={stock}
                        className={`form-control ${errores.stock ? 'is-invalid' : ''}`}
                        min="1"
                        onChange={actualizar} />
                    <div className="invalid-feedback">{errores.stock}</div>
                </div>
                <div className="mb-3">
                    <label>Proveedor</label>
                    <input
                        type="text"
                        name="proveedor"
                        value={proveedor}
                        className={`form-control ${errores.proveedor ? 'is-invalid' : ''}`}
                        onChange={actualizar} />
                    <div className="invalid-feedback">{errores.proveedor}</div>
                </div>
                <div className="mb-3">
                    <label>Correo del Proveedor</label>
                    <input
                        type="email"
                        name="correo"
                        value={correo}
                        className={`form-control ${errores.correo ? 'is-invalid' : ''}`}
                        onChange={actualizar} />
                    <div className="invalid-feedback">{errores.correo}</div>
                </div>
                <div className="mb-3">
                    <label>Código de Producto</label>
                    <input
                        type="text"
                        name="code"
                        value={code}
                        className={`form-control ${errores.code ? 'is-invalid' : ''}`}
                        maxLength="10"
                        onChange={actualizar}
                        disabled={!!selectedProduct} />
                    <div className="invalid-feedback">{errores.code}</div>
                </div>
            </div>
            <div className="card-footer text-center">
                <input
                    type="button"
                    value={selectedProduct ? "Actualizar" : "Agregar"}
                    onClick={guardar}
                    className="btn btn-primary" />
            </div>
        </form>
    )
}

