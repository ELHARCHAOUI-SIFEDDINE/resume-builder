const data = require('../../db.json');

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Content-Type': 'application/json'
  };
  
  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Preflight call successful' })
    };
  }

  // Get path parameters
  const path = event.path.replace('/.netlify/functions/api', '');
  const segments = path.split('/').filter(Boolean);
  
  try {
    // Handle GET requests
    if (event.httpMethod === 'GET') {
      // Route: /.netlify/functions/api
      if (!segments.length) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(data)
        };
      }
      
      // Route: /.netlify/functions/api/[collection]
      const collection = segments[0];
      if (data[collection]) {
        // If we have an ID, return that specific item
        if (segments.length > 1) {
          const id = segments[1];
          const item = data[collection].find(item => 
            String(item.id) === String(id)
          );
          
          if (item) {
            return {
              statusCode: 200,
              headers,
              body: JSON.stringify(item)
            };
          } else {
            return {
              statusCode: 404,
              headers,
              body: JSON.stringify({ error: 'Item not found' })
            };
          }
        }
        
        // Handle query parameters
        const params = event.queryStringParameters || {};
        
        let results = [...data[collection]];
        
        // Filter by query parameters
        if (Object.keys(params).length) {
          results = results.filter(item => {
            return Object.entries(params).every(([key, value]) => {
              // Special case for userId which might be number or string
              if (key === 'userId') {
                return String(item[key]) === String(value);
              }
              return String(item[key]) === String(value);
            });
          });
        }
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(results)
        };
      }
      
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Collection not found' })
      };
    }
    
    // Handle POST requests (Create new items)
    if (event.httpMethod === 'POST') {
      if (!segments.length) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Collection name required' })
        };
      }
      
      const collection = segments[0];
      if (!data[collection]) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Collection not found' })
        };
      }
      
      // In a real serverless function, you would save this to a database
      // For this mock version, we'll just return success with the posted data
      const payload = JSON.parse(event.body);
      
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ 
          message: 'Created successfully', 
          data: payload 
        })
      };
    }
    
    // Handle PUT requests (Update items)
    if (event.httpMethod === 'PUT' || event.httpMethod === 'PATCH') {
      if (segments.length < 2) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Collection and ID required' })
        };
      }
      
      const collection = segments[0];
      const id = segments[1];
      
      if (!data[collection]) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Collection not found' })
        };
      }
      
      const payload = JSON.parse(event.body);
      
      // In a real function, you would update the database
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          message: 'Updated successfully', 
          id,
          data: payload 
        })
      };
    }
    
    // Handle DELETE requests
    if (event.httpMethod === 'DELETE') {
      if (segments.length < 2) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Collection and ID required' })
        };
      }
      
      const collection = segments[0];
      const id = segments[1];
      
      if (!data[collection]) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Collection not found' })
        };
      }
      
      // In a real function, you would delete from the database
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          message: 'Deleted successfully', 
          id 
        })
      };
    }
    
    // For any other HTTP method
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Server error', message: error.message })
    };
  }
};
