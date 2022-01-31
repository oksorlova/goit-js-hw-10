export default function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,languages`)
    .then (data => {
        return data.json();
    })
}