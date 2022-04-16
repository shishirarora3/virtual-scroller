import { VirtualScroller } from "./components/VirtualScroller";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <VirtualScroller
        className="scoller"
        RowEls={Array(2000)
          .fill("")
          .map((_, i) => (
            <div key={i} className="row">
              content {i}
            </div>
          ))}
      />
    </div>
  );
}
