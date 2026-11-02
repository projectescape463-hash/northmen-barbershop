import { reviews } from "../content"

export function Reviews() {
  return (
    <section className="reviews" id="reviews" aria-labelledby="reviews-title">
      <div className="wrap">
        <p className="section-index">07</p>
        <h2 id="reviews-title">Как это могло бы звучать</h2>
        <p className="reviews-note">
          Ниже — черновики формулировок для макета. Это не отзывы реальных
          гостей, не оценки с карт и не цитаты из переписки.
        </p>
        <div className="quotes">
          {reviews.map((review) => (
            <blockquote key={review.id} className="quote">
              <p>{review.text}</p>
              <footer>{review.who}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
