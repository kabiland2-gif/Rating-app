import { useState } from "react";
import "./Rating.css";

const categories = [
  "Cleanliness",
  "Rooms",
  "Service",
  "Location",
];

export default function Rating() {
  const [current, setCurrent] = useState(0);
  const [ratings, setRatings] = useState({});
  const [summary, setSummary] = useState(false);

  const handleRating = (value) => {
    const updatedRatings = {
      ...ratings,
      [categories[current]]: value,
    };
    setRatings(updatedRatings);

    if (current < categories.length - 1) {
      setTimeout(() => setCurrent(current + 1), 400);
    } else {
      localStorage.setItem(
        "hotelRatings",
        JSON.stringify(updatedRatings)
      );
      setTimeout(() => setSummary(true), 400);
    }
  };

  const average =
    Object.values(ratings).reduce((a, b) => a + b, 0) /
      categories.length || 0;

  // ✅ SUMMARY PAGE
  if (summary) {
    return (
      <div className="rating-container">
        <h1>Hotel Rating Summary</h1>

        <div className="summary-box">
          {categories.map((cat) => (
            <div key={cat} className="summary-row">
              <span>{cat}</span>
              <span className="gold">
                {"★".repeat(ratings[cat])}
              </span>
            </div>
          ))}
        </div>

        <h2>Average Rating: {average.toFixed(1)} / 5</h2>
      </div>
    );
  }

  // ⭐ RATING PAGE
  return (
    <div className="rating-container">
      <h1>{categories[current]}</h1>

      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={
              star <= ratings[categories[current]]
                ? "star active"
                : "star"
            }
            onClick={() => handleRating(star)}
          >
            ★
          </span>
        ))}
      </div>

      <p>Tap a star to rate</p>
    </div>
  );
}
