const fs = require('fs');

// Your YouTube Data API key
var apiKey = 'Your YouTube Data API key';

// Playlist ID of your YouTube playlist
var playlistId = 'Playlist ID of your YouTube playlist';

// Function to fetch playlist items from YouTube Data API
function fetchPlaylistItems(pageToken = '') {
    fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&pageToken=${pageToken}&playlistId=${playlistId}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.items) {
                // Extract video IDs and construct video URLs
                var videoUrls = data.items.map(item => `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`);
                console.log(videoUrls);

                // Write video URLs to a text file
                fs.appendFileSync('videoUrls.txt', videoUrls.join('\n') + '\n');

                // Check if there are more pages
                if (data.nextPageToken) {
                    // Make recursive call to fetch next page
                    fetchPlaylistItems(data.nextPageToken);
                }
            } else {
                console.error('No items found in the playlist');
            }
        })
        .catch(error => {
            console.error('Error fetching playlist items:', error);
        });
}

// Call the function to start fetching playlist items
fetchPlaylistItems();
