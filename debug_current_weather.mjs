import { json } from './server/scripts/modules/utils/fetch.mjs';
import { aggregateWeatherForecastData } from './server/scripts/modules/utils/weather.mjs';
import { getCurrentWeatherByHourFromTime } from './server/scripts/modules/currentweather.mjs';

async function main() {
  const url = 'https://api.open-meteo.com/v1/forecast?latitude=45.4642&longitude=9.1900&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,pressure_msl,surface_pressure,cloud_cover,visibility,evapotranspiration,et0_fao_evapotranspiration,vapour_pressure_deficit,uv_index,uv_index_clear_sky,is_day,sunshine_duration,wet_bulb_temperature_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=temperature_2m_max,uv_index_max,temperature_2m_min&models=best_match&timezone=auto';
  const point = await json(url);
  const forecast = aggregateWeatherForecastData(point);
  const data = { timeZone: point.timezone, forecast };
  const current = getCurrentWeatherByHourFromTime(data);
  console.log('timezone', point.timezone);
  console.log('now local', new Date().toString());
  console.log('selected time', current.time);
  console.log('selected local time', new Date(current.time).toString());
  console.log('is_day', current.is_day, 'weather_code', current.weather_code);
}

main().catch((e) => { console.error(e); process.exit(1); });
