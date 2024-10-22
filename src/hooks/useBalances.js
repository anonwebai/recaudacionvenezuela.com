// src/hooks/useBalances.js

import { useState, useEffect } from 'react';

import {
  getDonorSupportData,
  getBitcoinBalance,
  getEthereumBalance,
  getUsdcBalance,
  getUsdtBalance,
  getCryptoPrices,
  
} from '../utils/api';

const useBalances = () => {
  const [balances, setBalances] = useState({
    sumTotal: null,
    finalGoal: null,
    transactionCount: null,
    transactions: [],
    totalFiat: null,
    fiatCount: null,
    totalCrypto: null,
    cryptoCount: null,
  });

  useEffect(() => {
    let intervalId;

    const fetchBalances = async () => {
      const btcAddress = '1P5jycZKohMwvHZB8JYuLLMMBy73DoUeDx';
      const ethAddress = '0xc2c48ae6d42f17823c6263a57c5630821f88b912';
      const usdcContract = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eb48';
      const usdtAddress = 'TEf3uQxCRwnSK131nfGF7bJgW8pzcR4UU1';

      const etherscanApiKey = process.env.ETHERSCAN_API_KEY;
      const tronscanApiKey = process.env.TRON_PRO_API_KEY;

      const url = 'https://yacasidonaciones.com/.netlify/functions/donorsupport';

      // const start = new Date(2024, 8, 16);
      // start.setHours(0, 0, 0, 0);
      // const fromTimestamp = start.getTime();

      try {
        if (typeof window !== 'undefined') {
          const now = Date.now();
          const oneMinute = 60000; // 60,000 milisegundos

          const lastFetchTime = localStorage.getItem('lastFetchTime');
          const cachedBalancesString = localStorage.getItem('balances');
          const cachedBalances = cachedBalancesString ? JSON.parse(cachedBalancesString) : null;

          const shouldFetchData = () => {
            if (!cachedBalances) {
              return true;
            }
            const { sumTotal, transactionCount } = cachedBalances;
            return (
              sumTotal == null || sumTotal === 0 ||
              transactionCount == null || transactionCount === 0
            );
          };

          if (!shouldFetchData()) {
            if (lastFetchTime && now - lastFetchTime < oneMinute) {
              console.log('Usando datos en caché, ha pasado menos de 1 minuto desde la última obtención');
              setBalances(cachedBalances);
              return;
            }
          }
        } else {
          return;
        }
        
        const results = await Promise.allSettled([
          getDonorSupportData(url),
          getBitcoinBalance(btcAddress),
          getEthereumBalance(ethAddress, etherscanApiKey),
          getUsdcBalance(ethAddress, usdcContract, etherscanApiKey),
          getUsdtBalance(usdtAddress, tronscanApiKey),
          getCryptoPrices(),
        ]);
        const serverData = results[0].status === 'fulfilled' ? results[0].value : { raisedAmount: 0 };
        const btcBalance = results[1].status === 'fulfilled' ? results[1].value : 0;
        const ethBalance = results[2].status === 'fulfilled' ? results[2].value : 0;
        const usdcBalance = results[3].status === 'fulfilled' ? results[3].value : 0;
        const usdtBalance = results[4].status === 'fulfilled' ? results[4].value : 0;
        const prices = results[5].status === 'fulfilled' ? results[5].value : null;

        const btcTotal = btcBalance.btcTotal;
        const ethTotal = ethBalance.ethTotal;
        const usdcTotal = usdcBalance.usdcTotal;
        const usdtTotal = usdtBalance.usdtTotal;

        const btcPrice = prices?.bitcoin?.usd ?? 0;
        const ethPrice = prices?.ethereum?.usd ?? 0;
        const usdcPrice = prices?.['usd-coin']?.usd ?? 0;
        const usdtPrice = prices?.tether?.usd ?? 0;

        const btcUSD = btcTotal * btcPrice;
        const ethUSD = ethTotal * ethPrice;
        const usdcUSD = usdcTotal * usdcPrice;
        const usdtUSD = usdtTotal * usdtPrice;

        const btcCount = btcBalance.btcCount;
        const ethCount = ethBalance.ethCount;
        const usdcCount = usdcBalance.usdcCount;
        const usdtCount = usdtBalance.usdtCount;

        const fiatCount = serverData.totalRecentDonations;
        const cryptoCount = btcCount + ethCount + usdcCount + usdtCount;
        const totalTransactions = fiatCount + cryptoCount;

        const totalFiat = serverData.raisedAmount;
        const totalCrypto = btcUSD + ethUSD + usdcUSD + usdtUSD;
        
        const sumTotal = totalFiat + totalCrypto;
        const finalGoal = serverData.goalAmount;

        const newBalances = {
          sumTotal: sumTotal,
          finalGoal: finalGoal,
          transactionCount: totalTransactions,
          transactions: [],
          totalFiat: totalFiat,
          fiatCount: fiatCount,
          totalCrypto: totalCrypto,
          cryptoCount: cryptoCount
        };

        if (typeof window !== 'undefined') {
          localStorage.setItem('balances', JSON.stringify(newBalances));
          localStorage.setItem('lastFetchTime', Date.now().toString());
        }

        setBalances(newBalances);
      } catch (error) {
        console.error('Error al obtener los balances:', error);
      }
    };

    fetchBalances();

    intervalId = setInterval(fetchBalances, 120000);

    return () => clearInterval(intervalId);
  }, []);

  return balances;
};

export default useBalances;
