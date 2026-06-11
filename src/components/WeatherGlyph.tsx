import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Cloudy,
  Sun,
} from 'lucide-react'
import type { WeatherIcon } from '../lib/weather'

const map = {
  sun: Sun,
  'cloud-sun': CloudSun,
  cloud: Cloud,
  cloudy: Cloudy,
  fog: CloudFog,
  drizzle: CloudDrizzle,
  rain: CloudRain,
  snow: CloudSnow,
  thunder: CloudLightning,
} satisfies Record<WeatherIcon, typeof Sun>

export default function WeatherGlyph({
  icon,
  size = 24,
  className,
}: {
  icon: WeatherIcon
  size?: number
  className?: string
}) {
  const Icon = map[icon]
  return <Icon size={size} className={className} strokeWidth={1.6} />
}
