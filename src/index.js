import './css/styles.css';
var debounce = require('lodash.debounce');
import fetchCountries from './fetchCountries';


const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('input#search-box');

searchInput.addEventListener ('input', debounce(fetchCountries, DEBOUNCE_DELAY));


