import { getDistance } from 'geolib'
import { Band } from '../types/Band'
import { Concert } from '../types/Concert'
import { Venue } from '../types/Venue'
import { ConcertInfo } from '../types/ConcertInfo'

const bands = require('../../data/bands.json') as Band[]
const concertsJson = require('../../data/concerts.json') as Concert[]
const venuesJson = require('../../data/venues.json') as Venue[]

const concertsSortedByDate = concertsJson.sort((c1, c2) => c2.date - c1.date)

function getConcertsByBandIds(bandIds: number[]) {
  if (!bandIds) {
    return concertsSortedByDate
  }
  return concertsSortedByDate.filter(concert => bandIds.includes(concert.bandId))
}

function getVenuesWithinRange(lat: number, lng: number, radiusKm: number) {
  if (!lat || !lng || !radiusKm) {
    return venuesJson
  }
  return venuesJson.filter(venue => getDistance(venue, { lat, lng }) < radiusKm * 1000)
}

export function getConcertInfos(bandIds: number[], lat: number, lng: number, radius: number) {
  let concerts = getConcertsByBandIds(bandIds)
  const venues = getVenuesWithinRange(lat, lng, radius)
  concerts = concerts.filter(concert => venues.some(venue => venue.id === concert.venueId))
  return concerts.map(concert => {
    const venue = venues.find(venue => venue.id === concert.venueId)
    const band = bands.find(band => band.id === concert.bandId)
    if (!venue || !band) {
      return
    }
    return {
      band: band.name,
      date: concert.date,
      location: venue.name,
      latitude: venue.latitude,
      longitude: venue.longitude
    } as ConcertInfo
  })
}
