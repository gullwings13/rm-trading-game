import Axios from 'axios'

export const queryAPI = async (queryString, cacheTime = 300) =>
{
    try
    {
        let data // final data from cache or live API call
        let cache = sessionStorage.getItem(queryString)
        let expire = sessionStorage.getItem(queryString + "-expire")
        let now = Date.now()
        let expiryMS = now - expire
        if (cache !== null && expiryMS < 0)
        {
            data = JSON.parse(cache)
            console.log("Cached API Request. Cache expires in " + (-expiryMS / 1000) + " seconds")
        }
        else
        {
            let results = await Axios.get(queryString)
            if (results.data !== null)
            {
                sessionStorage.setItem(queryString, JSON.stringify(results.data))
                if (cacheTime !== 0)
                {
                    let expire = now + cacheTime * 1000
                    sessionStorage.setItem(queryString + "-expire", expire)
                }
                data = results.data
                console.log("Live API Request")
            }
        }
        if (data !== null)
        {
            return (data)
        }
        else
        {
            console.log("Error: API did not return expected data, you may be over your limit. Try again in a minute")
        }

    }
    catch (error)
    {
        console.log(error)
    }
}