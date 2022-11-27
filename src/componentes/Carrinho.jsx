import { Button } from "react-bootstrap";
import formatarPreco from "../lib/funcoes";
import auth from "../lib/auth";
import { useLojaContext } from "../providers/AppProvider";
import Alerta from "./Alerta";
import "./Carrinho.scss";
import { Link } from "react-router-dom";
/**
 * O componente ItemDoCarrinho representa um item
 * da lista de produtos do Carrinho.
 *
 * @param {{produto, onRemover}} param0
 * @returns
 */
function ItemDoCarrinho({ produto, onRemover }) {
  return (
    <li>
      <div>{produto.nome}</div>
      <div>{produto.quantidadeNoCarrinho}</div>
      <div>{formatarPreco(produto.preco * produto.quantidadeNoCarrinho)}</div>
      <div>
        <Button variant="warning" size="sm" onClick={() => onRemover(produto)}>
          X
        </Button>
      </div>
    </li>
  );
}

/**
 * O componente Carrinho representa a interface gráfica
 * que apresenta a lista de produtos do carrinho,
 * a quantidade unitária e o total.
 *
 * @returns
 */
export default function Carrinho() {
  // utiliza o hook useContext para obter os valores do LojaContext
  const { produtosDoCarrinho, onRemover, onFechar } = useLojaContext();

  /**
   * Esta função calcula o total do carrinho com base
   * nos preços dos produtos e suas quantidades no carrinho.
   *
   * @returns
   */
  const calcularTotal = () => {
    let total = 0.0;
    if (produtosDoCarrinho) {
      produtosDoCarrinho.forEach(
        (produto) => (total += produto.preco * produto.quantidadeNoCarrinho)
      );
    }
    return total;
  };

  return (
    <div className="carrinho">
      <h1>Seu carrinho</h1>
      <ul id="lista-carrinho">
        {produtosDoCarrinho &&
          produtosDoCarrinho.map((produto) => (
            <ItemDoCarrinho
              key={produto.id}
              produto={produto}
              onRemover={onRemover}
            ></ItemDoCarrinho>
          ))}
        {(!produtosDoCarrinho ||
          (produtosDoCarrinho && produtosDoCarrinho.length === 0)) && (
            <Alerta
              titulo={"Seu carrinho está vazio"}
              mensagem={"Que tal mudar essa situação? 😉"}
            ></Alerta>
          )}
      </ul>
      <div id="carrinho-total">
        <div>Total</div>
        <div>{formatarPreco(calcularTotal())}</div>
      </div>
      {produtosDoCarrinho.length !== 0 && auth.getUserInfo() && (
        <div className="d-flex justify-content-center mt-5">
          <Button as={Link} to={`pedidos`} variant="primary" size="md" onClick={() => onFechar()}>
            Fechar pedido
          </Button>
        </div>
        )}
    </div>
  );
}
