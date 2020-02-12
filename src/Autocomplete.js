import React, { useState, useEffect, useRef, useReducer } from "react";

const Autocomplete = props => {

    const fieldRef = useRef();
    const [state, setState] = useState({
        activeOption: 0,
        filteredOptions: [],
        showOptions: false,
        userInput: ''
    })

    const [countries, setCountries] = useState(props.countries);
    const [countriesArray, setCountriesArray] = useState([]);
    const [selected, dispatchSelected] = useReducer((state, action) => {
        switch (action.type) {
            case "add":
                return [...state, { id: state.length, name: action.name }];
            case "remove":
                return state.filter((_, index) => index !== action.index);
            case "empty":
                return []
            default:
                return state;
        }
    }, []);

    // useEffect(
    //     () => {
    //         const countryList = countries.filter(item => !countriesArray.includes(item));
    //         setCountries(countryList)
    //     }, [countriesArray, dispatchSelected]
    // )

    function handleAddCountries(e) {
        dispatchSelected({
            type: "add",
            name: e
        });
    }

    const onChange = (e) => {
        const userInput = e.currentTarget.value;
        const filteredOptions = countries.filter(
            (optionName) => optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        setState({
            activeOption: 0,
            filteredOptions,
            showOptions: true,
            userInput: e.currentTarget.value
        });
    };

    const onClick = (e) => {
        setState({
            activeOption: 0,
            filteredOptions: [],
            showOptions: false,
            userInput: e.currentTarget.innerText
        });
        fieldRef.current.value = "";
        handleAddCountries(e.currentTarget.innerText)
    };

    const onKeyDown = (e) => {
        const { activeOption, filteredOptions } = state;

        if (e.keyCode === 13) {
            const real = countries.includes(filteredOptions[activeOption])
            if(!real || !fieldRef.current.value) return;
            setState({
                activeOption: 0,
                showOptions: false,
                userInput: filteredOptions[activeOption]
            });
            handleAddCountries(filteredOptions[activeOption]);
            fieldRef.current.value = "";
        }
    };

    useEffect(
        () => {
            setCountriesArray(selected.map(item => item.name.trim()))
        }, [selected]
    )

    return (
        <>
            <div>
                <input
                    ref={fieldRef}
                    name="languages"
                    label="Countries"
                    className="uk-input uk-form-large uk-width-expand"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={(fieldRef.current && fieldRef.current.value) || ""}
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    />

                {
                    state.showOptions && state.userInput.length && state.filteredOptions.length ?
                    <div className="list-panel uk-panel uk-background-default uk-padding-small uk-box-shadow-medium">
                        <ul className="uk-list uk-table-hover">
                        {
                            state.filteredOptions.map((optionName, index) => {
                                return (
                                    <li
                                        key = {optionName}
                                        onClick = {onClick}>
                                        {optionName}
                                    </li>
                                )
                            }).slice(0, 10)
                        }
                        </ul>
                    </div>
                    : null
                }
            </div>

            <div className="tag-container uk-margin-top" data-uk-margin>
            {countriesArray.map((item, index) => (
                <div key={`country_${index}`} className="icon-tags uk-label uk-border-pill uk-width-auto uk-margin-small-right">
                    <span data-uk-icon="icon: close; ratio: 1.5" onClick={() => dispatchSelected({ type: "remove", index })} />
                    <p>{item}</p>
                </div>
            ))}
            </div>
        </>
    )
}

export default Autocomplete;
