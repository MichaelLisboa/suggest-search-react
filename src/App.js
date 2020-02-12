import React from 'react';
import './App.css';
import Autocomplete from "./Autocomplete";
import {countriesList} from "./Countries";

function App() {
  return (
    <section className="uk-section uk-section-primary uk-flex uk-flex-top uk-flex-center" data-uk-height-viewport>
        <div className="uk-width-1-2">
            <h2>Type in a country</h2>
            <Autocomplete countries={countriesList} />
        </div>
    </section>
  );
}

export default App;
