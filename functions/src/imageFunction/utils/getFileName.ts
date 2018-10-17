export const getFileName = function getFileNameFunc() {
  const date = new Date()

  return `${date.getFullYear()}-${date.getMonth() +
    1}-${date.getDate()}-${date.getTime()}`
}
