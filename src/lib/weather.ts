// ──────────────────────────────────────────────────────────────
// Open-Meteo client — free, keyless, CORS-enabled weather data.
// Coordinates point at the farm (Naivasha, Rift Valley, Kenya).
// ──────────────────────────────────────────────────────────────

export const FARM_LOCATION = {
  label: 'Naivasha, Rift Valley · Kenya',
  latitude: -0.717,
  longitude: 36.433,
  timezone: 'Africa/Nairobi',
}

export type CurrentWeather = {
  temperature: number
  apparent: number
  humidity: number
  precipitation: number
  windSpeed: number
  windDirection: number
  pressure: number
  isDay: boolean
  code: number
  time: string
}

export type DailyForecast = {
  date: string
  code: number
  tempMax: number
  tempMin: number
  precipProbability: number
  windMax: number
  sunrise: string
  sunset: string
}

export type WeatherData = {
  current: CurrentWeather
  daily: DailyForecast[]
}

const API = 'https://api.open-meteo.com/v1/forecast'

export async function fetchWeather(signal?: AbortSignal): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: String(FARM_LOCATION.latitude),
    longitude: String(FARM_LOCATION.longitude),
    timezone: FARM_LOCATION.timezone,
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,is_day',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,sunrise,sunset',
    forecast_days: '7',
  })

  // Abort the request if it hangs (e.g. a network that silently drops it),
  // while still honouring any caller-provided abort signal.
  const timeout = AbortSignal.timeout(9000)
  const merged = signal ? AbortSignal.any([signal, timeout]) : timeout

  const res = await fetch(`${API}?${params}`, { signal: merged })
  if (!res.ok) throw new Error(`Weather request failed (${res.status})`)
  const json = await res.json()
  if (!json?.current || !json?.daily) throw new Error('Unexpected weather payload')

  const c = json.current
  const d = json.daily

  return {
    current: {
      temperature: Math.round(c.temperature_2m),
      apparent: Math.round(c.apparent_temperature),
      humidity: Math.round(c.relative_humidity_2m),
      precipitation: c.precipitation,
      windSpeed: Math.round(c.wind_speed_10m),
      windDirection: c.wind_direction_10m,
      pressure: Math.round(c.surface_pressure),
      isDay: c.is_day === 1,
      code: c.weather_code,
      time: c.time,
    },
    daily: d.time.map((date: string, i: number) => ({
      date,
      code: d.weather_code[i],
      tempMax: Math.round(d.temperature_2m_max[i]),
      tempMin: Math.round(d.temperature_2m_min[i]),
      precipProbability: d.precipitation_probability_max?.[i] ?? 0,
      windMax: Math.round(d.wind_speed_10m_max[i]),
      sunrise: d.sunrise[i],
      sunset: d.sunset[i],
    })),
  }
}

// ── WMO weather-code interpretation ───────────────────────────
export type WeatherMeta = {
  label: string
  icon: WeatherIcon
  // Gradient used for the hero card background (day variant)
  gradient: string
}

export type WeatherIcon =
  | 'sun'
  | 'cloud-sun'
  | 'cloud'
  | 'cloudy'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'thunder'

