// Formateo el DATE a string
export const formatDate = (date: Date): string => {
  const options = {year: 'numeric', month: 'long', day: 'numeric'}

  return new Date(date).toLocaleDateString('es-ES', options)
}
