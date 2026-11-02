import { useState } from "react"
import { Approach } from "./components/Approach"
import { Booking } from "./components/Booking"
import { Footer } from "./components/Footer"
import { Gallery } from "./components/Gallery"
import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { Masters } from "./components/Masters"
import { Reviews } from "./components/Reviews"
import { Services } from "./components/Services"
import { Studio } from "./components/Studio"
import { services } from "./content"

export default function App() {
  const [serviceId, setServiceId] = useState(services[0].id)

  function pickService(id: string) {
    setServiceId(id)
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    document.getElementById("booking")?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
    })
  }

  return (
    <>
      <Header />
      <main id="main">
        <div id="top">
          <Hero />
        </div>
        <Services onPick={pickService} />
        <Studio />
        <Masters />
        <Gallery />
        <Approach />
        <Reviews />
        <Booking serviceId={serviceId} onServiceId={setServiceId} />
      </main>
      <Footer />
    </>
  )
}
