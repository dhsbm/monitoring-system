function GetSeries(xAxisOption: any, yAxisOption: any, data: any, type: any, stack: any) {
  const series: any = []
  yAxisOption.map((d: any, i: any) => {
    const sery: any = {}
    sery.name = d
    sery.type = type
    sery.stack = stack
    sery.data = data?.map((t: any) => t[i])
    series.push(sery)
  })
  return series
}

export default GetSeries
