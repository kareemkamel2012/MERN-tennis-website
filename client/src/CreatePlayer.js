// import React, {useEffect, useState} from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css'
//
// function CreatePlayer() {
//
//     const [data, setData] = useState([]);
//
//     useEffect(() => {
//         axios
//             .get('/players')
//             .then(res => res.data)
//             .then(data => setData(data));
//     }, []);
//
//     return (
//         <div className='container my-5' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
//             <h3>ATP Rankings</h3>
//             <table className='table table-striped'>
//                 <thead>
//                 <tr>
//                     <th>Name</th>
//                     <th>Ranking</th>
//                     <th>Country</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 { data.map(player => (
//                     <tr key={player.id}>
//                         <td>{player.player_name}</td>
//                         <td>{player.ranking}</td>
//                         <td>{player.country}</td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }
//
// export default ListPlayers;