import _superagent from "superagent";
import superagentPromise from "superagent-promise";


const superagent = superagentPromise(_superagent, global.Promise);

const getBody = res => res.body;

const API_ROOT = 'https://gorankaracic-rijekadevdays.azurewebsites.net';

const requests = {
    get: url =>
        superagent.get(`${API_ROOT}${url}`).use(apiPlugin).then(getBody),
    del: url =>
        superagent.del(`${API_ROOT}${url}`).use(apiPlugin).then(getBody),
    post: (url, body) =>
        superagent.post(`${API_ROOT}${url}`, body).use(apiPlugin).then(getBody)
};

const Speakers = {
    all: () =>
        requests.get(`/tables/Speaker`),
    del: id => 
        requests.del(`/tables/Speaker/${id}`),
    post: speaker =>
        requests.post(`/tables/Speaker`, speaker)
};


let apiPlugin = req => {
    req.set('zumo-api-version', '2.0.0')
};

export default {
    Speakers
};