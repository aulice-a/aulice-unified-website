const PathwayPage = ({ course }) => {
  // --- Banking Content (wrapped in a component) ---
  const BankingPathwayContent = () => (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <p>This pathway is designed to transform students into highly skilled banking professionals...</p>
      {/* Paste your FULL Banking pathway content here — all 6 phases */}
      <div className="my-8 p-5 bg-[#f0f3ff] border-l-4 border-[#1a365d] rounded-lg">
        <h3 className="text-[#1a365d] text-xl font-bold">Phase 1: Financial System & Fundamentals (Units 1–25)</h3>
        {/* ... rest of your Banking content ... */}
      </div>
      {/* ... all other phases ... */}
    </div>
  );

  // --- Medical Content (you can expand later) ---
  const MedicalPathwayContent = () => (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-red-800">🩺 Medical Professional Pathway</h2>
      <p>Full curriculum coming soon. This is a realistic placeholder with matching height and style.</p>
      <div className="mt-6 p-5 bg-red-50 border-l-4 border-red-500 rounded-lg">
        <p>Phase 1: Patient Intake & Triage (Units 1–25)</p>
        <p>Phase 2: Clinical Documentation (Units 26–50)</p>
        <p>Phase 3: Interdisciplinary Communication (Units 51–75)</p>
      </div>
    </div>
  );

  const NavLinks = ({ className }) => (
    <div className={`nav-links text-center my-8 ${className}`}>
      <a href="https://aulice-main-hub.netlify.app/" className="mx-2 font-bold no-underline">Home</a>
      {/* ... other links ... */}
    </div>
  );

  return (
    <div className="font-['Segoe_UI',_sans-serif] bg-[#f7f9fc] text-[#2c3e50] leading-relaxed">
      <style>{`
        .nav-links a { text-decoration: none; }
        header .nav-links a, footer .nav-links a { color: white; }
      `}</style>
      <header className="text-center py-10 px-5 bg-[#1a365d] text-white">
        <NavLinks />
        <h1 className="text-3xl font-bold">{course.title} Mastery Pathway</h1>
        <p>A 150-Session Program for Global Professionals</p>
      </header>

      {/* ✅ THIS IS THE KEY LINE */}
      <div className="max-w-5xl my-10 mx-auto p-8">
        {course.id === 'banking' ? (
          <BankingPathwayContent />
        ) : course.id === 'medical' ? (
          <MedicalPathwayContent />
        ) : (
          <div className="p-8 text-center bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold">Coming Soon</h2>
            <p>Full pathway content for {course.title} is being prepared.</p>
            <div className="mt-4 text-sm text-gray-500">
              <p>Phases 1–6 | 150 Sessions | Professional Scenarios</p>
            </div>
          </div>
        )}
      </div>

      <footer className="text-center py-10 bg-[#1a365d] text-white mt-16">
        <NavLinks />
        <p>© 2025 Aulice Academy. Reality is programmable. Smart people are its architects.</p>
      </footer>
    </div>
  );
};