import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
     @PrimaryKey
     @AutoIncrement
     @Column({
          type: DataType.INTEGER,
     })
     UserId: number;

     @Column({
          type: DataType.STRING,
          allowNull: false,
          unique: true,
     })
     EmailId: string;

     @Column({
          type: DataType.STRING,
          allowNull: true,
     })
     Password: string;

     @Column({
          type: DataType.STRING,
          allowNull: true,
     })
     MobileNo: string;

     @Column({
          type: DataType.BOOLEAN,
          defaultValue: true,
     })
     isActive: boolean;

     @CreatedAt
     @Column({
          type: DataType.DATE,
     })
     CreatedAt: Date;

     @UpdatedAt
     @Column({
          type: DataType.DATE,
     })
     UpdatedAt: Date;
}
