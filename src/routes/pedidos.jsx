import ListGroup from "react-bootstrap/ListGroup";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLoaderData, Link } from "react-router-dom";
import { Pedidos } from "../lib/Pedidos";
import { Button } from "react-bootstrap";
import { format } from "date-fns"


export async function loader() {
  const { pedidos, meta } = await Pedidos.find();
  const dados = pedidos;
  return { dados, meta };
}

export default function Pedido() {
  const { dados } = useLoaderData();

  return (
    <>
      <h1>Olá, Aqui está seus pedidos!</h1>
      {console.log(dados)}
      <ListGroup>
        {dados.map((pedido) => (
          <ListGroup.Item key={pedido.id}>
            <Container>
              <Row>
                <Col><h6>Data</h6>{format(new Date(pedido.data), "dd/MM/yyyy HH:mm")}</Col>
                <Col className="d-flex flex-column align-items-end"><h6>Valor total</h6>{pedido.totalDoPedido.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}</Col>
                <Col className='d-flex justify-content-end'>
                  <Link to={`${pedido.id}`}>
                    <Button>
                      Abrir
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Container>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}
