export function FieldMarks() {
  return (
    <div className="field" aria-hidden="true">
      <svg className="field-curve field-curve-a" viewBox="0 0 640 220" aria-hidden="true">
        <path
          pathLength="1"
          d="M20 180C80 180 120 150 180 132C250 110 290 70 360 58C440 44 500 78 620 24"
        />
      </svg>
      <svg className="field-curve field-curve-b" viewBox="0 0 640 220" aria-hidden="true">
        <path
          pathLength="1"
          d="M10 40C90 48 130 110 210 124C300 140 340 80 430 70C510 62 560 120 630 168"
        />
      </svg>
      <svg className="field-ladder" viewBox="0 0 88 280" aria-hidden="true">
        <path
          pathLength="1"
          d="M8 16H78M8 40H58M8 64H72M8 88H44M8 112H80M8 136H50M8 160H68M8 184H36M8 208H74M8 232H52M8 256H66"
        />
      </svg>
      <svg className="field-ladder field-ladder-b" viewBox="0 0 88 280" aria-hidden="true">
        <path
          pathLength="1"
          d="M10 20H70M10 46H42M10 72H80M10 98H54M10 124H76M10 150H34M10 176H68M10 202H48M10 228H78M10 254H40"
        />
      </svg>
      <span className="field-node field-node-a" />
      <span className="field-node field-node-b" />
      <span className="field-node field-node-c" />
    </div>
  );
}
