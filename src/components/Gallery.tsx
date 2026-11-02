import { useEffect, useRef, useState } from "react"
import { shots } from "../content"

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const current = index === null ? null : shots[index]

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (index !== null && !dialog.open) dialog.showModal()
  }, [index])

  useEffect(() => {
    if (index === null) return
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        event.preventDefault()
        setIndex((value) => (value === null ? value : (value + 1) % shots.length))
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        setIndex((value) =>
          value === null ? value : (value - 1 + shots.length) % shots.length,
        )
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [index])

  function close() {
    dialogRef.current?.close()
    setIndex(null)
  }

  return (
    <section className="gallery" id="gallery" aria-labelledby="gallery-title">
      <div className="wrap">
        <div className="section-heading">
          <p className="section-index">05</p>
          <div>
            <h2 id="gallery-title">Работы</h2>
            <p className="section-lead">
              Кадры с Unsplash показывают тип стрижки, а не гостей NORTHMEN.
              Нажмите фото, чтобы открыть крупнее.
            </p>
          </div>
        </div>
        <div className="gallery-grid">
          {shots.map((shot, shotIndex) => (
            <button
              key={shot.id}
              type="button"
              className={`shot ${shot.className}`}
              onClick={() => setIndex(shotIndex)}
            >
              <img src={shot.src} alt="" loading="lazy" />
              <span className="shot-caption">{shot.caption}</span>
              <span className="sr-only">{shot.alt}. Открыть крупнее</span>
            </button>
          ))}
        </div>
      </div>
      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label="Просмотр работы"
        onClose={() => setIndex(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close()
        }}
      >
        {current ? (
          <>
            <img src={current.src} alt={current.alt} />
            <div className="lightbox-bar">
              <p>
                {current.caption}
                <span>
                  {index! + 1} / {shots.length}
                </span>
              </p>
              <div className="lightbox-actions">
                <button
                  type="button"
                  onClick={() =>
                    setIndex((value) =>
                      value === null ? value : (value - 1 + shots.length) % shots.length,
                    )
                  }
                >
                  Назад
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setIndex((value) => (value === null ? value : (value + 1) % shots.length))
                  }
                >
                  Дальше
                </button>
                <button type="button" onClick={close}>
                  Закрыть
                </button>
              </div>
            </div>
          </>
        ) : null}
      </dialog>
    </section>
  )
}
