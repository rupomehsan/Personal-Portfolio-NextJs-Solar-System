const fs = require('fs');
let content = fs.readFileSync('components/sub/about-content.tsx', 'utf8');

// Update BSc CGPA
content = content.replace(
  /<p className="text-slate-300 text-xs leading-relaxed max-w-\[600px\] bg-\[#020617\]\/50 p-3 rounded backdrop-blur-sm border-l-2 border-orange-500\/50 mt-2">\s*CGPA: 3.10 \/ 4.00\s*<\/p>/,
  \`<p className="text-slate-300 text-xs leading-relaxed max-w-[600px] bg-[#020617]/50 p-3 rounded backdrop-blur-sm border-l-2 border-orange-500/50 mt-2">
                        CGPA: 2.77 / 4.00
                      </p>\`
);

// Update HSC Institution and GPA
content = content.replace(
  /<p className="text-orange-300 text-sm font-mono mb-2">\s*Tamirul Millat Kamil Madrasha, Dhaka\s*<\/p>/,
  \`<p className="text-orange-300 text-sm font-mono mb-2">
                        Tamirul Millat Kamil Madrasha, Jatrabari, Dhaka
                      </p>\`
);
content = content.replace(
  /<p className="text-slate-300 text-xs leading-relaxed max-w-\[600px\] bg-\[#020617\]\/50 p-3 rounded backdrop-blur-sm border-l-2 border-orange-500\/50 mt-2">\s*GPA: 5.00 \/ 5.00\s*<\/p>/,
  \`<p className="text-slate-300 text-xs leading-relaxed max-w-[600px] bg-[#020617]/50 p-3 rounded backdrop-blur-sm border-l-2 border-orange-500/50 mt-2">
                        GPA: 4.92 / 5.00
                      </p>\`
);

// Update SSC Institution and GPA
content = content.replace(
  /<p className="text-orange-300 text-sm font-mono mb-2">\s*Muradpur Adarsha High School\s*<\/p>/,
  \`<p className="text-orange-300 text-sm font-mono mb-2">
                        Muradpur Islamia Alim Madrasha, Jurain, Dhaka
                      </p>\`
);
content = content.replace(
  /<p className="text-slate-300 text-xs leading-relaxed max-w-\[600px\] bg-\[#020617\]\/50 p-3 rounded backdrop-blur-sm border-l-2 border-orange-500\/50 mt-2">\s*GPA: 4.81 \/ 5.00\s*<\/p>/,
  \`<p className="text-slate-300 text-xs leading-relaxed max-w-[600px] bg-[#020617]/50 p-3 rounded backdrop-blur-sm border-l-2 border-orange-500/50 mt-2">
                        GPA: 4.69 / 5.00
                      </p>\`
);

fs.writeFileSync('components/sub/about-content.tsx', content);
