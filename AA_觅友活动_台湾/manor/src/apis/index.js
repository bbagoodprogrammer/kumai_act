import axios from 'axios'
import { getUrlString } from '../utils'

const token = getUrlString('token');

function plant(id, type) {
    return axios.get(`/jade_hare/plant.php?land_id=${id}&seed_type=${type}&token=${token}`);
}

function feed(id) {
    return axios.get(`/jade_hare/feed.php?land_id=${id}&token=${token}`);
}

export {
    plant,
    feed,
}