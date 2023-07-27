const Api_key = '487a9702c203205cb10f8996baf22901';
const getDataFromateed = async (city, units = "metric") => {
    const Url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_key}&units=${units}`;
    const data = await fetch(Url)
        .then((res) => res.json())
        .then((data) => data);
        
    const { name, main: { feels_like, humidity, pressure, temp, temp_max, temp_min }, weather, wind: { speed }, sys: { country } } = data;
    const { description, icon } = weather[0];
   function makeIcon(iconId)
   {
        const url =  `https://openweathermap.org/img/wn/${iconId}.png`;
        return url;  
   }
    return {
        name,
        description,
        iconUrl :makeIcon(icon),
        feels_like,
        humidity,
        pressure,
        temp,
        temp_max,
        temp_min,
        country,
        speed
    }

}


export { getDataFromateed };