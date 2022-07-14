import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Pools } from 'src/pools/pools.model';

@Table({ tableName: 'tracks' })
export class Tracks extends Model<Tracks> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  content: string;

  @Column({
    type: DataType.ENUM('error', 'ingo', 'log'),
    defaultValue: 'error',
  })
  level: string;

  @ForeignKey(() => Pools)
  @Column({ type: DataType.TEXT, allowNull: false })
  poolId: string;
}
