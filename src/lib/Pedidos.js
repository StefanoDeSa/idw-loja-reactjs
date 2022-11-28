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
      console.log(query)
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
  async create(produtos) {
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
                  produtos: produtos
              }
            }
          )
        });
        const json = await response.json();
        if (json.data) {
          const pedido = strapiDataToObject(json.data);
          return pedido;
        }
        if (json.error) {
          throw json.error;
        }
      } catch (error) {
        throw error;
      }
  },

}