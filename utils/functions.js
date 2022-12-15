const normalizeEntity = (entity) => {
  Object.keys(entity).forEach((key) => {
    if (typeof entity[key] === 'object') {
      entity[key] = JSON.stringify(entity[key])
    }
  })
  return entity
}

export { normalizeEntity }
