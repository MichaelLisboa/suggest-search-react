import React from 'react';
import './App.css';
import Autocomplete from "./Autocomplete";
import {countriesList} from "./Countries";

function App() {
  return (
    <section className="uk-section uk-section-primary uk-flex uk-flex-top uk-flex-center" data-uk-height-viewport>
        <div className="uk-padding-small uk-width-1-2@m">
            <h3>Start typing a country name</h3>
            <Autocomplete countries={countriesList} />
        </div>
    </section>
  );
}

export default App;
