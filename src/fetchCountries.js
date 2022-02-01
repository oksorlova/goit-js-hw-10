export default function fetchCountries(searchCountry) {
  return fetch(`https://restcountries.com/v3.1/name/${searchCountry}?fields=name,capital,population,flags,languages`)
    .then ((data) => {
        return data.json();
    }).catch ((error) => {
        Notiflix.Notify.error('Oops, there is no country with that name');
})
}
