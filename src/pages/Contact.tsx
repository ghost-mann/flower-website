import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Clock, Mail, MapPin, Phone, Send } from 'lucide-react'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { fadeUp, stagger, viewportOnce } from '../lib/motion'
import { company, img } from '../data/site'

const details = [
  { icon: MapPin, label: 'Visit the farm', value: company.address },
  { icon: Phone, label: 'Call us', value: company.phone, href: `tel:${company.phone.replace(/\s/g, '')}` },
  { icon: Mail, label: 'Email us', value: company.email, href: `mailto:${company.email}` },
  { icon: Clock, label: 'Office hours', value: 'Mon–Sat · 7:00–17:00 EAT' },
]

const initial = { name: '', email: '', company: '', interest: 'Standard Roses', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [sent, setSent] = useState(false)

  const update =
    (key: keyof typeof initial) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setForm(initial)
  }

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Let's grow something together"
        subtitle="Whether you're placing a standing order, planning a bespoke bouquet programme or just want to learn more — we'd love to hear from you."
        image={img.contact}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
      />

      <section className="py-24 lg:py-32">
        <div className="container-xl grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          {/* Details */}
          <div>
            <Reveal>
              <span className="eyebrow text-moss-500">
                <span className="h-px w-8 bg-current" />
                Get in touch
              </span>
              <h2 className="heading-display mt-4 text-4xl text-moss-900">
                Talk to the people who grow your flowers
              </h2>
              <p className="mt-5 text-moss-900/65">
                Our commercial team responds within one working day. For urgent availability,
                give us a call — someone is always on the farm.
              </p>
            </Reveal>

            <motion.ul
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="mt-10 space-y-4"
            >
              {details.map((d) => (
                <motion.li
                  key={d.label}
                  variants={fadeUp}
                  className="flex items-start gap-4 rounded-2xl border border-moss-100 bg-white p-5"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-moss-50 text-moss-600">
                    <d.icon size={22} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-moss-900/50">
                      {d.label}
                    </p>
                    {d.href ? (
                      <a href={d.href} className="mt-0.5 block font-medium text-moss-900 hover:text-moss-600">
                        {d.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 font-medium text-moss-900">{d.value}</p>
                    )}
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            <Reveal delay={0.1}>
              <div className="mt-6 overflow-hidden rounded-3xl border border-moss-100">
                <iframe
                  title="Farm location"
                  className="h-64 w-full grayscale-[0.2]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=36.30%2C-0.80%2C36.50%2C-0.65&layer=mapnik"
                />
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            <div className="rounded-[2rem] bg-moss-950 p-8 text-cream-50 sm:p-10">
              <h3 className="heading-display text-3xl">Send us a message</h3>
              <p className="mt-2 text-sm text-cream-100/60">
                Fields marked with <span className="text-rose-400">*</span> are required.
              </p>

              <form onSubmit={submit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name *">
                    <input
                      required
                      value={form.name}
                      onChange={update('name')}
                      className="input"
                      placeholder="Jane Florist"
                    />
                  </Field>
                  <Field label="Email *">
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={update('email')}
                      className="input"
                      placeholder="jane@florist.com"
                    />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Company">
                    <input
                      value={form.company}
                      onChange={update('company')}
                      className="input"
                      placeholder="Bloom & Co."
                    />
                  </Field>
                  <Field label="Interested in">
                    <select value={form.interest} onChange={update('interest')} className="input">
                      <option>Standard Roses</option>
                      <option>Spray Roses</option>
                      <option>Alstroemeria</option>
                      <option>Fillers &amp; Foliage</option>
                      <option>Bespoke Bouquets</option>
                      <option>General Enquiry</option>
                    </select>
                  </Field>
                </div>

                <Field label="Message *">
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={update('message')}
                    className="input resize-none"
                    placeholder="Tell us about your volumes, varieties and delivery market…"
                  />
                </Field>

                <button type="submit" className="btn-rose w-full">
                  {sent ? (
                    <>
                      <Check size={16} /> Message sent
                    </>
                  ) : (
                    <>
                      Send message <Send size={16} />
                    </>
                  )}
                </button>

                {sent && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-sm text-gold-400"
                  >
                    Thank you — we&apos;ll be in touch within one working day.
                  </motion.p>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-cream-100/70">
        {label}
      </span>
      {children}
    </label>
  )
}
