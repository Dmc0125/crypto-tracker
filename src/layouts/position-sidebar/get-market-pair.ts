import { QuoteSymbol } from '@/store/modules/portfolio/types/types';
import { ref, Ref, watch } from 'vue';

const getMarketPair = () => {
  const marketPair = ref('');

  const updateMarketPair = (newMarketPair: string) => {
    marketPair.value = newMarketPair.toUpperCase();
  };

  const getSymbols = () => marketPair.value.split('/').map(symbol => symbol);

  const symbols = ref(['', '']) as Ref<[string, QuoteSymbol]>;
  const errorMessage = ref('');

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
