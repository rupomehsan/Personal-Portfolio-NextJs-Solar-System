const fs = require('fs');
let content = fs.readFileSync('components/sub/about-content.tsx', 'utf8');

// The whitespace wasn't exact enough for regex. Doing substring replacements instead.

content = content.replace(
  'CGPA: 3.10 / 4.00',
  'CGPA: 2.77 / 4.00'
);

content = content.replace(
  'Tamirul Millat Kamil Madrasha, Dhaka',
  'Tamirul Millat Kamil Madrasha, Jatrabari, Dhaka'
);

content = content.replace(
  'GPA: 5.00 / 5.00',
  'GPA: 4.92 / 5.00'
);

content = content.replace(
  'Muradpur Adarsha High School',
  'Muradpur Islamia Alim Madrasha, Jurain, Dhaka'
);

content = content.replace(
  'GPA: 4.81 / 5.00',
  'GPA: 4.69 / 5.00'
);

fs.writeFileSync('components/sub/about-content.tsx', content);
