import { Pedidos } from '../lib/Pedidos'
import { useLoaderData } from "react-router-dom";
import { Container, Row, Col, Table } from 'react-bootstrap';
import { format } from "date-fns"

export async function loader({ params }) {
    const pedido = await Pedidos.findOnePedido(params.idPedido);
    const dados = pedido;
    return dados;
}

export default function Detalhe() {
    const dados = useLoaderData();

    return (
        <>
            <Container>
                <h1>Detalhes do pedido</h1>
                <Row className='my-3'>
                    <Col><h4>Data</h4>{format(new Date(dados.itens[0].pedido.data), "dd/MM/yyyy HH:mm")}</Col>
                    <Col className='d-flex flex-column align-items-end'><h4>Total do Pedido</h4>{dados.itens[0].pedido.totalDoPedido.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })}</Col>
                </Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Quantidade</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dados.itens.map((pedido) => (
                            <tr>
                                <td>
                                    {pedido.produto.nome}
                                </td>
                                <td>
                                    {pedido.quantidade}
                                </td>
                                <td>
                                    {(pedido.produto.preco * pedido.quantidade).toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>

        </>

    )
}