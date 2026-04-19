const fs = require('fs');

let code = fs.readFileSync('components/sub/hero-content.tsx', 'utf8');

const prefix = '          {/* Decorative HUD Connecting Lines';
const parts = code.split(prefix);

if (parts.length > 2) {
    // parts[0] is everything before the first HUD
    // parts[1] is the first HUD (starts with " (10 Premium..." until the end of the file)
    // parts[2] is the second HUD, etc.
    
    // The first one is rotating. We want to keep it.
    // The second and third ones are probably static.
    
    // We just keep parts[0], add the prefix back, add parts[1] until the end of its SVG, then SKIP parts[2] and parts[3] until their end of SVG.
    
    // Actually, simpler:
    const blockRegex = /\{\/\* Decorative HUD Connecting Lines[\s\S]*?<\/svg>\s*<\/div>/g;
    
    const matches = code.match(blockRegex);
    if (matches && matches.length > 1) {
        // Find the index of the first rotating block
        const rotatingBlock = matches.find(m => m.includes('animate-[spin_120s_linear_infinite]'));
        
        let count = 0;
        let newCode = code.replace(blockRegex, (match) => {
            count++;
            if (count === 1) {
                return rotatingBlock || match;
            }
            return '';
        });
        
        fs.writeFileSync('components/sub/hero-content.tsx', newCode);
        console.log(`Cleaned up ${count - 1} duplicates!`);
    } else {
        console.log("No duplicates found with regex.");
    }
} else {
    console.log("No duplicates found with split.");
}

