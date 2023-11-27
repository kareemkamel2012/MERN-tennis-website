import React, {useEffect, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import editSymbol from "./edit.png";
import deleteSymbol from "./delete.png";

function toggleEdit(id) {
    const row = document.getElementById("row" + id);
    if (row.classList.contains('editable')) {
        row.classList.remove('editable');
        row.classList.add('fixed');
    }
    else {
        row.classList.remove('fixed');
        row.classList.add('editable');
    }
}
function ListPlayers() {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('/players')
            .then(res => res.data)
            .then(data => setData(data));
    }, []);

    const styles = {
        tableImage: {
            width: '2em',
            height: '2em'
        },
        tableButton: {
            className: 'btn btn-outline-primary btm-sm',
            backgroundColor: 'transparent'
        },
        secretInput: {
            backgroundColor: 'transparent',
            border: '0px',
            outline: 'none',
            mozAppearance: 'textfield',
            appearance: 'textfield'
        }
    }
    return (
        <div className='container my-5' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <h1>ATP Rankings</h1>
            <table className='table table-striped'>
                <thead className="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Ranking</th>
                        <th>Country</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                { data.map(player => (
                    <tr className="fixed" key={player.id} id={"row" + player.id}>
                        <td>
                            <input type="text" defaultValue={player.player_name}></input>
                        </td>
                        <td>
                            <input style={{width: '4em'}} type="number" defaultValue={player.ranking}></input>
                        </td>
                        <td>
                            <input type="text" defaultValue={player.country}></input>
                        </td>
                        <td style={{ display: 'flex'}}>
                            <button style={Object.assign({border: 'none'}, styles.tableButton)} onClick={() => toggleEdit(player.id)}>
                                <img style={styles.tableImage} src={editSymbol} alt="edit player"></img>
                            </button>
                            <button style={Object.assign({border: 'none'}, styles.tableButton)}>
                                <img style={styles.tableImage} src={deleteSymbol} alt="delete player"></img>
                            </button>
                        </td>
                    </tr>
                ))}
                    <tr key="addPlayer">
                        <td>Add a player?</td>
                        <td>
                            <input type="number"></input>
                        </td>
                        <td>
                            <input type="text"></input>
                        </td>
                        <td>
                            <button className='btn btn-outline-primary btm-sm rounded-0'>Add to table!</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ListPlayers;