// Fonction pour formater la date
const formatDate = (isoDate) => {
  const date = new Date(isoDate)

  const day = String(date.getDate()).padStart(2, '0') // Jour avec 2 chiffres
  const month = String(date.getMonth() + 1).padStart(2, '0') // Mois avec 2 chiffres (les mois commencent à 0)
  const year = date.getFullYear() // Année en 4 chiffres

  return `${day}/${month}/${year}`
}

export default formatDate
