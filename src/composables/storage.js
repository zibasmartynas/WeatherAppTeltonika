export const loadForecasts = () => {
  return JSON.parse(localStorage.getItem('forecasts') || '[]')
}

export const saveForecasts = (data) => {
  localStorage.setItem('forecasts', JSON.stringify(data))
}