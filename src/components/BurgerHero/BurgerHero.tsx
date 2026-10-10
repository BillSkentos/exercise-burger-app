import { imageUrl } from '../../api/images';
import './BurgerHero.css';

const FILLINGS = [
  { src: 'burger-patty.png', overlap: '-12%' },
  { src: 'bacon.png', overlap: '-12%' },
  { src: 'egg.png', overlap: '-15%' },
];

export function BurgerHero() {
  return (
    <div className="burger-hero">
      <img
        className="burger-hero__bun-top"
        src={imageUrl('bun_top.png')}
        alt="bun_top"
      />
      <div className="burger-hero__fillings">
        {FILLINGS.map((filling) => (
          <img
            key={filling.src}
            className="burger-hero__filling"
            src={imageUrl(filling.src)}
            alt={filling.src}
            style={{ marginBottom: filling.overlap }}
          />
        ))}
      </div>
      <img src={imageUrl('bun_bottom.png')} alt="bun_bottom" />
    </div>
  );
}
