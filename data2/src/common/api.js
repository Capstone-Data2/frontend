import axios from "axios";


export async function getMatchDetails(match_id){
    var response
    await axios
        .get(`http://127.0.0.1:8000/matches/${match_id}`)
        .then((res) => {
            response = res.data
        })
        .catch((error) => {
            console.log(error);
        });
    return response
}

export async function getMatchLog(match_id){
    var response
    await axios
        .get(`http://127.0.0.1:8000/matches/${match_id}/log`)
        .then((res) => {
            response = res.data
        })
        .catch((error) =>{
            console.log(error)
        })
    return response
}

export async function getMatchCombatData(match_id){
    var response
    await axios
        .get(`http://127.0.0.1:8000/matches/${match_id}/combatdata`)
        .then((res) => {
            response = res.data
        })
        .catch((error) => {
            console.log(error);
        });
    return response
}