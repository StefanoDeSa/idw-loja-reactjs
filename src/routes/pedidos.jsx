import ListGroup from "react-bootstrap/ListGroup";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLoaderData } from "react-router-dom";
import { Pedidos } from "../lib/Pedidos";
import { Button } from "react-bootstrap";


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

      <ListGroup>
        {dados.map((pedido) => (
          <ListGroup.Item key={pedido.id}>
            <Container>
              <Row>
                <Col>{pedido.data}</Col>
                <Col>{console.log(pedido)}</Col>
                <Col className='d-flex justify-content-end'><Button>Abrir</Button></Col>
              </Row>
            </Container>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}
