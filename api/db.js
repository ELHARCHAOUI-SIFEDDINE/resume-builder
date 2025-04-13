// Import database
const data = require('../db.json');

module.exports = (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Get the path from request url
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname.replace(/^\/api\//, '');
  const segments = path.split('/').filter(Boolean);
  
  // Handle GET requests
  if (req.method === 'GET') {
    // Route: /api/db
    if (!segments.length) {
      return res.status(200).json(data);
    }
    
    // Route: /api/db/[collection]
    const collection = segments[0];
    if (data[collection]) {
      // If we have an ID, return that specific item
      if (segments.length > 1) {
        const id = segments[1];
        const item = data[collection].find(item => 
          String(item.id) === String(id)
        );
        
        if (item) {
          return res.status(200).json(item);
        } else {
          return res.status(404).json({ error: 'Item not found' });
        }
      }
      
      // Handle query parameters
      const params = {};
      for (const [key, value] of url.searchParams.entries()) {
        params[key] = value;
      }
      
      let results = [...data[collection]];
      
      // Filter by query parameters
      if (Object.keys(params).length) {
        results = results.filter(item => {
          return Object.entries(params).every(([key, value]) => {
            // Special case for userId which might be number or string
            if (key === 'userId') {
              return String(item[key]) === String(value);
            }
            return item[key] === value;
          });
        });
      }
      
      return res.status(200).json(results);
    }
    
    return res.status(404).json({ error: 'Collection not found' });
  }
  
  // Return 404 for unhandled routes
  return res.status(404).json({ error: 'Not found' });
};
