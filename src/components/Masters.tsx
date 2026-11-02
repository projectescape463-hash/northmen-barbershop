import { useState, type KeyboardEvent } from "react"
import { masters } from "../content"

export function Masters() {
  const [currentId, setCurrentId] = useState(masters[0].id)
  const current = masters.find((master) => master.id === currentId) ?? masters[0]

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = masters.findIndex((master) => master.id === currentId)
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "Home" && event.key !== "End") {
      return
    }
    event.preventDefault()
    let next = index
    if (event.key === "ArrowDown") next = (index + 1) % masters.length
    if (event.key === "ArrowUp") next = (index - 1 + masters.length) % masters.length
    if (event.key === "Home") next = 0
    if (event.key === "End") next = masters.length - 1
    const nextMaster = masters[next]
    setCurrentId(nextMaster.id)
    document.getElementById(`tab-${nextMaster.id}`)?.focus()
  }

  return (
    <section className="masters" id="masters" aria-labelledby="masters-title">
      <div className="wrap masters-layout">
        <figure className="master-figure">
          <img key={current.id} src={current.image} alt={current.alt} />
          <figcaption>Пример техники. Человек на фото — не сотрудник NORTHMEN.</figcaption>
        </figure>
        <div>
          <p className="section-index">04</p>
          <h2 id="masters-title">Кто стрижёт</h2>
          <p className="section-lead">
            Имена, специализация и график вымышлены для этого макета. Ниже —
            описание подхода, а не биографии реальных людей.
          </p>
          <div
            className="master-tabs"
            role="tablist"
            aria-label="Мастера"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
          >
            {masters.map((master) => {
              const selected = master.id === current.id
              return (
                <button
                  key={master.id}
                  id={`tab-${master.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="master-panel"
                  tabIndex={selected ? 0 : -1}
                  className="master-tab"
                  onClick={() => setCurrentId(master.id)}
                >
                  <span>{master.name}</span>
                  <small>{master.role}</small>
                </button>
              )
            })}
          </div>
          <div
            id="master-panel"
            role="tabpanel"
            aria-labelledby={`tab-${current.id}`}
            className="master-panel"
          >
            <p>{current.text}</p>
            <p className="master-days">
              В зале: <strong>{current.days}</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
