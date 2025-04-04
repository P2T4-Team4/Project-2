import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection";
import { User } from "./user";
import Book from "./book";

class ReadingList extends Model {
  public id!: string;
  public userId!: string;
  public bookId!: string;
  public status!: "reading" | "completed" | "wishlist";
}

ReadingList.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "Users", key: "id" },
    },
    bookId: {
      type: DataTypes.UUID,
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

User.hasMany(ReadingList, { foreignKey: "userId" });
Book.hasMany(ReadingList, { foreignKey: "bookId" });

export default ReadingList;
