export const mockApiAny = async (url, method, payloadDummy?) => {
    const host = '/mocks/data' 
    let postfix = '.json'

    if (method == 'POST') 
        postfix = '.POST.json'
    
    let full = host + url + postfix
    try {
        let resp = await fetch(full)
        let data = await resp.json()
        //console.log('🦢🦢🦢 mockApiAny', full, 'resp: ', data, 'payloadDummy: ', payloadDummy)
        return data
    } catch (e) {
        return {error: e}
    }
}