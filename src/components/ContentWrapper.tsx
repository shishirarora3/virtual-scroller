export const ContentWrapper = ({
  height = 10,
  top = 0,
  visibleRowEls = [<div />],
  rowHeight = 0
}) => (
  <div
    style={{
      top: `${top}px`,
      height: `${height}px`,
      position: "relative"
    }}
  >
    {visibleRowEls.map((el, k) => (
      <div
        key={k}
        style={{
          height: rowHeight
        }}
      >
        {el}
      </div>
    ))}
  </div>
);
