import { Pedidos } from '../lib/Pedidos'
import { useLoaderData } from "react-router-dom";
import { Container, Row, Col, Table } from 'react-bootstrap';
import { format } from "date-fns"

export async function loader({ params }) {
    const pedido = await Pedidos.findOnePedido(params.idPedido);
    console.log(pedido)
    const dados = pedidos;
    return { dados, meta };
}

export default function Detalhe() {
    const { dados } = useLoaderData();

    return (
        <>
            
            <Container>
            <h1>Detalhes do pedido</h1>
            <Row className='my-3'>
                {/* <Col><h4>Data</h4>{format( new Date(dados.data), "dd/MM/yyyy HH:mm")}</Col>
                <Col className='d-flex flex-column align-items-end'><h4>Total do Pedido</h4>{dados.totalDoPedido}</Col> */}
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
                    <tr>
                        
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
    
                        <td colSpan={2}>Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </Table>
            </Container>
            
        </>

    )
}