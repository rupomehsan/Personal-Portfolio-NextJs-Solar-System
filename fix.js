const fs = require('fs');
let commentsCode = fs.readFileSync('comments-temp.js', 'utf8');
let marketplaceSrc = 'app/marketplace/[slug]/page.tsx';
let mc = fs.readFileSync(marketplaceSrc, 'utf8');

if (!mc.includes('function CommentsSection')) {
  mc = mc.replace(/(\/\* ---------------------------------------------------------------------------\r?\n\s+PAGE)/,
    commentsCode + '\n');
    
  mc = mc.replace('import { API_CONFIG } from "@/config/api";',
      'import { API_CONFIG } from "@/config/api";\nimport { getComments, postComment, type Comment, type CommentInput } from "@/lib/services/comment";\nimport { useRef } from "react";');
      
  mc = mc.replace('{/* Marketplace links */}', '<CommentsSection blogId={marketplace.id} />\n\n            {/* Marketplace links */}');
  fs.writeFileSync(marketplaceSrc, mc);
}
console.log('done fixing comments');
