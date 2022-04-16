import { useEffect, useRef, useState } from "react";
import { addPadding } from "../utils/addPadding";
import { ContentWrapper } from "./ContentWrapper";

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
