import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection";

class Book extends Model {
  public id!: string;
  public title!: string;
  public author!: string;
  public genre!: string;
  public cover!: string;
}

Book.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Book",
  }
);

export default Book;