export function describeWeather(code: number, isDay = true): WeatherMeta {
  const sunny = isDay
    ? 'from-amber-400 via-orange-400 to-rose-400'
    : 'from-indigo-900 via-slate-800 to-slate-900'

  const map: Record<number, WeatherMeta> = {
    0: { label: 'Clear sky', icon: 'sun', gradient: sunny },
    1: { label: 'Mainly clear', icon: 'cloud-sun', gradient: sunny },
    2: { label: 'Partly cloudy', icon: 'cloud-sun', gradient: 'from-sky-400 via-cyan-400 to-teal-400' },
    3: { label: 'Overcast', icon: 'cloudy', gradient: 'from-slate-400 via-slate-500 to-slate-600' },
    45: { label: 'Fog', icon: 'fog', gradient: 'from-slate-300 via-slate-400 to-slate-500' },
    48: { label: 'Rime fog', icon: 'fog', gradient: 'from-slate-300 via-slate-400 to-slate-500' },
    51: { label: 'Light drizzle', icon: 'drizzle', gradient: 'from-sky-500 via-cyan-500 to-teal-500' },
    53: { label: 'Drizzle', icon: 'drizzle', gradient: 'from-sky-500 via-cyan-500 to-teal-500' },
    55: { label: 'Dense drizzle', icon: 'drizzle', gradient: 'from-sky-600 via-cyan-600 to-teal-600' },
    56: { label: 'Freezing drizzle', icon: 'drizzle', gradient: 'from-sky-600 via-cyan-600 to-teal-600' },
    57: { label: 'Freezing drizzle', icon: 'drizzle', gradient: 'from-sky-600 via-cyan-600 to-teal-600' },
    61: { label: 'Light rain', icon: 'rain', gradient: 'from-blue-500 via-sky-600 to-indigo-600' },
    63: { label: 'Rain', icon: 'rain', gradient: 'from-blue-600 via-sky-700 to-indigo-700' },
    65: { label: 'Heavy rain', icon: 'rain', gradient: 'from-blue-700 via-indigo-700 to-slate-800' },
    66: { label: 'Freezing rain', icon: 'rain', gradient: 'from-blue-600 via-sky-700 to-indigo-700' },
    67: { label: 'Freezing rain', icon: 'rain', gradient: 'from-blue-600 via-sky-700 to-indigo-700' },
    71: { label: 'Light snow', icon: 'snow', gradient: 'from-slate-200 via-sky-200 to-indigo-200' },
    73: { label: 'Snow', icon: 'snow', gradient: 'from-slate-200 via-sky-200 to-indigo-200' },
    75: { label: 'Heavy snow', icon: 'snow', gradient: 'from-slate-200 via-sky-200 to-indigo-200' },
    77: { label: 'Snow grains', icon: 'snow', gradient: 'from-slate-200 via-sky-200 to-indigo-200' },
    80: { label: 'Rain showers', icon: 'rain', gradient: 'from-blue-500 via-sky-600 to-indigo-600' },
    81: { label: 'Rain showers', icon: 'rain', gradient: 'from-blue-600 via-sky-700 to-indigo-700' },
    82: { label: 'Violent showers', icon: 'rain', gradient: 'from-blue-700 via-indigo-700 to-slate-800' },
    85: { label: 'Snow showers', icon: 'snow', gradient: 'from-slate-200 via-sky-200 to-indigo-200' },
    86: { label: 'Snow showers', icon: 'snow', gradient: 'from-slate-200 via-sky-200 to-indigo-200' },
    95: { label: 'Thunderstorm', icon: 'thunder', gradient: 'from-indigo-700 via-purple-800 to-slate-900' },
    96: { label: 'Thunderstorm', icon: 'thunder', gradient: 'from-indigo-700 via-purple-800 to-slate-900' },
    99: { label: 'Severe storm', icon: 'thunder', gradient: 'from-indigo-800 via-purple-900 to-slate-950' },
  }

  return map[code] ?? { label: 'Unknown', icon: 'cloud', gradient: 'from-slate-400 to-slate-600' }
}

// Representative highland conditions used when the live feed is unreachable
// (offline, blocked network, timeout). Dates are generated from "today" so the
// 7-day strip always lines up with the real calendar.
export function fallbackWeather(): WeatherData {
  const today = new Date()
  const iso = (d: Date) => d.toISOString().slice(0, 10)
  const at = (d: Date, h: number, m: number) => {
    const x = new Date(d)
    x.setHours(h, m, 0, 0)
    return x.toISOString()
  }

  const pattern = [
    { code: 2, max: 24, min: 12, precip: 10, wind: 12 },
    { code: 3, max: 23, min: 12, precip: 25, wind: 14 },
    { code: 61, max: 21, min: 13, precip: 70, wind: 16 },
    { code: 80, max: 22, min: 12, precip: 55, wind: 15 },
    { code: 1, max: 25, min: 11, precip: 5, wind: 10 },
    { code: 2, max: 24, min: 12, precip: 15, wind: 11 },
    { code: 45, max: 23, min: 12, precip: 20, wind: 9 },
  ]

  const daily: DailyForecast[] = pattern.map((p, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    return {
      date: iso(d),
      code: p.code,
      tempMax: p.max,
      tempMin: p.min,
      precipProbability: p.precip,
      windMax: p.wind,
      sunrise: at(d, 6, 28),
      sunset: at(d, 18, 41),
    }
  })

  return {
    current: {
      temperature: 23,
      apparent: 23,
      humidity: 58,
      precipitation: 0,
      windSpeed: 12,
      windDirection: 120,
      pressure: 1014,
      isDay: true,
      code: 2,
      time: new Date().toISOString(),
    },
    daily,
  }
}

export function compassDirection(deg: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return dirs[Math.round(deg / 45) % 8]
}
