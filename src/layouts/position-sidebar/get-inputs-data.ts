import { ref } from 'vue';
import { InputsData } from '@/components/position-input-group/types';

const getInputsData = () => {
  const values = ref([{
    price: '',
    amount: '',
  }]);

  const updateValues = (updatedEntries: InputsData[]) => {
    values.value = updatedEntries;
  };

  return {
    values,
    updateValues,
  };
};

export const getTotal = (entries: InputsData[]) => {
  const amount = entries.reduce((acc, { amount: _amount }) => acc + Number(_amount), 0);

  return {
    amount,
    averagePrice: entries.reduce((acc, { amount: _amount, price }) => Number(_amount) * Number(price) + acc, 0) / amount,
  };
};

export default getInputsData;
