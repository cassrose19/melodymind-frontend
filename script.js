async function searchMusic() {
    const prompt = document.getElementById("prompt").value;
    const responseContainer = document.getElementById("results");
    responseContainer.innerHTML = "Loading...";
  
    try {
      const response = await fetch("http://localhost:5051/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });
  
      const data = await response.json();
      console.log("Response data:", data);
  
      if (Array.isArray(data)) {
        responseContainer.innerHTML = "";
        data.forEach(item => {
          const div = document.createElement("div");
          div.innerHTML = `
            <div class="bg-white p-4 rounded-lg shadow-md">
              <h3 class="text-xl font-semibold text-blue-600">${item.title}</h3>
              <p class="text-gray-700">by <em>${item.artist}</em></p>
              <p class="text-sm text-gray-500">Match score: ${item.match_score.toFixed(2)}</p>
              <p class="text-sm text-gray-600">${item.reason}</p>
              <a class="text-blue-500 underline mt-2 inline-block" href="${item.spotify_url}" target="_blank">Listen on Spotify</a>
            </div>
          `;
          responseContainer.appendChild(div);
        });
      } else {
        responseContainer.innerHTML = "No results found.";
      }
    } catch (error) {
      console.error("Fetch error:", error);
      responseContainer.innerHTML = "An error occurred.";
    }
  }
  
  
  