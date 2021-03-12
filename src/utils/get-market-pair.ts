import { QuoteSymbol } from '@/store/modules/portfolio/types/types';
import { ref, Ref, watch } from 'vue';

const getMarketPair = () => {
  const marketPair = ref('');

  const updateMarketPair = (newMarketPair: string) => {
    marketPair.value = newMarketPair;
  };

  const getSymbols = () => marketPair.value.split('/').map(symbol => symbol.toUpperCase());

  const symbols = ref(['', '']) as Ref<[string, QuoteSymbol]>;
  const errorMessage = ref('');

  /*
  Fix: Throw Error if there is wrong input

  errorMessage = {
    type: 'market-pair',
    message: '...',
  };

  JSON.stringify(errorMessage);
  */
  const isValid = () => {
    const [symbol, quoteSymbol] = getSymbols();

    if (quoteSymbol !== 'USDT' && quoteSymbol !== 'BTC') {
      errorMessage.value = 'Supported quotes are USDT and BTC';
      return;
    }

    symbols.value = [symbol, quoteSymbol as QuoteSymbol];
    errorMessage.value = '';
  };

  watch(() => marketPair.value, (curr, prev) => {
    if (errorMessage.value.length && curr !== prev) {
      errorMessage.value = '';
    }
  });

  return {
    marketPair,
    updateMarketPair,
    getSymbols,
    symbols,
    errorMessage,
    isValid,
  };
};

export default getMarketPair;
