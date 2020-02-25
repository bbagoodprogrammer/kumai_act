import axios from 'axios'
import { getUrlString } from '../utils'

const token = getUrlString('token');

function getGameInfo() {
    return axios.get(`/top_player/info.php?token=${token}`);
}

function uploadGameInfo(data) {
    return axios.get(`/top_player/upload.php?data=${data}&token=${token}`);
}

export {
    getGameInfo,
    uploadGameInfo,
}