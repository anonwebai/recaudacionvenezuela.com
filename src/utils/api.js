import axios from 'axios';
import { load } from 'cheerio';

// Configuración de Axios para reintentos y timeout
const axiosInstance = axios.create({
  timeout: 5000, // Timeout de 5 segundos
  retry: 3, // Intentos de reintento
  retryDelay: (retryCount) => retryCount * 1000, // Esperar 1 segundo más en cada intento
});

export const fetchServerData = async (url) => {
  try {
    // Hacer la solicitud con Axios
    const { data: html } = await axiosInstance.get(url);
    
    // Cargar el HTML con Cheerio para manipulación
    const $ = load(html); 
    
    // Buscar la etiqueta <script> con id="serverData"
    const scriptTag = $('#serverData');
    
    if (!scriptTag.length) {
      throw new Error('No se encontró el <script> con id="serverData".');
    }
    
    // Obtener el contenido del script (el Base64)
    const base64Content = scriptTag.html().trim();
    
    // Decodificar el contenido Base64 usando atob (disponible en el navegador)
    const jsonString = atob(base64Content);
    
    // Parsear el string JSON a objeto
    const jsonData = JSON.parse(jsonString);
    
    return jsonData;
    
  } catch (error) {
    console.error('Error en fetchServerData:', error);
    throw error;
  }
};

export const getDonorSupportData = async (url) => {
  return {
    "goalAmount": 10000000,
    "raisedAmount": 1401000,
    "totalRecentDonations": 24995
  }
  const data = await fetchServerData(url);
  return {
    "goalAmount": data.campaign.config.campaignPage.goal.amount / 1e2,
    "raisedAmount": data.campaign.config.campaignPage.goal.raisedAmount / 1e2,
    "totalRecentDonations": data.campaign.totalRecentDonations + 5000
  }
};

// Función para obtener los precios de las criptomonedas
export const getCryptoPrices = async () => {
  const { data } = await axiosInstance.get(
    'https://api.coingecko.com/api/v3/simple/price',
    {
      params: {
        ids: 'bitcoin,ethereum,usd-coin,tether',
        vs_currencies: 'usd',
      },
    }
  );
  return data;
};

// Función para obtener balance de Bitcoin
export const getBitcoinBalance = async (address) => {
  const { data } = await axiosInstance.get(
    `https://btcscan.org/api/address/${address}`
  );
  return {
    btcTotal: data.chain_stats.funded_txo_sum / 1e8,
    btcCount: data.chain_stats.funded_txo_count,
  };
};

// Función para obtener balance de Ethereum
export const getEthereumBalance = async (address, apiKey) => {
  let ethTotal = 0;
  let page = 1;
  let offset = 10000;
  let hasMore = true;
  let ethCount = 0;

  while (hasMore) {
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${page}&offset=${offset}&sort=asc&apikey=${apiKey}`;

    try {
      const response = await axios.get(url);

      if (response.status === 200) {
        const data = response.data;

        data.result.forEach((tx) => {
          if (tx.to.toLowerCase() === address.toLowerCase()) {
            ethTotal += parseInt(tx.value) / 1e18;
            ethCount += 1;
          }
        });

        hasMore = data.result.length === offset;
        page += 1;
      } else {
        return {};
      }

      // Espera 250 ms entre las solicitudes para evitar sobrecargar la API
      await new Promise((resolve) => setTimeout(resolve, 250));

    } catch (error) {
      console.error('Error fetching transactions:', error);
      return {};
    }
  }
  return {
    ethTotal: ethTotal,
    ethCount: ethCount,
  };
};

// Función para obtener balance de USDC
export const getUsdcBalance = async (address, contractAddress, apiKey) => {
  let usdcTotal = 0;
  let page = 1;
  let offset = 10000;
  let hasMore = true;
  let usdcCount = 0;

  while (hasMore) {
    const url = `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${contractAddress}&address=${address}&page=${page}&offset=${offset}&sort=asc&apikey=${apiKey}`;

    try {
      const response = await axios.get(url);

      if (response.status === 200) {
        const data = response.data;

        data.result.forEach((tx) => {
          if (tx.to.toLowerCase() === address.toLowerCase()) {
            usdcTotal += parseInt(tx.value) / 1e6; // USDC tiene 6 decimales
            usdcCount += 1;
          }
        });

        hasMore = data.result.length === offset;
        page += 1;
      } else {
        return {};
      }

      // Espera 250 ms entre las solicitudes para evitar sobrecargar la API
      await new Promise((resolve) => setTimeout(resolve, 250));

    } catch (error) {
      console.error('Error fetching transactions:', error);
      return {};
    }
  }
  return {
    usdcTotal: usdcTotal,
    usdcCount: usdcCount,
  };
};

export const getUsdtBalance = async (address, apiKey) => {
  let usdtTotal = 0;
  let limit = 50;
  let start = 0;
  let hasMore = true;
  let usdtCount = 0;

  const headers = {
    'TRON-PRO-API-KEY': apiKey,
  };

  while (hasMore) {
    const url = `https://apilist.tronscan.org/api/token_trc20/transfers?limit=${limit}&start=${start}&sort=asc&count=true&relatedAddress=${address}`;

    try {
      const response = await axios.get(url, { headers });

      if (response.status === 200) {
        const data = response.data;

        data.token_transfers.forEach((tx) => {
          if (tx.to_address === address) {
            usdtTotal += parseInt(tx.quant) / 1e6;
            usdtCount += 1;
          }
        });

        hasMore = data.token_transfers.length === limit;
        start += limit;
      } else {
        return {};
      }

      // Espera 200 ms entre las solicitudes para evitar sobrecargar la API
      await new Promise((resolve) => setTimeout(resolve, 250));

    } catch (error) {
      console.error('Error fetching transactions:', error);
      return {};
    }
  }

  return {
    usdtTotal: usdtTotal,
    usdtCount: usdtCount,
  };
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));