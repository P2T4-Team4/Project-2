import { Model, DataTypes } from "sequelize";
import {sequelize} from "../config/connection.js";
import { User } from "./user.js";

class Book extends Model {
  public id!: string;
  public title!: string;
  public author!: string;
  public genre!: string;
  public coverImageUrl!: string;
  public description!: string;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.INTEGER,
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
    coverImageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Book",
  }
);

export function associateBookModels(BookModel: typeof Book, UserModel: typeof User) {
  // "Want to Read" relationship
  BookModel.belongsToMany(UserModel, {
    through: "WantToRead",
    foreignKey: "bookId",
    as: "usersWantToRead",
  });

  // "Read Books" relationship
  BookModel.belongsToMany(UserModel, {
    through: "ReadBooks",
    foreignKey: "bookId",
    as: "usersReadBooks",
  });
}


export default Book;
