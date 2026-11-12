import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => (
  <div className="flex min-h-screen flex-col justify-center bg-cream">
    <div className="container">
      <p className="eyebrow text-ink-soft">Error 404</p>
      <h1 className="display-xl mt-4 text-[24vw] lg:text-[260px]">Lost?</h1>
      <p className="mt-6 max-w-md font-serif text-[32px] leading-tight">
        This page doesn&apos;t exist, <em className="italic text-teal">but the work does</em>.
      </p>
      <Link to="/" className="pill-solid mt-10">
        <ArrowLeft className="h-4 w-4" /> Back home
      </Link>
    </div>
  </div>
);

export default NotFound;
