const fs = require('fs');
let content = fs.readFileSync('constants/index.ts', 'utf8');

const navReplacement = `export const NAV_LINKS = [
  {
    title: "Home",
    link: "#home",
  },
  {
    title: "About me",
    link: "#about",
  },
  {
    title: "Experience",
    link: "#experience",
  },
  {
    title: "Projects",
    link: "#projects",
  },
  {
    title: "Blogs",
    link: "#blogs",
  },
  {
    title: "Contact",
    link: "#contact",
  },
] as const;`;

content = content.replace(
  /export const NAV_LINKS = \[\s*\{[\s\S]*?\] as const;/m,
  navReplacement
);

fs.writeFileSync('constants/index.ts', content);
