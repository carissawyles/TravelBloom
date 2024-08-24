const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');

//function to search for results from JSON file based on user input
function searchKeyword(){
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultDiv = document.getElementById('results');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        var searchTerm;
        //checking to see if input matches at least the first 5 chars of one of the keys in the json object
        for (const key in data){
            if(input.slice(0,5) === key.slice(0,5)){
                searchTerm = key;
            }
        }
        //if the input did match a key, show the results according to the key name
        if(searchTerm){
            if (searchTerm === 'countries'){
                showResultsLong(data[searchTerm]); 
            }
             else{
                showResults(data[searchTerm]); 
            }
        }
        else{
        //if the input didn't match a key, check to see if it matches one of the country names and show the results
            searchTerm = data.countries.find(item => item.name.toLowerCase() === input);
            if(searchTerm){
                showResults(searchTerm.cities); 
            }
        //if no results were found display error message
            else{
                resultDiv.innerHTML = `<p class="error">Search term not found, please try searching for countries, beaches, or temples.</p>`;
            }
        }
        //scroll results into view for mobile searches
        var screenSize = window.matchMedia("(max-width: 815px)")
        if(screenSize.matches){
            resultDiv.innerHTML += `<div class="scroll-top"><a href="#top" class="btn">Scroll to Top ⇑</a></div>`;
            resultDiv.scrollIntoView({ behavior: "smooth"});
        }

        //function accepts an array of destinations
        function showResults(destinations){
            //for each destination object in the array, add HTML with image, name, and description, and append it to the document
            destinations.forEach(destination => {
                const destDiv = document.createElement("div");

                destDiv.classList.add("destination");
                destDiv.innerHTML += `<img src="${destination.imageUrl}" alt="${destination.name}" class="destImg" />`;
                destDiv.innerHTML += `<h3>${destination.name}</h3>`;
                destDiv.innerHTML += `<p>${destination.description}</p>`;

                resultDiv.appendChild(destDiv);
            });
        }
        //countries object has slightly different fields, so we add a heading for each country, then pass the array of cities into the showResults function
        function showResultsLong(countries){
            countries.forEach(country => {
                const countryDiv = document.createElement("div");
                countryDiv.classList.add("country");
                countryDiv.innerHTML += `<h2>${country.name}</h2>`;

                resultDiv.appendChild(countryDiv);
                showResults(country.cities)
            });
        }
    })
    //catch an errors
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = `<p class="error">An error occurred while fetching data.</p>`;
    });
}
//add event listeners so either clicking the search button or pressing enter in the input field will trigger the searchKeyword function
btnSearch.addEventListener('click', searchKeyword);
document.getElementById('searchInput').addEventListener('keypress', function(e){
    if (e.key === "Enter"){searchKeyword();}
});

//add event listener to clear the results and search field when the clear button is clicked
btnClear.addEventListener('click', function(e){
    const input = document.getElementById('searchInput');
    const resultDiv = document.getElementById('results');
    input.value= '';
    resultDiv.innerHTML = '';
    input.focus();
});