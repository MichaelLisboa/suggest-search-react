import React from 'react';
import './App.css';
import Autocomplete from "./Autocomplete";
import {countriesList} from "./Countries";

function App() {
  return (
    <section
        className="uk-section uk-light uk-flex uk-flex-center uk-overflow-auto">
        <div className="uk-padding uk-margin-large-bottom uk-width-1-2@m">
            <h1>Where in the world<br />have you been?</h1>
            <Autocomplete countries={countriesList} />
        </div>
    </section>
  );
}

export default App;
