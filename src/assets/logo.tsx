import type { SVGAttributes } from "react";

const Logo = (props: SVGAttributes<SVGElement>) => {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width="46"
        height="40"
        viewBox="0 0 126 109"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g stroke="#263238" strokeWidth="2.5" strokeLinejoin="round">
          <path d="M18 43L5 75L17 76V96L36 108H119V76L125 75L115 43H18Z" fill="#BDBDBD" />
          <path d="M17 76L36 108V44L17 43V76Z" fill="#858585" />
          <path d="M36 44L45 75H125L115 43H36Z" fill="#BDBDBD" />
          <path d="M36 44L45 75" fill="none" />
        </g>

        <g stroke="#263238" strokeWidth="2.5" strokeLinejoin="round">
          <path
            d="M39 44C34 35 34 24 39 14C43 6 49 1 53 1L51 24C58 12 67 7 75 10C84 13 86 25 81 35C78 41 72 44 68 45H39Z"
            fill="#263238"
          />
          <path d="M53 24L54 4C54 1 59 0 60 4L60 20" fill="#263238" />
          <path d="M72 15C77 18 82 24 80 32C77 39 71 43 62 44" fill="white" />
          <path d="M46 43C42 45 38 51 40 57C42 63 48 65 51 58L54 49" fill="white" />
          <path d="M72 43C76 44 81 48 82 54C82 59 77 62 73 57L69 49" fill="white" />
          <path d="M58 35L65 35" stroke="white" strokeWidth="2" />
        </g>

        <g stroke="#263238" strokeWidth="2.5" strokeLinejoin="round">
          <path
            d="M80 43C75 35 74 26 78 18L96 2L95 21C102 13 110 11 114 12L109 35C116 30 123 35 125 41C127 47 119 48 112 46L80 45Z"
            fill="white"
          />
          <path d="M78 20L94 2L94 24" fill="white" />
          <path d="M95 21C102 14 109 11 114 12L108 35C106 41 101 44 94 43" fill="white" />
          <path d="M85 43C81 48 80 54 84 59C88 63 94 58 96 50" fill="white" />
          <path d="M110 43C114 47 119 49 123 45" fill="none" />
          <path d="M101 32C105 35 109 33 112 29" fill="none" />
        </g>
      </svg>

      <span className="text-xl font-bold tracking-tight text-gray-950 dark:text-white">
        BelajarProject
      </span>
    </div>
  );
};

export default Logo;
