import { getManager } from 'typeorm'
import VenueRepository from '../repository/VenueRepository'
import { Area } from '../model/Area'
import { getDistance } from 'geolib';
import { ConcertInfo } from '../model/ConcertInfo';

async function getConcertsByBandIds(bandIds: string) {
  // bandIds should be in the 'params' parameter, I know (same for venueIds)
  return await getManager().query(
    `SELECT b.name AS band, c.date, v.name AS location, v.latitude, v.longitude FROM concert c 
    JOIN band b ON c.band_id = b.id 
    JOIN venue v ON c.venue_id = v.id 
    WHERE b.id IN (${bandIds}) ORDER BY c.date DESC`
  ) as ConcertInfo[]
}

async function getConcertsWithinArea(area: Area) {
  const venueRepo = getManager().getCustomRepository(VenueRepository)
  const venueIds = venueRepo.getVenuesWithinArea(area).map(venue => venue.id).join(','))
  if(!venueIds) {
    return []
  }
  return (await getManager().query(
    `SELECT b.name AS band, c.date, v.name AS location, v.latitude, v.longitude FROM concert c 
    JOIN band b ON c.band_id = b.id 
    JOIN venue v ON c.venue_id = v.id 
    WHERE v.id IN (${venueIds}) ORDER BY c.date DESC`
  )) as ConcertInfo[]
}

export async function getFilteredConcerts(bandIds: string, area?: Area) {
  if (bandIds && area) {
    const concertsByBandIds = await getConcertsByBandIds(bandIds)
    return concertsByBandIds.filter(concert => getDistance(concert, area) < area.radius * 1000)
  } else if (bandIds) {
    return getConcertsByBandIds(bandIds)
  } else if (area) {
    return getConcertsWithinArea(area)
  }
}
