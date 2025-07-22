export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Green "7" shape */}
        <path
          d="M20 20 L80 20 L80 35 L45 35 L45 80 L30 80 L30 35 L20 35 Z"
          fill="#059669"
          rx="8"
        />
        {/* Orange accent dot */}
        <circle
          cx="70"
          cy="65"
          r="12"
          fill="#ea580c"
        />
      </svg>
    </div>
  );
}