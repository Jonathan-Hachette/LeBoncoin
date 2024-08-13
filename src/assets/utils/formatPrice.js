// Fonction pour formater le prix
const formattedPrice = (price) => {
  return price.toLocaleString('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
}

export default formattedPrice
