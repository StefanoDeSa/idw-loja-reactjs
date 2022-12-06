
import { useLoaderData } from "react-router-dom";
import { Pedidos } from "../lib/Pedidos";
import { Accordion } from "react-bootstrap";
import { format } from "date-fns"



export async function loader() {
    const { pedidos, meta } = await Pedidos.findAll();
    const dados = pedidos;
    return { dados, meta };
}

export default function Pedido() {
    const { dados } = useLoaderData();

    return (
        <>
            <h1>Relatorio dos pedidos!</h1>

            <Accordion>
                {dados.map(pedido => (
                    <Accordion.Item eventKey={(pedido.id)}>
                    <Accordion.Header>{format(new Date(pedido.data), "dd/MM/yyyy HH:mm")}</Accordion.Header>
                    <Accordion.Body> 
                        <p>Id do pedido: {pedido.id}</p>
                        <p>Total do pedido: {pedido.totalDoPedido.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })}</p>
                    <p>Usuario do pedido: {pedido.user.username}</p>
                    </Accordion.Body>
                </Accordion.Item>
                ))}
            </Accordion>
        </>
    )
}