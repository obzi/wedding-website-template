import React from "react";

const ladies = [
  { src: "/images/ladies1.png", alt: "Lady 1" },
  { src: "/images/ladies2.png", alt: "Lady 2" },
  { src: "/images/ladies3.png", alt: "Lady 3" },
];
const gentleman = [
  { src: "/images/gentleman.jpg", alt: "Gentleman 1", objectPos: "object-top" },
  { src: "/images/gentleman.jpg", alt: "Gentleman 2", objectPos: "object-top" },
  { src: "/images/gentleman.jpg", alt: "Gentleman 3", objectPos: "object-top" },
];

export default function Inspiration() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-white py-10">
      <h1 className="text-2xl font-bold mb-4">Inspiration Dresscode</h1>
      <div className="grid grid-cols-2 gap-4 max-w-md w-full mb-8">
        {ladies.map((lady, i) => (
          <React.Fragment key={i}>
            {/* Ladies left */}
            <div className="aspect-[3/4] bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
              <img
                src={lady.src}
                alt={lady.alt}
                className="object-cover w-full h-full object-top"
                loading="lazy"
              />
            </div>
            {/* Gentleman right */}
            <div className="aspect-[3/4] bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
              <img
                src={gentleman[i].src}
                alt={gentleman[i].alt}
                className={`object-cover w-full h-full ${gentleman[i].objectPos}`}
                loading="lazy"
              />
            </div>
          </React.Fragment>
        ))}
      </div>
      <button
        className="mt-8 px-6 py-2 rounded-xl bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-800 transition"
        onClick={() => window.close()}
      >
        Back to main page
      </button>
    </div>
  );
}
