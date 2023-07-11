function fetchDogData() {
    var apiKey = "live_ipHbxxk5ZbrvaLFkke0ggWAWFxQjL3nlWoxRK39Zq0FuSuSITkqPNV3nwTDY99iH"; // Replace with your actual API key
    var apiUrl = "https://api.thedogapi.com/v1/breeds";

    fetch(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey
        }
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          var dogSelect = document.getElementById("dogSelect");

          data.forEach(function(dog) {
            var option = document.createElement("option");
            option.value = dog.id;
            option.text = dog.name;
            dogSelect.appendChild(option);
          });
        })
        .catch(function(error) {
          console.log("Error fetching dog data:", error);
        });
    }

    function displayDogDetails() {
      var dogSelect = document.getElementById("dogSelect");
      var selectedDogId = dogSelect.value;

      if (selectedDogId) {
        var apiKey = "YOUR_API_KEY"; // Replace with your actual API key
        var apiUrl = "https://api.thedogapi.com/v1/breeds/" + selectedDogId;

        fetch(apiUrl, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey
          }
        })
          .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            var dogDetailsElement = document.getElementById("dogDetails");
            
          

            var html = "";
          if (data.image && data.image.url) {
                html += "<img src=\"" + data.image.url + "\" alt=\"" + data.name + "\" style=\"max-width: 300px; max-height: 300px; border: 1px solid #ccc; border-radius: 5px ;\">";
              }else{
                console.log(data, "my data")
              }

           
            html += "Name: " + (data.name || "") + "<br>";
            html += "Weight: " + (data.weight ? data.weight.imperial + " lbs" : "") + "<br>";
            html += "Height: " + (data.height ? data.height.imperial + " inches" : "") + "<br>";
            html += "Bred for: " + (data.bred_for || "") + "<br>";
            html += "Breed group: " + (data.breed_group || "") + "<br>";
            html += "Life span: " + (data.life_span || "") + "<br>";
            html += "Temperament: " + (data.temperament || "") + "<br>";
            html += "Origin: " + (data.origin || "") + "<br>";
           
           
            dogDetailsElement.innerHTML = html;
          
          })
          .catch(function(error) {
            console.log("Error fetching dog details:", error);
          });
      } else {
        var dogDetailsElement = document.getElementById("dogDetails");
        dogDetailsElement.innerHTML = "Please select a dog.";
      }
  }

  // Fetch dog data when the page loads
  fetchDogData();

  function fetchProjects() {
    var apiUrl = "https://api.todoist.com/rest/v2/projects";
  
    fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var projectList = document.getElementById("projectList");
  
        data.forEach(function(project) {
          var listItem = document.createElement("li");
          listItem.classList.add("list-group-item");
          listItem.textContent = project.name;
          projectList.appendChild(listItem);
        });
      })
      .catch(function(error) {
        console.log("Error fetching projects:", error);
      });
  }
  
  // Fetch projects when the page loads
  fetchProjects();
  
  
  function getUVData() {
    const apiKey = 'openuv-2u2rljy5gpl9-io';
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    const altitude = document.getElementById('altitude').value;
    const date = document.getElementById('date').value;

    const url = `https://api.openuv.io/api/v1/uv?lat=${latitude}&lng=${longitude}&alt=${altitude}&dt=${date}`;

    fetch(url, {
        headers: {
            'x-access-token': apiKey
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.result) {
                const resultContainer = document.getElementById('result');
                resultContainer.innerHTML = `<p>UV Index: ${data.result.uv_index}</p>
                                             <p>Safe Exposure Time: ${data.result.safe_exposure_time.st1}</p>`;
            } else {
                throw new Error('Invalid response from API');
            }
        })
        .catch(error => {
            const resultContainer = document.getElementById('result');
            resultContainer.innerHTML = `<p class="error">${error.message}</p>`;
        });
}

function getQuote() {
  fetch('https://api.breakingbadquotes.xyz/v1/quotes')
      .then(response => response.json())
      .then(data => {
          if (Array.isArray(data) && data.length > 0) {
              const quoteContainer = document.getElementById('quoteContainer');
              const quote = data[0];
              const quoteHTML = `
                  <div class="quote-container">
                      <p class="quote-text">${quote.quote}</p>
                      <p class="quote-author">- ${quote.author}</p>
                  </div>`;
              quoteContainer.innerHTML = quoteHTML;
          } else {
              throw new Error('No quotes found.');
          }
      })
      .catch(error => {
          const quoteContainer = document.getElementById('quoteContainer');
          quoteContainer.innerHTML = `<p class="error">${error.message}</p>`;
      });
}