import {sequelize} from '../config/connection.js'
import { UserFactory } from './user.js';
import Book from './book.js';
import ReadingList from './ReadingList.js';

const User = UserFactory(sequelize);

User.hasMany(ReadingList, { foreignKey: "userId" });
Book.hasMany(ReadingList, { foreignKey: "bookId" });
ReadingList.belongsTo(User, { foreignKey: "userId" });
ReadingList.belongsTo(Book, { foreignKey: "bookId" });


// export { User };

// const syncDatabase = async () => {
//     try {
//         await sequelize.sync({ force: true });
//         console.log('Database & tables created!');
//     } catch (error) {
//         console.error('Error creating database & tables:', error);
//     }
// };

export { sequelize, User, ReadingList, Book };

