import Reveal from './Reveal'

type Props = {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  intro?: React.ReactNode
  align?: 'left' | 'center'
  light?: boolean
}

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  light = false,
}: Props) {
  const centered = align === 'center'
  return (
    <Reveal
      className={`max-w-2xl ${centered ? 'mx-auto text-center' : ''}`}
    >
      {eyebrow && (
        <span className={`eyebrow ${light ? 'text-gold-400' : ''}`}>
          <span className="h-px w-8 bg-current" />
          {eyebrow}
        </span>
      )}
      <h2
        className={`heading-display mt-4 text-4xl sm:text-5xl ${
          light ? 'text-cream-50' : 'text-moss-900'
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-5 text-lg leading-relaxed ${
            light ? 'text-cream-100/70' : 'text-moss-900/65'
          }`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  )
}
