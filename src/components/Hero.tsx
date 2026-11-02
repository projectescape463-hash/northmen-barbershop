export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <p className="kicker">Барбершоп · Екатеринбург</p>
      <h1 id="hero-title" className="hero-title">
        <span>North</span>
        <span className="hero-title-em">men</span>
      </h1>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-lead">
            Стрижём, оформляем бороду и бреем опасной бритвой. Четыре кресла,
            один мастер от мытья до укладки и запись по времени, а не «кто
            освободится».
          </p>
          <a className="btn" href="#booking">
            Записаться
          </a>
          <p className="hero-meta">
            Вторник — воскресенье, 11:00–21:00
            <span>Понедельник — выходной</span>
          </p>
        </div>
        <figure className="hero-photo">
          <img
            src="/images/hero.jpg"
            alt="Оформление бороды ножницами: клиент в кресле, мастер держит подбородок"
            fetchPriority="high"
          />
          <figcaption>Борода ножницами. Кадр — иллюстрация характера работы, не съёмка этого зала.</figcaption>
        </figure>
      </div>
    </section>
  )
}
