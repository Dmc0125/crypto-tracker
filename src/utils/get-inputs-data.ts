import { ref } from 'vue';

import { InputsData } from '@/components/position-input-group/types';

import round from './round';

export type UpdateFns = {
  price: (i: number, newPrice: string) => void;
  amount: (i: number, newAmount: string) => void;
  date: (i: number, newDate: string) => void;
  addInputData: () => void;
  removeInputData: (i: number) => void;
  clearInputsData: () => void;
}

const getInputsData = () => {
  const data = ref<InputsData[]>([{
    price: '',
    amount: '',
    date: '',
  }]);

  const update: UpdateFns = {
    price(i: number, newPrice: string) {
      data.value[i].price = newPrice;
    },
    amount(i: number, newAmount: string) {
      data.value[i].amount = newAmount;
    },
    date(i: number, newDate: string) {
      data.value[i].date = newDate;
    },

    addInputData() {
      data.value = [
        ...data.value,
        {
          price: '',
          amount: '',
          date: '',
        },
      ];
    },
    removeInputData(i: number) {
      data.value = data.value.slice(0, i).concat(data.value.slice(i + 1));
    },

    clearInputsData() {
      data.value = [{
        price: '',
        amount: '',
        date: '',
      }];
    },
  };

  const getValues = () => data.value.map(({ price, amount, date }) => ({
    price: round(price),
    amount: round(amount),
    size: round(String(Number(price) * Number(amount))),
    date: new Date(date),
  }));

  return {
    values: data,
    update,

    getValues,
  };
};

export default getInputsData;
