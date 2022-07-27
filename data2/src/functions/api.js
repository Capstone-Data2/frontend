import axios from "axios";

const ip = process.env.REACT_APP_BACKEND_IP;

export async function getMatchesList(selected_rank) {
    var response = {}
    await axios
        .get(`${ip}/matches/`, {
            params: { rank: selected_rank },
        })
        .then(async (res) => {
            response = { match_list: res.data.matches, rank: selected_rank }
        })
        .catch((error) => {
            console.log(error);
        });
    return response
};

export async function getMatchDetails(match_id) {
    var response
    await axios
        .get(`${ip}/matches/${match_id}`
        )
        .then((res) => {
            if(res.status === 204){
                response = 'Match Not Found'
            }
            else{
                response = res.data
            }
        })
        .catch((error) => {
            console.log(error);
        });
    return response
}

export async function postMatch(match_id){
    var response
    await axios
        .post(`${ip}/matches/${match_id}`)
        .then((res) =>{
            if(res.status === 201){
                response = res
            }
            else{
                response = 'Error with the match'
            }
        })
        .catch((error) => {
            console.log(error)
        });
    return response
}

export async function getMatchLog(match_id) {
    var response
    await axios
        .get(`${ip}/matches/${match_id}/log`)
        .then((res) => {
            response = res.data
        })
        .catch((error) => {
            console.log(error)
        })
    return response
}

export async function getMatchCombatData(match_id) {
    var response
    await axios
        .get(`${ip}/matches/${match_id}/combatdata`)
        .then((res) => {
            response = res.data
        })
        .catch((error) => {
            console.log(error);
        });
    return response
}
export async function getMatchPerformance(match_id) {
    var response
    await axios
        .get(`${ip}/matches/${match_id}/performance`)
        .then((res) => {
            response = res.data
        })
        .catch((error) => {
            console.log(error)
        })
    return response
}

export async function getMatchVision(match_id) {
    var response
    await axios
        .get(`${ip}/matches/${match_id}/warddata`)
        .then((res) => {
            response = res.data
        })
        .catch((error) => {
            console.log(error)
        })
    return response
}

export async function getMatchRivals(match_id, hero_id) {
    var response
    await axios
        .get(`${ip}/matches/${match_id}/rivals/${hero_id}`)
        .then((res) => {
            response = res.data
        })
        .catch((error) => {
            console.log(error)
        })
    return response
}

export async function getMatchRivals(match_id, hero_id){
  var response
  await axios
      .get(`${ip}/matches/${match_id}/rivals/${hero_id}`)
      .then((res) => {
          response = res.data
      })
      .catch((error) =>{
          console.log(error)
      })
  return response
}

export async function getPlayerQuery(player){
    var response
    await axios
        .get(`https://api.opendota.com/api/search?q=${player}`)
        .then((res)=>{
            response = res.data
        })
        .catch((error)=>{
            console.log(error)
        }
}

export async function getProfileData(account_id) {
    var response = {}
    let endpoints = [
        `https://api.opendota.com/api/players/${account_id}`,
        `https://api.opendota.com/api/players/${account_id}/wl`,
        `https://api.opendota.com/api/players/${account_id}/recentMatches`,
        `https://api.opendota.com/api/players/${account_id}/heroes`,
        `https://api.opendota.com/api/players/${account_id}/peers`,
    ]
    await axios
        .all(endpoints.map(async (endpoint) => await axios.get(endpoint)))
        .then(res => {
            res.forEach((r, i) => {
                var key = endpoints[i].split("/").at(-1) === account_id ? "profile" : endpoints[i].split("/").at(-1)
                response[key] = r.data
            });
        })
    return response
}