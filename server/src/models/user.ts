import { DataTypes, Sequelize, Model, Optional,  } from 'sequelize';
import bcrypt from 'bcrypt';
import Book from './book';  

interface UserAttributes {
  id: number;
  username: string;
  password: string;
}

// Define the optional attributes for creating a new User
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User class extending Sequelize's Model
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  [x: string]: any;
  public id!: number;
  public username!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Method to hash and set the password for the user
  public async setPassword(password: string) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(password, saltRounds);
  }
  // Method to check if the provided password matches the hashed password
  public async checkPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

// Define the UserFactory function to initialize the User model
export function UserFactory(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      modelName: 'user',  // Name of the model
      tableName: 'user',  // Name of the table in PostgreSQL
      sequelize,            // The Sequelize instance that connects to PostgreSQL
      hooks: {
        
        beforeCreate: async (user: User) => {
          await user.setPassword(user.password);
        },
        
      }
    }
  );

  return User;  // Return the initialized User model
}

export function associateUserModels(UserModel: typeof User, BookModel: typeof Book) {
  // Want to Read association
  UserModel.belongsToMany(BookModel, {
    through: 'WantToRead',
    as: 'wantToReadBooks',
    foreignKey: 'userId',
  });

  // Read Books association
  UserModel.belongsToMany(BookModel, {
    through: 'ReadBooks',
    as: 'readBooks',
    foreignKey: 'userId',
  });
}