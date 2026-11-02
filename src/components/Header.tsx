import { useEffect, useRef, useState } from "react"

const links = [
  { href: "#services", label: "Услуги" },
  { href: "#masters", label: "Мастера" },
  { href: "#gallery", label: "Работы" },
  { href: "#approach", label: "Подход" },
  { href: "#booking", label: "Запись" },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    if (open) firstLinkRef.current?.focus()
  }, [open])

  useEffect(() => {
    const media = window.matchMedia("(min-width: 981px)")
    const onChange = () => {
      if (media.matches) setOpen(false)
    }
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  function closeAndFocus() {
    setOpen(false)
    buttonRef.current?.focus()
  }

  return (
    <header className="header">
      <a className="skip" href="#main">
        К содержанию
      </a>
      <a className="logo" href="#top" aria-label="NORTHMEN, на первый экран">
        <span className="logo-mark" aria-hidden="true" />
        Northmen
      </a>
      <nav className="nav-desktop" aria-label="Разделы">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <p className="header-hours">Вт–Вс · 11:00–21:00</p>
      <div className="header-tools">
        <a className="header-book" href="#booking">
          Запись
        </a>
        <button
          ref={buttonRef}
          type="button"
          className="burger"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Закрыть меню" : "Открыть меню"}</span>
          <span className={open ? "burger-lines is-open" : "burger-lines"} aria-hidden="true" />
        </button>
      </div>
      {open ? (
        <nav
          id="mobile-menu"
          className="nav-mobile"
          aria-label="Разделы"
          onKeyDown={(event) => {
            if (event.key === "Escape") closeAndFocus()
          }}
        >
          {links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              ref={index === 0 ? firstLinkRef : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <p>Вт–Вс, 11:00–21:00. Понедельник — выходной.</p>
        </nav>
      ) : null}
    </header>
  )
}
