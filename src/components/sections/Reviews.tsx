import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";
import { ReviewsSlider } from "../ReviewsSlider";

export function Reviews() {
  return (
    <section id="reviews" className="py-20 sm:py-28 bg-lav">
      <div className="container-x">
        <SectionHead eyebrow="Отзывы родителей" title="Нам доверяют самое дорогое" />
        <Reveal>
          <ReviewsSlider />
        </Reveal>
      </div>
    </section>
  );
}
