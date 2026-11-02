const notes = [
  {
    title: "Форма",
    text: "Стрижка строится от затылка, висков и того, как волосы ложатся без укладки. Картинку из ленты можно взять за ориентир, но не за чертёж.",
  },
  {
    title: "Борода",
    text: "Кромка идёт по скуле и челюсти. Если длины не хватает на ровную линию, лучше оставить мягкий край, чем выбрить просветы.",
  },
  {
    title: "Инструмент",
    text: "После гостя — дезинфекция и стерилизация, не стакан с жидкостью «для вида». Опасную бритву раскрываем при вас.",
  },
]

export function Approach() {
  return (
    <section className="approach" id="approach" aria-labelledby="approach-title">
      <div className="wrap approach-layout">
        <div>
          <p className="section-index">06</p>
          <h2 id="approach-title">
            Сначала смотрим, как волосы лежат сами. Потом решаем, сколько снимать.
          </h2>
        </div>
        <ol className="notes">
          {notes.map((note, index) => (
            <li key={note.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{note.title}</h3>
                <p>{note.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
