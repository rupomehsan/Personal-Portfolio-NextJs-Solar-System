
const fs = require("fs");

let content = fs.readFileSync("components/main/marketplace.tsx", "utf8");

// Fix the && and || that got mangled to ; and ;
content = content.replace(/\{loading ; \(/g, "{loading && (");
content = content.replace(/\{!loading ; error ; \(/g, "{!loading && error && (");
content = content.replace(/\{!loading && !error; \(/g, "{!loading && !error && (");
content = content.replace(/\{marketplace\.is_featured === 1 ; \(/g, "{marketplace.is_featured === 1 && (");
content = content.replace(/\{marketplace\.category ; \(/g, "{marketplace.category && (");
content = content.replace(/\{marketplace\.title ; marketplace\.name\}/g, "{marketplace.title || marketplace.name}");
content = content.replace(/alt=\{marketplace\.title ; marketplace\.name ; "Product"\}/g, "alt={marketplace.title || marketplace.name || \"Product\"}");
content = content.replace(/\{tags\.length > 0 ; \(/g, "{tags.length > 0 && (");
content = content.replace(/\{marketplaces\.length > 0 ; \(/g, "{marketplaces.length > 0 && (");

fs.writeFileSync("components/main/marketplace.tsx", content);
console.log("Fixed logical operators.");

