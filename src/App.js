import React from 'react';
import './App.css';
import Autocomplete from "./Autocomplete";
import {countriesList} from "./Countries";

import image from "./image1.jpg"

function App() {
  return (
    <section
        style={{backgroundImage: `url(${image})`}}
        className="uk-section uk-background-cover uk-background-primary uk-light uk-flex uk-flex-center"
        data-uk-height-viewport="offset-top: true;">
        <div className="uk-padding uk-width-1-2@m">
            <h1>Where in the world<br />have you been?</h1>
            <Autocomplete countries={countriesList} />
        </div>
    </section>
  );
}

export default App;
