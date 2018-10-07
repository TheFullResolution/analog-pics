const PATH = 'pictures'

export const getPath = () => {
  const date = new Date()

  return `${PATH}/${date.getFullYear()}-${date.getMonth() +
    1}-${date.getDate()}-${date.getTime()}`
}
