const fs = require('fs');

try {
  let blogContent = fs.readFileSync('app/blogs/[slug]/page.tsx', 'utf8');

  let startIndex = blogContent.indexOf('/* --- comment avatar');
  let endIndex = blogContent.indexOf('/* ---------------------------------------------------------------------------');
  
  if (startIndex === -1 || endIndex === -1) {
    console.log('Failed to match comment sections.');
    process.exit(1);
  }

  let commentsCode = blogContent.substring(startIndex, endIndex);

  let marketplaceSrc = 'app/marketplace/[slug]/page.tsx';
  let marketplaceContent = fs.readFileSync(marketplaceSrc, 'utf8');

  if (!marketplaceContent.includes('getComments')) {
    marketplaceContent = marketplaceContent.replace('import { API_CONFIG } from "@/config/api";',
      'import { API_CONFIG } from "@/config/api";\nimport { getComments, postComment, type Comment, type CommentInput } from "@/lib/services/comment";\nimport { useRef } from "react";'
    );
  }

  if (!marketplaceContent.includes('function CommentsSection')) {
    marketplaceContent = marketplaceContent.replace('export default function MarketplaceDetailPage', 
      commentsCode + '\nexport default function MarketplaceDetailPage'
    );
  }

  // Add the comment section inside the component before the related marketplaces (or after the content).
  // The previous page.tsx had {/* Marketplace links */} because it was created from Project links
  if (!marketplaceContent.includes('<CommentsSection')) {
    marketplaceContent = marketplaceContent.replace('{/* Marketplace links */}',
      '<CommentsSection blogId={marketplace.id} />\n\n            {/* Marketplace links */}'
    );
  }

  fs.writeFileSync(marketplaceSrc, marketplaceContent);
  console.log('Marketplace page updated with comments.');
} catch (err) {
  console.error(err);
}
