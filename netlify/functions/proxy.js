const https = require('https');

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const { path, server } = event.queryStringParameters || {};
    
    if (!path || !server) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing path or server parameter' })
      };
    }

    // List of available servers
    const servers = {
      'hahoy-server': 'https://hahoy.server.arlen.icu',
      'hahoy-ship': 'https://hahoy.ship.arlen.icu',
      'hls-ship': 'https://hls.ship.arlen.icu',
      'hls-server': 'https://hls.server.arlen.icu',
      'savingshub': 'https://savingshub.online',
      'subtitles': 'https://libre-subs.fifthwit.net'
    };

    const baseUrl = servers[server];
    if (!baseUrl) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid server parameter' })
      };
    }

    // Decode and normalize path (path is URL-encoded in client rewrite)
    const decodedPath = decodeURIComponent(path);
    const normalizedPath = decodedPath.startsWith('/') ? decodedPath : `/${decodedPath}`;
    const url = `${baseUrl}${normalizedPath}`;

    // For savingshub, proxy raw response (often text/plain with m3u8 link within JSON)
    if (server === 'savingshub') {
      const upstream = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36',
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'en-US,en;q=0.9',
          'Referer': 'https://mohibkal.netlify.app/',
          'Origin': 'https://mohibkal.netlify.app'
        },
        redirect: 'follow'
      });
      const text = await upstream.text();
      const contentType = upstream.headers.get('content-type') || 'application/json; charset=utf-8';
      return {
        statusCode: upstream.status,
        headers: {
          ...headers,
          'Content-Type': contentType
        },
        body: text
      };
    }

    // For subtitles, proxy raw response
    if (server === 'subtitles') {
      const upstream = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36',
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'en-US,en;q=0.9',
          'Referer': 'https://mohibkal.netlify.app/',
          'Origin': 'https://mohibkal.netlify.app'
        },
        redirect: 'follow'
      });
      const text = await upstream.text();
      const contentType = upstream.headers.get('content-type') || 'application/json; charset=utf-8';
      return {
        statusCode: upstream.status,
        headers: {
          ...headers,
          'Content-Type': contentType
        },
        body: text
      };
    }

    // Default JSON attempt for other servers
    const response = await makeRequest(url);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response)
    };

  } catch (error) {
    console.error('Proxy error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      })
    };
  }
};

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://mohibkal.netlify.app/',
        'Origin': 'https://mohibkal.netlify.app',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      rejectUnauthorized: false,
      timeout: 10000
    };

    const req = https.get(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (e) {
          resolve({ raw: data });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}
