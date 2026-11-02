const links = [
  { href: "#services", label: "Услуги" },
  { href: "#masters", label: "Мастера" },
  { href: "#gallery", label: "Работы" },
  { href: "#approach", label: "Подход" },
  { href: "#reviews", label: "Формулировки" },
  { href: "#booking", label: "Запись" },
]

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <a className="logo" href="#top">
            <span className="logo-mark" aria-hidden="true" />
            Northmen
          </a>
          <p>Мужской зал. Четыре кресла. Без золота на вывеске.</p>
        </div>
        <nav aria-label="Повтор разделов">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <p>Вт–Вс · 11:00–21:00</p>
      </div>
      <div className="wrap disclaimer">
        <p>
          Демонстрационный сайт для портфолио. NORTHMEN — вымышленный барбершоп.
          Имена мастеров, график, адрес, телефон и тексты в блоке «Как это могло
          бы звучать» не относятся к реальному заведению и реальным людям. Цены
          учебные. Фотографии взяты с{" "}
          <a href="https://unsplash.com" target="_blank" rel="noreferrer">
            Unsplash
          </a>{" "}
          и показывают характер работы, а не этот зал. Форма записи данные не
          отправляет.
        </p>
      </div>
    </footer>
  )
}
