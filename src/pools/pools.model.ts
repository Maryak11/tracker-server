import { Column, DataType, Index, Model, Table } from 'sequelize-typescript';

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
}
