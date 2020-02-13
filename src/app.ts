import express, { Application, Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import { getFilteredConcerts } from './controller/SearchController'
import { getArea, validateAreaParams } from './model/Area'
import * as db from './Database'

const app: Application = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
db.init()

app.get('/', (req: Request, res: Response) => {
  res.send(`To search for concerts use the /concerts path with the following params:
  bandIds: string - Comma separated list of bandIds
  --- and/or ---
  latitude: float
  longitude: float
  radius: int - In kilometers 
  `)
})

app.get('/concerts', async (req: Request, res: Response) => {
  try {
    if (!validateAreaParams(req.query)) {
      res.status(400).json({
        error: `You must provide all or none of the following fields: latitude: float, longitude: float, radius: int [km]`
      })
      return
    }
    // should also check the params type/format
    const bandIds = req.query.bandIds
    const area = getArea(req.query)
    if (!bandIds && !area) {
      res.status(400).json({
        error: `At least one of the following is required: bandIds or latitude,longitude & radius`
      })
      return
    }
    let results = await getFilteredConcerts(bandIds, area)
    res.send(results)
  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
})

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`)
})
