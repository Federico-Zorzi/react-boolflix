import Movies from "../components/main/movies";
import Series from "../components/main/Series";

export default function HomePage() {
  return (
    <main>
      <div className="container">
        <Movies></Movies>
        <Series></Series>
      </div>
    </main>
  );
}
