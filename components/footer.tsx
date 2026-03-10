export default function PoiroFooter() {
  return (
    <footer className="relative w-full overflow-hidden">
      {/* Curved arch gradient only */}
      <svg
        className="w-full h-auto"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="archGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a1a1a" stopOpacity="1" />
            <stop offset="30%" stopColor="#7c3038" stopOpacity="1" />
            <stop offset="60%" stopColor="#d97706" stopOpacity="1" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Curved arch path */}
        <path
          d="M 0 350 Q 720 50 1440 350 L 1440 400 L 0 400 Z"
          fill="url(#archGradient)"
        />
      </svg>
    </footer>
  );
}
