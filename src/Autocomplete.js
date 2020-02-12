import React, { useState, useEffect, useRef, useReducer } from "react";

const Autocomplete = props => {

    const fieldRef = useRef();
    const [state, setState] = useState({
        activeItem: 0,
        filteredItems: [],
        displayItems: false,
        inputValue: ''
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

    function handleAddCountries(e) {
        dispatchSelected({
            type: "add",
            name: e
        });
    }

    const onChange = (e) => {
        const inputValue = e.currentTarget.value;
        const filteredItems = countries.filter(
            (optionName) => optionName.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
        );

        setState({
            activeItem: 0,
            filteredItems,
            displayItems: true,
            inputValue: e.currentTarget.value
        });
    };

    const onClick = (e) => {
        setState({
            activeItem: 0,
            filteredItems: [],
            displayItems: false,
            inputValue: e.currentTarget.innerText
        });
        fieldRef.current.value = "";
        handleAddCountries(e.currentTarget.innerText)
    };

    const onKeyDown = (e) => {
        const { activeItem, filteredItems } = state;

        if (e.keyCode === 13) {
            const real = countries.includes(filteredItems[activeItem])
            if(!real || !fieldRef.current.value) return;
            setState({
                activeItem: 0,
                displayItems: false,
                inputValue: filteredItems[activeItem]
            });
            handleAddCountries(filteredItems[activeItem]);
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
                    state.displayItems && state.inputValue.length && state.filteredItems.length ?
                    <div className="list-panel uk-panel uk-padding-small uk-box-shadow-medium">
                        <ul className="uk-list">
                        {
                            state.filteredItems.map((optionName, index) => {
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
                    <span data-uk-icon="icon: close; ratio: 1.15" onClick={() => dispatchSelected({ type: "remove", index })} />
                    <p>{item}</p>
                </div>
            ))}
            </div>
        </>
    )
}

export default Autocomplete;
