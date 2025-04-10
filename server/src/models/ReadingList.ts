import { Model, DataTypes } from "sequelize";
import {sequelize} from "../config/connection.js";
// import { User } from "./user.js";
// import Book from "./book.js";

class ReadingList extends Model {
  public id!: number;
  public userId!: number;
  public bookId!: number;
  public status!: "reading" | "completed" | "wishlist";
}

ReadingList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "user", key: "id" },
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Books", key: "id" },
    },
    status: {
      type: DataTypes.ENUM("reading", "completed", "wishlist"),
      defaultValue: "wishlist",
    },
  },
  {
    sequelize,
    modelName: "ReadingList",
  }
);




export default ReadingList;
