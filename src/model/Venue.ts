import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Venue {
  @PrimaryColumn()
  id: number

  @Column('varchar', {
    length: 100
  })
  name: string

  @Column('float')
  latitude: number

  
  @Column('float')
  longitude: number
}