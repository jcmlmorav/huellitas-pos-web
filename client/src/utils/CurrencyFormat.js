const currencyFormat = (number) => `$ ${ (number).toFixed(0).replace(/\d(?=(\d{3}))/g, '$&.') }`;

export default currencyFormat;
