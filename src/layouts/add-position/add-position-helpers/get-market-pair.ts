import { ref } from 'vue';

const getMarketPair = () => {
  const marketPair = ref('');

  const updateMarketPair = (newMarketPair: string) => {
    marketPair.value = newMarketPair;
  };

  const getSymbols = () => marketPair.value.split('/');

  return {
    marketPair,
    updateMarketPair,
    getSymbols,
  };
};

export default getMarketPair;
