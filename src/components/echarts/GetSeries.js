function GetSeries(xAxisOption, yAxisOption, data, type, stack) {
  let series = []
  yAxisOption.map((d, i) => {
    let sery = {}
    sery.name = d
    sery.type = type
    sery.stack = stack
    sery.data = data.map((t) => t[i])
    series.push(sery)
  })
  return series
}

export default GetSeries
