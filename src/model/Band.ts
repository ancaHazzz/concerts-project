import { PrimaryColumn, Entity, Column } from 'typeorm'

@Entity()
export class Band {
  @PrimaryColumn()
  id: number

  @Column('varchar', {
    length: 100
  })
  name: string
}
