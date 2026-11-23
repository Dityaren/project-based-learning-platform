import type { SVGProps } from "react";

type CatBoxProjectProps = SVGProps<SVGSVGElement> & {
  /** Teks alternatif untuk screen reader. */
  title?: string;
};

export function CatBoxProject({
  title = "Kucing memegang pensil di kotak berisi papan project",
  ...props
}: CatBoxProjectProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      fill="none"
      strokeLinejoin="round"
      strokeLinecap="round"
      role="img"
      aria-label={title}
      {...props}
    >
      <title>{title}</title>

      {/* shadow */}
      <ellipse cx="100" cy="184" rx="66" ry="6" fill="#000" opacity="0.12" />

      {/* lightbulb (ide) */}
      <g stroke="#2B2B2B" strokeWidth="2.5">
        <circle cx="168" cy="34" r="11" fill="#F6C945" />
        <rect x="163" y="45" width="10" height="7" rx="2" fill="#C9C9C9" />
        <path d="M164 34 L168 29 L172 34" strokeWidth="2" />
      </g>
      <g stroke="#2B2B2B" strokeWidth="2.5">
        <path d="M168 15 L168 11" />
        <path d="M150 22 L147 19" />
        <path d="M186 22 L189 19" />
      </g>

      {/* milestone flag */}
      <path d="M34 90 L34 46" stroke="#2B2B2B" strokeWidth="3" />
      <path d="M34 46 L60 55 L34 64 Z" fill="#5CB98A" stroke="#2B2B2B" strokeWidth="2.5" />

      {/* back flaps */}
      <path d="M40 112 L22 90 L52 82 L64 110 Z" fill="#9A9A9A" stroke="#2B2B2B" strokeWidth="3" />
      <path
        d="M160 112 L178 90 L148 82 L136 110 Z"
        fill="#9A9A9A"
        stroke="#2B2B2B"
        strokeWidth="3"
      />

      {/* cat: ears */}
      <path d="M73 72 L74 42 L98 60 Z" fill="#F4A259" stroke="#2B2B2B" strokeWidth="3" />
      <path d="M127 72 L126 42 L102 60 Z" fill="#F4A259" stroke="#2B2B2B" strokeWidth="3" />
      <path d="M78 62 L79 51 L89 59 Z" fill="#F7B6B6" />
      <path d="M122 62 L121 51 L111 59 Z" fill="#F7B6B6" />

      {/* cat: head */}
      <circle cx="100" cy="90" r="31" fill="#F4A259" stroke="#2B2B2B" strokeWidth="3" />

      {/* forehead stripes */}
      <g stroke="#C9772E" strokeWidth="3">
        <path d="M100 62 L100 71" />
        <path d="M91 64 L93 71" />
        <path d="M109 64 L107 71" />
      </g>

      {/* eyes */}
      <ellipse cx="88" cy="90" rx="4" ry="5" fill="#2B2B2B" />
      <ellipse cx="112" cy="90" rx="4" ry="5" fill="#2B2B2B" />
      <circle cx="89.5" cy="88" r="1.5" fill="#fff" />
      <circle cx="113.5" cy="88" r="1.5" fill="#fff" />

      {/* cheeks */}
      <ellipse cx="78" cy="100" rx="5" ry="3" fill="#F7B6B6" opacity="0.8" />
      <ellipse cx="122" cy="100" rx="5" ry="3" fill="#F7B6B6" opacity="0.8" />

      {/* nose + mouth */}
      <path d="M97 97 L103 97 L100 101 Z" fill="#E88B8B" stroke="#2B2B2B" strokeWidth="1.5" />
      <path
        d="M100 101 Q100 106 95 105 M100 101 Q100 106 105 105"
        stroke="#2B2B2B"
        strokeWidth="2"
      />

      {/* whiskers */}
      <g stroke="#2B2B2B" strokeWidth="1.8">
        <path d="M70 96 L56 93" />
        <path d="M70 101 L57 103" />
        <path d="M130 96 L144 93" />
        <path d="M130 101 L143 103" />
      </g>

      {/* pencil held in right paw */}
      <g transform="rotate(30 126 110)" stroke="#2B2B2B" strokeWidth="2.5">
        <rect x="122" y="68" width="8" height="42" fill="#F6C945" />
        <path d="M122 68 L130 68 L126 58 Z" fill="#F2D9B3" />
        <path d="M125 61.5 L127 61.5 L126 58 Z" fill="#2B2B2B" stroke="none" />
        <path d="M126 68 L126 110" stroke="#D9A82B" strokeWidth="1.5" />
      </g>

      {/* box front */}
      <rect
        x="40"
        y="110"
        width="120"
        height="72"
        rx="4"
        fill="#B8B8B8"
        stroke="#2B2B2B"
        strokeWidth="3"
      />
      <path d="M44 118 L156 118" stroke="#D2D2D2" strokeWidth="3" />

      {/* kanban board on box */}
      <rect
        x="58"
        y="128"
        width="84"
        height="46"
        rx="5"
        fill="#F2EEE4"
        stroke="#2B2B2B"
        strokeWidth="2.5"
      />
      {/* column dividers */}
      <g stroke="#2B2B2B" strokeWidth="1.5" opacity="0.35">
        <path d="M86 133 L86 169" />
        <path d="M114 133 L114 169" />
      </g>
      {/* column 1: to do */}
      <g stroke="#2B2B2B" strokeWidth="1.8">
        <rect x="62" y="134" width="20" height="8" rx="2" fill="#F6C945" />
        <rect x="62" y="145" width="20" height="8" rx="2" fill="#F6C945" />
        <rect x="62" y="156" width="20" height="8" rx="2" fill="#F6C945" />
      </g>
      {/* column 2: doing */}
      <g stroke="#2B2B2B" strokeWidth="1.8">
        <rect x="90" y="134" width="20" height="8" rx="2" fill="#8FB8F0" />
        <rect x="90" y="145" width="20" height="8" rx="2" fill="#8FB8F0" />
      </g>
      {/* column 3: done */}
      <g stroke="#2B2B2B" strokeWidth="1.8">
        <rect x="118" y="134" width="20" height="8" rx="2" fill="#5CB98A" />
      </g>
      <path d="M124 138 L127 141 L133 135" stroke="#fff" strokeWidth="1.8" />

      {/* paws on rim */}
      <g fill="#F4A259" stroke="#2B2B2B" strokeWidth="3">
        <ellipse cx="74" cy="112" rx="10" ry="7" />
        <ellipse cx="126" cy="112" rx="10" ry="7" />
      </g>
      <g stroke="#2B2B2B" strokeWidth="2">
        <path d="M71 109 L71 114" />
        <path d="M77 109 L77 114" />
        <path d="M123 109 L123 114" />
        <path d="M129 109 L129 114" />
      </g>
    </svg>
  );
}

export default CatBoxProject;
