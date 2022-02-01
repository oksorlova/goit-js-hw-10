import './css/styles.css';
import debounce from 'lodash.debounce'
import fetchCountries from './fetchCountries.js';
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const counrtyList = document.querySelector ('.country-list');
const countryInfo = document.querySelector ('.country-info');


searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    let searchCountry = e.target.value.trim();
    if (searchCountry === "") {
        counrtyList.innerHTML ="";
        countryInfo.innerHTML ="";
        return;
    }

    fetchCountries(searchCountry).then((data) => {
        if (data.length > 10) {
            Notiflix.Notify.failure('Too many matches found. Please enter a more specific name.');
            counrtyList.innerHTML ="";
            countryInfo.innerHTML ="";

        }
        else if (data.length < 10 && data.length > 1) {
            counrtyList.innerHTML ="";
            countryInfo.innerHTML ="";
            countriesMarkup(data);
            

        }
        if (data.length === 1) {
            counrtyList.innerHTML ="";
            countryInfo.innerHTML ="";
            countryMarkup(data);
            

        }

    }
)}
        

function countriesMarkup (countries) {
    let countriesList = countries.map((elem) => { return `<li class="countries-item">
    <img class="countries-info" src="${elem.flags.svg}" alt="${elem.name.official}" width ="100">
    <p class = "country-name">${elem.name.official}</p>
    <li>`
}).join('')

    counrtyList.innerHTML= countriesList;      
    
}

function countryMarkup (countries) {
    let countryItem = countries.map((elem) => { return`<img class = "countries-img" src="${elem.flags.svg}" alt="${elem.name.official}" width ="500">  
    <p class = "country-name">${elem.name.official}</p>
    <ul class = "countries-list">
    <li class = "countries-item"><b>Capital:</b>${elem.capital}</li>
    <li class = "countries-item"><b>Population:</b>${elem.population}</li>
    <li class = "countries-item"><b>Languages:</b>${elem.languages}</li>
    </ul>` }).join("");

    countryInfo.innerHTML = countryItem;  
    
    
}


