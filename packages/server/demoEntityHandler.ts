import getReflectionEntities from './graphql/mutations/helpers/getReflectionEntities'

const demoEntityHandler = async (req, res) => {
  if (!req.body || !Array.isArray(req.body.texts)) {
    res.sendStatus(404)
    return
  }
  const texts = req.body.texts as string[]

  const responses = await Promise.all(texts.map(getReflectionEntities))
  res.send(JSON.stringify(responses))
}

export default demoEntityHandler
