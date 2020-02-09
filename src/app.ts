import express, { Application, Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import { getConcertInfos } from './controllers/searchController'
import R from 'ramda'

const app: Application = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send(`To search for concerts use the /concerts path with the following params:
  bandIds: string - Comma separated list of bandIds
  --- and/or ---
  latitude: float
  longitude: float
  radius: Int - In kilometers 
  `)
})

app.get('/concerts', (req: Request, res: Response) => {
  const params = req.query
  // TODO: Add a validator
  if (!params.bandIds && !params.latitude) {
    res.status(400).json({
      error: `At least one of the following is required:
    bandIds or latitude,longitude & radius`
    })
    return
  }
  const locationConstraints = [params.latitude, params.longitude, params.radius]
  if (locationConstraints.some(x => R.isNil(x)) && locationConstraints.some(x => !R.isNil(x))) {
    res.status(400).json({
      error: `You must provide all or none of the following fields: latitude,longitude & radius`
    })
    return
  }
  const bandIds = params.bandIds.split(',').map((x: string) => Number.parseInt(x))
  const results = getConcertInfos(bandIds, params.latitude, params.longitude, params.radius)
  res.send(results)
})

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`)
})
