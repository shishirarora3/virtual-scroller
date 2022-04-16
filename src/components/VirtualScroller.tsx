import { useEffect, useRef, useState } from "react";

const addPadding = ([startIndex = 0, endIndex = 0], total = 0, pad = 0) => {
  const paddedIndexes = [startIndex - pad, endIndex + pad];
  if (paddedIndexes[0] < 0) {
    paddedIndexes[0] = 0;
  }
  if (paddedIndexes[1] >= total) {
    paddedIndexes[1] = total - 1;
  }
  return paddedIndexes;
};
const ContentWrapper = ({
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

export const VirtualScroller = ({
  viewPortHeight = 200,
  rowHeight = 100,
  totalRows = 100,
  RowEls = [<div>Sample Row Placeholder</div>],
  className = "",
  offsetRows = 2
}) => {
  const viewPortRef = useRef<HTMLDivElement>(null);
  const contentHeight = rowHeight * totalRows;
  const [visibleRowsStartIdx, setVisibleRowsStartIdx] = useState(0);
  const visibleRowsEndIdx =
    visibleRowsStartIdx + Math.ceil(viewPortHeight / rowHeight);
  const viewPortEl = viewPortRef.current;
  const scrollTop = viewPortEl?.scrollTop;
  useEffect(() => {
    const viewPortEl = viewPortRef.current;
    const scroller = () => {
      const scrollTop = viewPortEl?.scrollTop;
      const nextStartIndex = scrollTop ? Math.floor(scrollTop / rowHeight) : 0;
      setVisibleRowsStartIdx(nextStartIndex);
    };
    viewPortEl?.addEventListener("scroll", scroller, false);
    return () => viewPortEl?.removeEventListener("scroll", scroller);
  }, [rowHeight]);

  return (
    <div
      ref={viewPortRef}
      className={className}
      style={{
        height: viewPortHeight,
        overflow: "auto",
        position: "relative"
      }}
    >
      <ContentWrapper
        height={contentHeight}
        top={scrollTop}
        rowHeight={rowHeight}
        visibleRowEls={RowEls.slice(
          ...addPadding(
            [visibleRowsStartIdx, visibleRowsEndIdx],
            totalRows,
            offsetRows
          )
        )}
      />
    </div>
  );
};
