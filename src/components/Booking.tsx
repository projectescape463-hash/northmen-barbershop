import { useId, useState, type FormEvent } from "react"
import { services, timeSlots } from "../content"

type BookingProps = {
  serviceId: string
  onServiceId: (serviceId: string) => void
}

type FormState = {
  name: string
  phone: string
  date: string
  time: string
  comment: string
}

type FormErrors = Partial<Record<keyof FormState | "service", string>>

const emptyForm: FormState = {
  name: "",
  phone: "",
  date: "",
  time: "12:00",
  comment: "",
}

function todayInputValue() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${now.getFullYear()}-${month}-${day}`
}

function phoneDigits(value: string) {
  return value.replace(/\D/g, "")
}

function validate(form: FormState, serviceId: string): FormErrors {
  const errors: FormErrors = {}
  const name = form.name.trim()
  if (!/^[\p{L}\s-]{2,}$/u.test(name)) {
    errors.name = "Напишите имя — хотя бы два буквенных символа."
  }

  const digits = phoneDigits(form.phone)
  const phoneOk =
    (digits.length === 11 && (digits.startsWith("7") || digits.startsWith("8"))) ||
    (digits.length === 10 && digits.startsWith("9"))
  if (!phoneOk) {
    errors.phone = "Нужен телефон в формате +7 900 000-00-00."
  }

  if (!serviceId) errors.service = "Выберите услугу."

  if (!form.date) {
    errors.date = "Выберите день."
  } else {
    const [year, month, day] = form.date.split("-").map(Number)
    const chosen = new Date(year, month - 1, day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (Number.isNaN(chosen.getTime())) {
      errors.date = "Дата не читается."
    } else if (chosen < today) {
      errors.date = "Этот день уже прошёл."
    } else if (chosen.getDay() === 1) {
      errors.date = "По понедельникам зал закрыт."
    }
  }

  const service = services.find((item) => item.id === serviceId)
  if (service && form.time > service.lastStart) {
    errors.time = `Для «${service.name}» последнее время — ${service.lastStart}, иначе не уложимся до 21:00.`
  }

  return errors
}

export function Booking({ serviceId, onServiceId }: BookingProps) {
  const baseId = useId()
  const [form, setForm] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [done, setDone] = useState<FormState | null>(null)
  const service = services.find((item) => item.id === serviceId) ?? services[0]

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(form, service.id)
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return
    setDone(form)
  }

  return (
    <section className="booking" id="booking" aria-labelledby="booking-title">
      <div className="wrap booking-grid">
        <div className="booking-aside">
          <p className="section-index">08</p>
          <h2 id="booking-title">Запись</h2>
          <p>
            Выберите услугу, день и время. Форма проверяет поля в браузере и
            никуда их не отправляет: сервера записи у демонстрационного сайта нет.
          </p>
          <dl className="facts">
            <div>
              <dt>Адрес для макета</dt>
              <dd>Екатеринбург, ул. Вайнера, 12</dd>
            </div>
            <div>
              <dt>Часы</dt>
              <dd>Вт–Вс, 11:00–21:00. Пн — выходной.</dd>
            </div>
            <div>
              <dt>Телефон</dt>
              <dd>+7 (343) 000-00-00 — номер учебный, звонок не подключён.</dd>
            </div>
          </dl>
          <p className="booking-warn">
            По этому адресу ехать не нужно: заведения NORTHMEN не существует.
          </p>
        </div>
        <div className="form-card">
          {done ? (
            <div className="form-success" role="status">
              <p className="section-index">Готово на этом экране</p>
              <h3>Заявка собрана, но не отправлена</h3>
              <p>
                {done.name.trim()}, {service.name.toLowerCase()}, {done.date} в {done.time}.
                Телефон {done.phone} остался только в браузере и исчезнет, если обновить страницу.
              </p>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setDone(null)
                  setForm(emptyForm)
                }}
              >
                Заполнить ещё раз
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit}>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor={`${baseId}-name`}>Имя</label>
                  <input
                    id={`${baseId}-name`}
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? `${baseId}-name-error` : undefined}
                    onChange={(event) => update("name", event.target.value)}
                  />
                  {errors.name ? (
                    <p id={`${baseId}-name-error`} className="field-error">
                      {errors.name}
                    </p>
                  ) : null}
                </div>
                <div className="field">
                  <label htmlFor={`${baseId}-phone`}>Телефон</label>
                  <input
                    id={`${baseId}-phone`}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+7 900 000-00-00"
                    value={form.phone}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? `${baseId}-phone-error` : undefined}
                    onChange={(event) => update("phone", event.target.value)}
                  />
                  {errors.phone ? (
                    <p id={`${baseId}-phone-error`} className="field-error">
                      {errors.phone}
                    </p>
                  ) : null}
                </div>
                <div className="field field-wide">
                  <label htmlFor={`${baseId}-service`}>Услуга</label>
                  <select
                    id={`${baseId}-service`}
                    name="service"
                    value={service.id}
                    onChange={(event) => {
                      onServiceId(event.target.value)
                      setErrors((current) => ({ ...current, service: undefined, time: undefined }))
                    }}
                  >
                    {services.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} — {item.price}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor={`${baseId}-date`}>День</label>
                  <input
                    id={`${baseId}-date`}
                    name="date"
                    type="date"
                    min={todayInputValue()}
                    value={form.date}
                    aria-invalid={Boolean(errors.date)}
                    aria-describedby={errors.date ? `${baseId}-date-error` : undefined}
                    onChange={(event) => update("date", event.target.value)}
                  />
                  {errors.date ? (
                    <p id={`${baseId}-date-error`} className="field-error">
                      {errors.date}
                    </p>
                  ) : null}
                </div>
                <div className="field">
                  <label htmlFor={`${baseId}-time`}>Время</label>
                  <select
                    id={`${baseId}-time`}
                    name="time"
                    value={form.time}
                    aria-invalid={Boolean(errors.time)}
                    aria-describedby={errors.time ? `${baseId}-time-error` : undefined}
                    onChange={(event) => update("time", event.target.value)}
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  {errors.time ? (
                    <p id={`${baseId}-time-error`} className="field-error">
                      {errors.time}
                    </p>
                  ) : null}
                </div>
                <div className="field field-wide">
                  <label htmlFor={`${baseId}-comment`}>Комментарий, если нужен</label>
                  <textarea
                    id={`${baseId}-comment`}
                    name="comment"
                    rows={3}
                    value={form.comment}
                    onChange={(event) => update("comment", event.target.value)}
                    placeholder="Например: виски не выше середины уха"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-block">
                Проверить заявку
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
