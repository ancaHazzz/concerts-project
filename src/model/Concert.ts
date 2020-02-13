import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm'
import { Band } from './Band';
import { Venue } from './Venue';

@Entity()
export class Concert {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => Band)
  @JoinColumn({name: 'band_id'})
  band: Band

  @ManyToOne(type => Venue)
  @JoinColumn({name: 'venue_id'})
  venue: Venue

  @Column('bigint')
  date: number
}
