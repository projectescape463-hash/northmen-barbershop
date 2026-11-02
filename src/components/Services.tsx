import { services } from "../content"

type ServicesProps = {
  onPick: (serviceId: string) => void
}

export function Services({ onPick }: ServicesProps) {
  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <div className="wrap">
        <div className="section-heading section-heading-light">
          <p className="section-index">02</p>
          <div>
            <h2 id="services-title">Прайс</h2>
            <p className="section-lead">
              Шесть позиций. Время указано с запасом, чтобы не подгонять
              человека в кресле взглядом на часы.
            </p>
          </div>
        </div>
        <ol className="service-list">
          {services.map((service, index) => (
            <li key={service.id}>
              <button
                type="button"
                className="service-row"
                onClick={() => onPick(service.id)}
              >
                <span className="service-num">{String(index + 1).padStart(2, "0")}</span>
                <span className="service-name">{service.name}</span>
                <span className="service-price">{service.price}</span>
                <span className="service-text">
                  {service.text}
                  <span className="service-time">{service.minutes}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
        <p className="service-note">
          Нажмите строку — услуга подставится в форму записи ниже.
        </p>
      </div>
    </section>
  )
}
