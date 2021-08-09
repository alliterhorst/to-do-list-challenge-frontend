import axios from 'axios';

const timeout = 60000;
const timeoutErrorMessage = `Conexão encerrada, o tempo de resposta ${
  timeout ? `de ${timeout / 60 / 1000} minuto(s) ` : ' '
}foi excedido.`;

export const backendApi = axios.create({
  timeout,
  timeoutErrorMessage,
});
