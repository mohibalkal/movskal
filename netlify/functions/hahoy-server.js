const https = require('https');

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
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
    const path = event.path.replace('/.netlify/functions/hahoy-server', '');
    const queryString = event.queryStringParameters ? 
      '?' + new URLSearchParams(event.queryStringParameters).toString() : '';
    const fullPath = path + queryString;
    
    console.log(`🔍 Hahoy Server Request: ${fullPath}`);
    
    // Special handling for /mp4 endpoint
    if (path.startsWith('/mp4')) {
      console.log(`  🎬 MP4 endpoint detected`);
      const { url, headers } = event.queryStringParameters || {};
      
      if (!url) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Missing url parameter' })
        };
      }
      
      const streamUrl = decodeURIComponent(url);
      let refererHeaders = {};
      
      if (headers) {
        try {
          refererHeaders = JSON.parse(decodeURIComponent(headers));
        } catch (e) {
          console.log(`  ⚠️ Failed to parse headers: ${e.message}`);
          refererHeaders = { referer: "https://mixdrop.my/" };
        }
      } else {
        refererHeaders = { referer: "https://mixdrop.my/" };
      }
      
      console.log(`  🔗 MP4 URL: ${streamUrl}`);
      console.log(`  📋 Headers:`, refererHeaders);
      
      try {
        const response = await makeStreamRequest(streamUrl, refererHeaders);
        return {
          statusCode: 200,
          headers: {
            ...headers,
            'Content-Type': response.contentType || 'video/mp4',
            'Content-Length': response.contentLength,
            'Accept-Ranges': 'bytes',
            'Cache-Control': 'public, max-age=3600'
          },
          body: response.body,
          isBase64Encoded: true
        };
      } catch (error) {
        console.error(`❌ MP4 request failed:`, error);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            error: 'MP4 request failed',
            message: error.message,
            timestamp: new Date().toISOString()
          })
        };
      }
    }
    
    // API Proxy Configuration - Order by reliability (same as local server)
    const API_SERVERS = [
      'https://hls.ship.arlen.icu',      // Working server
      'https://hls.server.arlen.icu',    // Working server
      'https://hahoy.ship.arlen.icu',    // Backup
      'https://hahoy.server.arlen.icu',  // Backup
      'https://hahoy.onrender.com'       // Backup
    ];

    let lastError = null;
    let lastStatus = null;

    for (let i = 0; i < API_SERVERS.length; i++) {
      const server = API_SERVERS[i];
      const fullUrl = `${server}${fullPath}`;
      
      try {
        console.log(`  Trying server ${i + 1}/${API_SERVERS.length}: ${server}`);
        
        const response = await makeRequest(fullUrl);
        
        if (response.status === 200) {
          console.log(`  ✅ Success with server: ${server}`);
          
          // Process server data based on server type
          let processedData = response.data;
          if (processedData && processedData.streams && Array.isArray(processedData.streams)) {
            console.log(`  📋 Server data received: ${processedData.streams.length} streams`);
            
            // Special processing for Bloop server
            if (path.includes('/bloop/')) {
              console.log(`  🔧 Processing Bloop server data`);
              processedData = {
                streams: processedData.streams.map((stream, index) => ({
                  url: stream.url,
                  type: stream.url.includes('.mp4') ? 'file' : 'hls',
                  quality: stream.quality || '720p',
                  rank: index + 1,
                  mp4: stream.url.includes('.mp4') ? stream.url : undefined
                })),
                info: {
                  headers: processedData.info?.headers || {
                    referer: "https://mixdrop.my/"
                  }
                }
              };
              console.log(`  ✅ Bloop data processed: ${processedData.streams.length} streams`);
            } 
            // Special processing for Trenches server
            else if (path.includes('/trenches/')) {
              console.log(`  🔧 Processing Trenches server data`);
              processedData = {
                streams: processedData.streams.map((stream, index) => {
                  let streamUrl = stream.url;
                  
                  // Convert HLS URLs to m3u8-proxy
                  if (streamUrl && streamUrl.includes('.m3u8')) {
                    const encodedUrl = encodeURIComponent(streamUrl);
                    streamUrl = `https://hls.ship.arlen.icu/m3u8-proxy?url=${encodedUrl}`;
                  }
                  
                  return {
                    url: streamUrl,
                    type: stream.type || 'hls',
                    quality: stream.quality || '720p',
                    rank: stream.rank || index + 1,
                    mp4: stream.mp4
                  };
                })
              };
              console.log(`  ✅ Trenches data processed: ${processedData.streams.length} streams`);
            } else {
              console.log(`  🔗 Returning original URLs without processing`);
            }
          }
          
          return {
            statusCode: 200,
            headers: {
              ...headers,
              'Content-Type': response.contentType || 'application/json'
            },
            body: JSON.stringify(processedData)
          };
        } else if (response.status === 429) {
          console.log(`  ⚠️ Rate limited (429) from ${server} - trying next server`);
          lastStatus = response.status;
          lastError = `Rate limited (429)`;
          continue;
        } else {
          console.log(`  ❌ HTTP ${response.status} from ${server}`);
          lastStatus = response.status;
          lastError = `HTTP ${response.status}`;
        }
        
      } catch (error) {
        console.log(`  ❌ Error with ${server}: ${error.message}`);
        lastError = error.message;
        continue;
      }
    }

    // All servers failed
    console.log(`  ❌ All servers failed for: ${fullPath}`);
    
    const errorResponse = {
      error: 'All servers failed',
      message: 'Unable to connect to any external server',
      lastError,
      lastStatus,
      serversTried: API_SERVERS.length,
      path: fullPath,
      timestamp: new Date().toISOString()
    };

    return {
      statusCode: 503,
      headers,
      body: JSON.stringify(errorResponse)
    };

  } catch (error) {
    console.error('❌ Proxy error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message,
        timestamp: new Date().toISOString()
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
        'Referer': 'https://willow.arlen.icu/',
        'Origin': 'https://willow.arlen.icu',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      rejectUnauthorized: false,
      timeout: 15000
    };

    const req = https.get(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            status: res.statusCode,
            data: jsonData,
            contentType: res.headers['content-type']
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: { raw: data },
            contentType: res.headers['content-type']
          });
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

function makeStreamRequest(url, refererHeaders = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        ...refererHeaders
      },
      rejectUnauthorized: false,
      timeout: 30000
    };

    console.log(`🔗 Making stream request to: ${url}`);
    console.log(`📋 Request headers:`, options.headers);

    const req = https.get(url, options, (res) => {
      let data = [];
      
      res.on('data', (chunk) => {
        data.push(chunk);
      });
      
      res.on('end', () => {
        console.log(`📊 Stream response status: ${res.statusCode}`);
        if (res.statusCode === 200) {
          try {
            const buffer = Buffer.concat(data);
            resolve({
              statusCode: res.statusCode,
              contentType: res.headers['content-type'] || 'video/mp4',
              contentLength: res.headers['content-length'],
              body: buffer.toString('base64')
            });
          } catch (e) {
            console.error(`❌ Buffer conversion error:`, e);
            reject(new Error(`Buffer conversion failed: ${e.message}`));
          }
        } else {
          console.log(`❌ HTTP ${res.statusCode} from stream URL`);
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error(`❌ Stream request error:`, error);
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Stream request timeout'));
    });
  });
}
