import sequelize from '../config/connection.js'
import { UserFactory } from './user.js';
// import Book from './book.js';
// import ReadingList from './ReadingList.js';

const User = UserFactory(sequelize);

export { User };

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Database & tables created!');
    } catch (error) {
        console.error('Error creating database & tables:', error);
    }
};

export { sequelize, syncDatabase };

// add into export Book, ReadingList