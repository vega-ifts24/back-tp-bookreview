// Formateo el DATE a string
export const formatDate = (date: string): string => {
  const newDate = new Date(date)
  const day = newDate.getDate()
  const month = newDate.getMonth() + 1
  const year = newDate.getFullYear()

  return `${day}/${month}/${year}`
}
