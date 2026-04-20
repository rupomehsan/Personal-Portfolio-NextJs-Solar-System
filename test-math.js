const fs = require('fs');

const path = 'components/main/navbar.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace left-[40px] with left-[48px]
content = content.replace(
  'left-[40px] group-hover/sidebar:left-[56px] -translate-x-1/2',
  'left-[48px] group-hover/sidebar:left-[56px] -translate-x-1/2'
);

fs.writeFileSync(path, content, 'utf8');

