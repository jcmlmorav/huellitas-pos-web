const currencyFormat = (number) => `$ ${ number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') }`;

export default currencyFormat;
