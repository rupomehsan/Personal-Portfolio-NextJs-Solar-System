const fs = require('fs');
let content = fs.readFileSync('components/sub/hero-content.tsx', 'utf-8');

content = content.replace('import { slideInFromLeft, slideInFromRight } from "@/lib/motion";', 'import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/lib/motion";');

fs.writeFileSync('components/sub/hero-content.tsx', content);
console.log('Import added.');
