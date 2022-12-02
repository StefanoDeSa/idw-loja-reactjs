import * as qs from "qs";
import { API, BEARER } from "../constants";
import auth from "./auth";
import { strapiDataToObject } from "./funcoes";

export const Pedidos = {

  async find(pedidoId = undefined) {
    const user = auth.getUserInfo();
    try {
      let query = qs.stringify(
        {
          populate: [
            'produtos'
          ],
          filters: {
            user: {
              id: {
                $eq: user.id,
              }
            },
            pedido: {
              id: {
                $eq: pedidoId
              }
            },
          }
        },
        {
          encodeValuesOnly: true,
        }
      );
      const response = await fetch(`${API}/pedidos/?${query}`, {
        headers: {
          Authorization: `${BEARER} ${auth.getToken()}`
        }
      });
      const json = await response.json();
      if (json.data) {
        const pedidos = strapiDataToObject(json.data);
        return { pedidos, meta: json.meta };
      }
      if (json.error) {
        throw json.error;
      }
    } catch (error) {
      throw error;
    }
  },

  async create(produtos, valor) {
    const user = auth.getUserInfo();
    const currentdate = new Date();

    try {
      const response = await fetch(`${API}/pedidos`, {
        method: 'POST',
        headers: {
          Authorization: `${BEARER} ${auth.getToken()}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(
          {
            data: {
              data: currentdate,
              user: user.id,
              totalDoPedido: valor
            }
          }
        )
      });
      const json = await response.json();
      if (json.data) {
        const item = strapiDataToObject(json.data);
        produtos.map(async (produto) => {
          try {
            const response = await fetch(`${API}/itens-do-pedidos`, {
              method: 'POST',
              headers: {
                Authorization: `${BEARER} ${auth.getToken()}`,
                "Content-type": "application/json",
              },
              body: JSON.stringify(
                {
                  data: {
                    quantidade: produto.quantidadeNoCarrinho,
                    produto: produto,
                    pedido: item
                  }
                }
              )
            });
            const json = await response.json();
            if (json.data) {
              const item = strapiDataToObject(json.data);
              return item;
            }
            if (json.error) {
              throw json.error;
            }
          } catch (error) {
            throw error;
          }
        })
        return item;
      }
      if (json.error) {
        throw json.error;
      }
    } catch (error) {
      throw error;
    };
  },

  async findOnePedido(pedidoId){
    try {
      let query = qs.stringify(
        {
          populate: [
            'pedido',
            'produto'
          ],
          filters: {
            pedido: {
              id: {
                $eq: pedidoId
              },
            },
          }
        },
        {
          encodeValuesOnly: true,
        }
      );
      const response = await fetch(`${API}/itens-do-pedidos/?${query}`, {
        headers: {
          Authorization: `${BEARER} ${auth.getToken()}`
        }
      });
      const json = await response.json();
      if (json.data) {
        const itens = strapiDataToObject(json.data);
        return { itens };
      }
      if (json.error) {
        throw json.error;
      }
    } catch (error) {
      throw error;
    }
  }
}