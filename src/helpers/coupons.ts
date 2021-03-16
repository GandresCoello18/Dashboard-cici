export const renderSource = (type: string) => {
  switch (type) {
    case '15% Descuento':
      return 'descuento.svg';
    case 'Envio gratis':
      return 'shipping.svg';
    case '+ 1 favorito':
      return 'favorite.svg';
    default:
      return '';
  }
};
