import { Pedidos } from '../lib/Pedidos'
import {useLoaderData } from "react-router-dom";

export async function loader() {
    const { pedidos, meta } = await Pedidos.find();
    const dados = pedidos;
    return { dados, meta };
  }

export default function Detalhe() {
    const { dados } = useLoaderData();

    return(
        <div>
            <h1>Detalhes do pedido {console.log(dados)}</h1>
        </div>
        
    )
}