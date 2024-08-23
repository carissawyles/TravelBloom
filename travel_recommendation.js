const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');

function searchKeyword(){
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultDiv = document.getElementById('results');

    fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        if (input.slice(0,5) === 'count'){
            showResultsLong(data.countries); resultDiv.scrollIntoView({ behavior: "smooth"});}
        else if (input.slice(0,5) === 'templ'){
            showResults(data.temples); resultDiv.scrollIntoView({ behavior: "smooth"});}
        else if(input.slice(0,5) === 'beach'){
            showResults(data.beaches); resultDiv.scrollIntoView({ behavior: "smooth"}); }
        else{
            resultDiv.innerHTML = `<p class="error">Search term not found, please try searching for countries, beaches, or temples.</p>`;
            resultDiv.scrollIntoView({ behavior: "smooth"});
        }

        function showResults(destinations){
            destinations.forEach(destination => {
                const destDiv = document.createElement("div");
    
                destDiv.classList.add("destination");
                destDiv.innerHTML += `<img src="${destination.imageUrl}" alt="${destination.name}" class="destImg" />`;
                destDiv.innerHTML += `<h3>${destination.name}</h3>`;
                destDiv.innerHTML += `<p>${destination.description}</p>`;

                resultDiv.appendChild(destDiv);
            });
        }
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
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
    });
}
btnSearch.addEventListener('click', searchKeyword);
document.getElementById('searchInput').addEventListener('keypress', function(e){
    if (e.key === "Enter"){searchKeyword();}
});

btnClear.addEventListener('click', function(e){
    const input = document.getElementById('searchInput');
    const resultDiv = document.getElementById('results');
    input.value= '';
    resultDiv.innerHTML = '';
    input.focus();
});