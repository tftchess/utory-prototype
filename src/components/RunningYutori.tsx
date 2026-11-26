/** Articulated splash illustration based on the project's Yutori logo. */
export function RunningYutori() {
  return (
    <svg className="yutori-run" viewBox="0 0 360 235" role="img"
      aria-label="연베이지 조끼를 입고 고구마를 든 유토리 강아지">
      <defs>
        <linearGradient id="run-fur" x2=".24" y2="1" gradientUnits="objectBoundingBox">
          <stop stopColor="#fffefd" />
          <stop offset="1" stopColor="#fff8ee" />
        </linearGradient>
        <linearGradient id="run-ear" x2=".35" y2="1">
          <stop stopColor="#ffdfa8" /><stop offset="1" stopColor="#fff9f2" />
        </linearGradient>
        <linearGradient id="run-fleece" x2=".8" y2="1">
          <stop stopColor="#fff0d4" /><stop offset="1" stopColor="#f1d5ac" />
        </linearGradient>
        <radialGradient id="run-shade">
          <stop stopColor="#ad855e" stopOpacity=".22" /><stop offset="1" stopColor="#ad855e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="run-travel">
        <ellipse cx="180" cy="211" rx="53" ry="6" fill="url(#run-shade)" />
        <g className="run-turn" fill="url(#run-fur)" stroke="#513a2e" strokeWidth="4.5"
          strokeLinecap="round" strokeLinejoin="round">
          <g className="run-body">
            <g className="run-tail">
              <path d="M160 164c-12-4-21-6-25-16-4-9-13-8-17-2-4 7-2 16 3 21-4-1-6-4-8-7 0 16 12 27 28 26 10 0 17-6 19-12" />
              <path d="M126 152q1 6 6 8" fill="none" stroke="#efe2d4" strokeWidth="3" />
            </g>
            <g className="run-leg run-far">
              <path d="M179 169c-6 10-5 22 1 29 4 5 18 5 24 1 5-4 2-10-4-12l-6-3 4-15" fill="#f7ede1" />
            </g>
            <g className="run-leg run-near">
              <path d="M156 168c-4 9-6 22-2 29 3 6 13 9 22 6 7-3 5-10 0-13l-5-3 8-18" />
            </g>
            <path d="M154 123q5-10 14-7 6-6 14-2 9-3 16 5 10 1 11 12 7 6 4 14 5 9 0 16 4 10-5 14-4 8-13 5-7 6-14 2-8 5-14 0-10 3-15-3-10 0-10-9-6-5-2-13-3-7 2-13-2-11 8-15z"
              fill="url(#run-fleece)" stroke="#caa77f" strokeWidth="3.8" />
            <path d="M174 135q-6 18-7 41m-17-14 1 1m6-14 1 1m22 20 2 1m22-11 2 1m-10 17h2"
              fill="none" stroke="#d6b58c" strokeWidth="2.8" />
            <g className="run-head">
              <g className="run-ear run-left-ear">
                <path d="M134 81c0-14 5-47 14-52 9-5 22 17 28 36l-2 16" fill="url(#run-ear)" />
                <path d="M144 61q1-10 6-18 7 7 12 19" fill="#ffe4bd" stroke="none" />
                <path d="M151 48q4 4 7 12" fill="none" stroke="#f7c58e" strokeWidth="2.6" />
              </g>
              <g className="run-ear run-right-ear">
                <path d="M183 65c5-14 19-36 28-35 10 1 14 34 13 51l-7 6" fill="url(#run-ear)" />
                <path d="M197 62q5-12 13-18 4 7 5 18" fill="#ffe4bd" stroke="none" />
                <path d="M201 60q3-7 7-11" fill="none" stroke="#f7c58e" strokeWidth="2.6" />
              </g>
              <path d="M134 73q17-7 35-8 10-3 19 0 22 1 36 9l3 10-2 4 5 1-4 4 5 1-2 4 5 15-3 1 2 5-4 1c-6 18-25 22-43 23-26 1-51-8-57-24l-3 1 1-6-4-1 4-7 3-10-4 1 4-6-3-1 4-4-3-1z" stroke="none" />
              <path d="M169 65q10-3 18 0m-53 8-3 3 3 1m-3 6-4 2 4 1m-2 5-4 2 3 1-5 15m-1 5 3-1m-2 6 3-1c4 12 14 18 22 21m77-65 3 3-3 1m2 5 4 2-4 1m2 6 3 1-3 2 6 16m0 5-3-1m2 6-3-1q-3 10-13 16"
                fill="none" />
              <g fill="#493428" stroke="none">
                <ellipse cx="170" cy="99" rx="3.9" ry="4.1" />
                <ellipse cx="204" cy="99" rx="3.7" ry="4.1" />
                <path d="M184 106c0-5 12-5 13 0 0 3-4 5-7 5s-6-2-6-5" />
              </g>
              <path d="m149 103 5 2m-10 3 6 1m65-5 5-1m-2 6 6 1" stroke="#f5cea8" strokeWidth="2.5" />
            </g>
            <g className="run-arm">
              <path d="M196 148q1-13 9-20 4-4 7-1 3-1 5 3 5 0 4 6-2 12-12 19z" fill="#ffe49c" stroke="#deb35f" strokeWidth="2.5" />
              <path d="M196 142q6 4 11-1 4-4 8-2l5 1q-4 13-13 18l-11-7z" fill="#995e6d" stroke="#65424a" strokeWidth="2.8" />
              <path d="M174 145c-7 1-11 9-6 15 6 7 23 4 31-1 9-4 8-14 2-17-6-3-12 2-15 3" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}
