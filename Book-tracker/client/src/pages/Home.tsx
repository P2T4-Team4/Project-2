// import { useState, useEffect, useLayoutEffect } from "react";
// import { retrieveUsers } from "../api/userAPI";
// import type { UserData } from "../interfaces/UserData";
// import ErrorPage from "./WantToRead";
// import UserList from '../components/Users';
// import auth from '../utils/auth';
import React from "react";
import GenreRow from "../components/GenreRow";


const genres = ['Fantasy', 'Science Fiction', 'Mystery', 'Thriller', 'Romance', 'Horror', 'Non-Fiction', 'Historical Fiction'];

const Home : React.FC = () => {
    return (
        <div className="home">
            <h1>Welcome to Book Tracker!</h1>
            <p>Explore your favorite genres:</p>
            <ul>
                {genres.map((genre, index) => (
                    <GenreRow key={index} genre={genre} />
                ))}
            </ul>
        </div>
    )
}

export default Home;

















//Old code; kept here in needed for login later

// const Home = () => {

//     const [users, setUsers] = useState<UserData[]>([]);
//     const [error, setError] = useState(false);
//     const [loginCheck, setLoginCheck] = useState(false);

//     useEffect(() => {
//         if (loginCheck) {
//             fetchUsers();
//         }
//     }, [loginCheck]);

//     useLayoutEffect(() => {
//         checkLogin();
//     }, []);

//     const checkLogin = () => {
//         if (auth.loggedIn()) {
//             setLoginCheck(true);
//         }
//     };

//     const fetchUsers = async () => {
//         try {
//             const data = await retrieveUsers();
//             setUsers(data)
//         } catch (err) {
//             console.error('Failed to retrieve tickets:', err);
//             setError(true);
//         }
//     }

//     if (error) {
//         return <ErrorPage />;
//     }

//     return (
//         <>
//             {
//                 !loginCheck ? (
//                     <div className='login-notice'>
//                         <h1>
//                             Login to see your Books!
//                         </h1>
//                     </div>
//                 ) : (
//                     <UserList users={users} />
//                 )}
//         </>
//     );
// };

// export default Home;
