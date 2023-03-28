export const getUrlParams = (variable: any) => {
  const query = window.location.search.substring(1)
  const vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0] == variable) {
      return pair[1]
    }
  }
  return false
}
export const setActiveData = (myChart, dataLen: number) => {
  let currentIndex = -1
  let activeTooltip = setInterval(() => {
    console.log(dataLen)

    currentIndex = (currentIndex + 1) % dataLen

    myChart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: currentIndex,
    })
  }, 3000)
  myChart.on('mouseover', function () {
    clearInterval(activeTooltip)
  })
  myChart.on('mouseout', function () {
    activeTooltip = setInterval(() => {
      currentIndex = (currentIndex + 1) % dataLen

      myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: currentIndex,
      })
    }, 3000)
  })
}
