import { Star } from "lucide-react";

export default function renderStars(rating: number) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <Star key={i} size={20} className="text-yellow-500 fill-current" />
      );
    } else if (rating + 0.5 >= i) {
      stars.push(
        <Star
          key={i}
          size={20}
          className="text-yellow-500 fill-current opacity-50"
        />
      );
    } else {
      stars.push(<Star key={i} size={20} className="text-gray-300" />);
    }
  }
  return stars;
};
