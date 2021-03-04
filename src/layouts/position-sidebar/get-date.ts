import { ref } from 'vue';

const getDate = () => {
  const date = ref('');

  const updateDate = (newDate: string) => {
    date.value = newDate;
  };

  return {
    date,
    updateDate,
  };
};

export default getDate;
