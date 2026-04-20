const fs = require('fs');

const path = 'components/main/navbar.tsx';
let content = fs.readFileSync(path, 'utf8');

// Close the div safely.
const findStr = '</Link>\n          ))}\n\n          {/* Source Code Tab */}';
const targetStr = '</Link>\n          ))}\n          </div>\n\n          {/* Source Code Tab */}';

let fixed = content.replace(findStr, targetStr);
fs.writeFileSync(path, fixed, 'utf8');

