type errMessage = {
  type: 'market-pair' | 'price' | 'amount' | 'date';
  message: string;
}

const getError = (errMessage: unknown) => {
  if (typeof errMessage !== 'string') {
    console.log(errMessage);
    return {};
  }

  return JSON.parse(errMessage) as errMessage;
};

export default getError;
