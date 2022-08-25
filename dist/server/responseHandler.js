const handleResponse = (response, next, results) => {
  if (results.error) {
    next(results)
  } else {
    response.json(results)
  }
}
module.exports = handleResponse