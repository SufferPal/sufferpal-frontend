import React from 'react';
import DefaultTemplate from '../../templates/DefaultTemplate/DefaultTemplate';

const HomePage = () => {
  return <DefaultTemplate>HomePage</DefaultTemplate>;
};

export default HomePage;

// import { API, graphqlOperation } from 'aws-amplify';
// import { createUser } from './graphql/mutations';
// import { listUsers } from './graphql/queries';
// import HomePage from './pages/HomePage/HomePage';

// const initialState = { firstName: '', lastName: '', email: '' };

// const [formState, setFormState] = useState(initialState);
// const [users, setUsers] = useState([]);
// return <HomePage />;

// useEffect(() => {
// fetchUsers();
// }, []);

// function setInput(key, value) {
// setFormState({ ...formState, [key]: value });
// }

// async function fetchUsers() {
// try {
//     const userData = await API.graphql(graphqlOperation(listUsers));
//     const users = userData.data.listUsers.items;
//     setUsers(users);
// } catch (err) {
//     console.log('error fetching users');
// }
// }

// async function addUser() {
// try {
//     if (!formState.firstName || !formState.email || !formState.lastName) return;
//     const user = { ...formState };
//     setUsers([...users, user]);
//     setFormState(initialState);
//     await API.graphql(graphqlOperation(createUser, { input: user }));
// } catch (err) {
//     console.log('error creating user:', err);
// }
// }

// return (
// <div style={styles.container}>
//     <h2>Amplify Users</h2>
//     <input
//       onChange={(event) => setInput('firstName', event.target.value)}
//       style={styles.input}
//       value={formState.firstName}
//       placeholder="First Name"
//     />
//     <input
//       onChange={(event) => setInput('lastName', event.target.value)}
//       style={styles.input}
//       value={formState.lastName}
//       placeholder="Last Name"
//     />
//     <input
//       onChange={(event) => setInput('email', event.target.value)}
//       style={styles.input}
//       value={formState.email}
//       placeholder="Email"
//     />
//     <button style={styles.button} onClick={addUser}>
//       Create User
//     </button>
//     {users.map((user, index) => (
//       <div key={user.id ? user.id : index} style={styles.user}>
//         <p style={styles.userName}>{user.firstName}</p>
//         <p style={styles.userDescription}>{user.lastName}</p>
//       </div>
//     ))}
// </div>
// );

// const styles = {
// container: {
//     width: 400,
//     margin: '0 auto',
//     display: 'flex',
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     padding: 20,
// },
// todo: { marginBottom: 15 },
// input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
// todoName: { fontSize: 20, fontWeight: 'bold' },
// todoDescription: { marginBottom: 0 },
// button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' },
// };
