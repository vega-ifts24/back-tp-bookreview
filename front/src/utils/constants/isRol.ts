export const isRol = (type: string, rolId: number) => {
  if (rolId === 1 && type === 'admin') {
    return true
  }
  if (rolId === 2 && type === 'user') {
    return true
  }

  return false
}
