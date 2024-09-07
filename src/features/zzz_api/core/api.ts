import { mockApiAny } from '../mockApi/mockApiAny';

export const api = {
    get_m: (url) => mockApiAny(url, 'GET'),
    post_m: (url, payloadDummy) => mockApiAny(url, 'POST', payloadDummy),
}