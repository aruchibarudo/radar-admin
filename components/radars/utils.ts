export const getRadarItemId = (id: string) => {
  if (!id.includes('_')) {
    return id
  }

  const [baseId] = id.split('_')

  return baseId
}
