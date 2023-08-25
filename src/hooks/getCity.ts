import { Cities, City } from "../types/City";
export default async function getCity(queryType: string, queryOption: string): Promise<Cities> {
    if (queryType === 'direct') {
        queryType = queryType + `?q=`
    } else {
        queryType = queryType + `?`
    }
    const result = await fetch(`https://api.openweathermap.org/geo/1.0/` + `${queryType}` + `${queryOption}` + `&limit=5&appid=` + `${process.env.OPENWEATHER_API_KEY}`)
    const response: Cities = await result.json()
    response.forEach((el, i) => {
        el.describe = `${el.name + ' ' + el.country + ' ' + el.state}`
        el.id = Date.now() + i * 3
    });
    return response
}
