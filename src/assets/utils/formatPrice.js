// Fonction pour formater le prix
const formatPrice = (price) => {
  return price.toLocaleString('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
}

export default formatPrice
