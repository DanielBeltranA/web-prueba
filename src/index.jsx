import { useEffect, useState } from "react"
import { Formulario } from "./components/formulario"
import { Card } from "./components/card"

const Inicio = () => {
    return JSON.parse(localStorage.getItem('Productos')) || []
}

export const Index = () => {
    const [data, setData] = useState(Inicio)
    const [selectedProduct, setSelectedProduct] = useState(null)

    const addData = (valores) => {
        if (selectedProduct) {
            setData(data.map((item) => (item.code === selectedProduct.code ? valores : item)))
            setSelectedProduct(null)
        } else {
            setData([...data, valores])
        }
    }

    useEffect(() => {
        localStorage.setItem('Productos', JSON.stringify(data))
    }, [data])

    const borrar = (item) => {
        setData(data.filter((i) => i.code !== item.code))
        setSelectedProduct(null) 
    }

    const editProduct = (product) => {
        setSelectedProduct(product)
    }

    return (
        <>
            <div className="container-fluid row">
                <div className="col-4">
                    <Formulario addNew={addData} selectedProduct={selectedProduct} data={data} />
                </div>
                <div className="col-8">
                    <Card info={data} delData={borrar} editProduct={editProduct} />
                </div>
            </div>
        </>
    )
}

