import { EntityRepository, Repository } from 'typeorm'
import { Venue } from '../model/Venue'
import { getDistance } from 'geolib'
import { Area } from '../model/Area'

@EntityRepository(Venue)
export default class VenueRepository extends Repository<Venue> {
  static venues: Venue[]

  public async init() {
    VenueRepository.venues = await this.find()
  }

  /** Returns venues filtered by a maximum radius from the given coords */
  public getVenuesWithinArea(area: Area) {
    return VenueRepository.venues.filter(venue => getDistance(venue, area) < area.radius * 1000)
  }
}
