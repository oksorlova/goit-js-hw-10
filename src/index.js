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
        }
        else if (1 > data.length < 10) {
            countriesMarkup(data);

        }
        if (data.length === 1) {
            countryMarkup(data);

        }

    }
)}
        

function countriesMarkup (countries) {
    let countriesList = countries.map(elem => { return `<li>
    <img class = "countries-info" src="${elem.flags.svg}" alt="${elem.name}">
    ${elem.name}</li>` }).join("");

    counrtyList.innerHTML= countriesList;   
    
    
}

function countryMarkup (countries) {
    let countryItem = countries.map(elem => {
    return `<img class = "countries-info" src="${elem.flags.svg}" alt="${elem.name}">
    ${elem.name}>
    <ul class = "countries-list">
    <li class = "countries-item">Capital:${elem.capital}</li>
    <li class = "countries-item">Population:${elem.population}</li>
    <li class = "countries-item">Languages:${elem.languages}</li>
    </ul>` }).join("");

    countryInfo.innerHTML = countryItem;  
    

    
}


