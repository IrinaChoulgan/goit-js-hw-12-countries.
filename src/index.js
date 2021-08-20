import './sass/main.scss';
var debounce = require('lodash.debounce');
import { alert, defaultModules } from  '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
//import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/BrightTheme.css';



const refs = {
    form: document.querySelector('#form'),
    input: document.querySelector('input'),
    container: document.querySelector('.container')
}

const handlerInput = (e) => {
    e.preventDefault()
    clearCountriesContainer()
    const name = refs.input.value;
    fetch(`https://restcountries.eu/rest/v2/name/${name}`)
    .then(response => response.json())
    .then(country => {
        if (country.length > 10) {
            defaultModules.set(PNotifyMobile, {});
            alert({
                text: 'Too many matches found. Please enter a more specific query.'
            });
        };
        if (country.length > 1 && country.length <= 10) {
            renderCountriesCollection(country);
        }
        if (country.length === 1) {
            renderCountry(country);
        }
//     if (data.length > 10) {
//         error({
//         text: "Too many matches found. Please enter a more specific query!"
//     });    
//  } else if (country.length > 1) {
//         renderCountry(country, createCountry);
//     } 
//     else if (country.length <= 10) {
//         renderCountriesCollection(country, createCountriesCollection);
//     }

        // renderCountry(country);
        // console.log(country.length)
  })
    .catch(err => {console.log(err)})
}

refs.form.addEventListener('input', debounce(handlerInput, 500));

