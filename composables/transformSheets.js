export const transformSheet = sheet => {
  const data = {}
  sheet.values.forEach((col, i) => {
    let date
    col.forEach((v, j) => {
      const cel = v.trim().replaceAll(' ', '_')
      if (j === 0) data[cel] = {}
      else if (cel.includes('/')) {
        date = `date_${Object.keys(data[Object.keys(data)[i]]).length + 1}`
        if (cel.split('_').length === 3) {
          const splittedCel = cel.split('_')
          const maxPlayers = splittedCel[2].replace('(', '').replace(')', '')
          data[Object.keys(data)[i]][date] = { maxPlayers, day: `${splittedCel[0]}_${splittedCel[1]}` }
        } else data[Object.keys(data)[i]][date] = { day: cel, maxPlayers: 0 }
      } else {
        data[Object.keys(data)[i]][date].players = data[Object.keys(data)[i]][date].players
          ? [...data[Object.keys(data)[i]][date].players, v]
          : [v]
      }
    })
  })
  const range = {
    max: sheet.range.split('!')[1].split(':')[1],
    min: sheet.range.split('!')[1].split(':')[0],
  }
  return { sessions: data, range }
}
