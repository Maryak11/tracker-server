import {
  Column,
  DataType,
  HasMany,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';
import { Tracks } from 'src/tracks/tracks.model.';

@Table({ tableName: 'pools' })
export class Pools extends Model<Pools> {
  @Column({
    type: DataType.STRING,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  dsn: string;

  // @HasMany(() => Tracks)
  // tracks: any;
}
