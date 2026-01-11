import { Download } from "lucide-react";

export default function Resume() {
  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] text-white pt-32 px-6 flex flex-col items-center">

      {/* Icon */}
      <div className="mb-8">
        <div className="w-32 h-32 rounded-full bg-[#0F0F0F] flex items-center justify-center shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="70"
            height="70"
            fill="none"
            stroke="#00C2FF"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
            <path d="M10 9H8" />
          </svg>
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-6xl font-extrabold mb-4">
        My{" "}
        <span className="bg-gradient-to-r from-[#00B6FF] to-[#A855F7] bg-clip-text text-transparent">
          Resume
        </span>
      </h1>

      <p className="text-lg text-gray-400 max-w-xl mb-16">
        Download my resume to learn more about my experience, skills, and achievements
      </p>

      {/* Section Box */}
      <div className="w-full max-w-4xl bg-[#0F0F0F] px-10 py-12 rounded-3xl border border-[#0094ff]/40 shadow-[0_0_25px_rgba(0,145,255,0.3)]">
        <h2 className="text-3xl font-bold mb-8">What's Inside:</h2>

        <ul className="text-lg space-y-5 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-[#00B6FF]">•</span>
            Professional experience and project highlights
          </li>

          <li className="flex items-start gap-2">
            <span className="text-[#00B6FF]">•</span>
            Technical skills and expertise
          </li>

          <li className="flex items-start gap-2">
            <span className="text-[#00B6FF]">•</span>
            Education and certifications
          </li>

          <li className="flex items-start gap-2">
            <span className="text-[#00B6FF]">•</span>
            Awards and achievements
          </li>
        </ul>

        {/* Download Button */}
        <div className="mt-12 flex justify-center">
          <a
            href="/DHANUSH RESUME.pdf"       // make sure resume.pdf is inside public/
            download="Dhanush-Resume.pdf"
            className="flex items-center gap-2 bg-[#00B6FF] text-black font-medium px-8 py-4 rounded-xl hover:bg-[#00A4E6] transition"
          >
            <Download size={18} />
            Download Resume (PDF)
          </a>
        </div>
      </div>
    </div>
  );
}
