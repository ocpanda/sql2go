import { xhr } from './xhr'

export const convertSqlToGo = ({ body }) => {
  const url = 'https://sql2goapi.ricestdiotech.com/sql2go'
  const dataRenameList = [
    ['sql', 'SQL'],
  ]
  const data = {}

  dataRenameList.forEach(([source, target]) => {
    if (source in body) data[target] = body[source]
  })

  return xhr({
    method: 'post',
    url,
    data,
  })
}