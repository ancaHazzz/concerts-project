import 'reflect-metadata'
import { createConnection, getManager } from 'typeorm'
import fs from 'fs'
import path from 'path'
import { Concert } from './model/Concert'
import VenueRepository from './repository/VenueRepository';

async function queryFromFile(filePath: string) {
  const query = fs.readFileSync(path.join(__dirname, filePath), { encoding: 'UTF-8' })
  const response = await getManager().query(query)
  console.log(`SUCCESS: ${filePath} seeded. ${response.affectedRows} elements inserted`)
}

export async function init() {
  try {
    const connection = await createConnection()
    if (!(await connection.manager.findOne(Concert))) {
      await queryFromFile('./seed/bands.sql')
      await queryFromFile('./seed/venues.sql')
      await queryFromFile('./seed/concerts.sql')
    }
    await connection.getCustomRepository(VenueRepository).init()
  } catch (error) {
    console.error(error)
  }
}
