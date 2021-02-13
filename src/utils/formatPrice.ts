// const formatPrice = (price: string, fixedLength: number) => {
//   const fixedPrice = Number(price).toFixed(fixedLength);

//   const fixedPriceString = String(fixedPrice);

//   const [preDecimal, decimal] = fixedPriceString.split('.');
//   let newDecimal = '';

//   for (let i = decimal.length - 1; i > 1; i--) {
//     if (decimal[i] === '0') {
//       // eslint-disable-next-line no-continue
//       continue;
//     }

//     newDecimal = decimal.slice(0, i);
//   }

//   console.log(newDecimal);

// };

// export default formatPrice;
