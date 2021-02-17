import { ref } from 'vue';

const getEntries = () => {
  const entries = ref([{
    price: '',
    amount: '',
  }]);

  const updatePrice = (i: number, newPrice: string) => {
    entries.value[i].price = newPrice;
  };

  const updateAmount = (i: number, newAmount: string) => {
    entries.value[i].amount = newAmount;
  };

  const addEntry = () => {
    entries.value = [
      ...entries.value,
      {
        price: '',
        amount: '',
      },
    ];
  };

  const removeEntry = (i: number) => {
    entries.value.splice(i, 1);
  };

  const getEntryData = () => {
    const amount = entries.value.reduce((acc, { amount: _amount }) => acc + Number(_amount), 0);

    return {
      amount,
      averagePrice: entries.value.reduce((acc, { amount: _amount, price }) => Number(_amount) * Number(price) + acc, 0) / amount,
    };
  };

  return {
    entries,
    updatePrice,
    updateAmount,

    addEntry,
    removeEntry,

    getEntryData,
  };
};

export default getEntries;
