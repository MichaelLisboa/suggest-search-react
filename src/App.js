import React, { useState, useEffect, useRef, useReducer } from "react";
import './App.css';
// import Autocomplete from "./Autocomplete";
import {countriesList} from "./Countries";

function App() {
  const items = countriesList; // This could be a GET request to whatever

    const [state, setState] = useState({
        activeItem: 0,
        filteredItems: [],
        displayItems: false,
        inputValue: ''
    })

    const handleChange = (e) => {
        const inputValue = e.currentTarget.value;
        const filteredItems = items.filter(
            x => x.toLowerCase().includes(inputValue.toLowerCase())
        );

        setState({
            activeItem: 0,
            filteredItems,
            displayItems: true,
            inputValue: e.currentTarget.value
        });
    };

    const handleClick = (e) => {
        setState({
            activeItem: 0,
            filteredItems: [],
            displayItems: false,
            inputValue: e.currentTarget.innerText
        });
        fieldRef.current.value = "";
        handleAddItems(e.currentTarget.innerText)
    };

    const handleKeyDown = (e) => {
        const { activeItem, filteredItems } = state;

        if (e.keyCode === 13) { // ENTER KEY
            const inList = filteredItems && items.includes(filteredItems[activeItem]);
            if(!inList || !fieldRef.current.value) return;
            setState({
                activeItem: 0,
                filteredItems: [],
                displayItems: false,
                inputValue: filteredItems[activeItem]
            });
            fieldRef.current.value = "";
            handleAddItems(filteredItems[activeItem]);
        }
        else if (e.keyCode === 27) { //ESCAPE KEY
            e.preventDefault();
            // if (activeItem === 0) {
            //     return;
            // }
            setState({
                activeItem: 0,
                filteredItems,
                displayItems: false,
                inputValue: ''
            })
            fieldRef.current.value = "";
        }
        else if (e.keyCode === 38) { // UP ARROW
            e.preventDefault();
            if (activeItem === 0) {
                return;
            }
            setState({
                activeItem: activeItem - 1,
                filteredItems,
                displayItems: true,
                inputValue: e.currentTarget.value
            });
        }
        else if (e.keyCode === 40) { // DOWN ARROW
            e.preventDefault();
            if ((filteredItems && activeItem === filteredItems.length - 1) || activeItem >= 9) {
                return;
            }
            setState({
                activeItem: activeItem + 1,
                filteredItems,
                displayItems: true,
                inputValue: e.currentTarget.value
            });
        }
    };

    const fieldRef = useRef();
    const [itemsArray, setItemsArray] = useState([]);

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

    function handleAddItems(e) {
        dispatchSelected({
            type: "add",
            name: e
        });
    }

    useEffect(
        () => {
            setItemsArray(selected.map(item => item.name.trim()))
        }, [selected]
    )

  return (
    <section
        className="uk-section uk-light uk-flex uk-flex-center"
        data-uk-height-viewport>
        <div className="uk-padding uk-margin-large-bottom uk-width-1-2@m">
            <h1>Where in the world<br />have you been?</h1>
            <div className="uk-inline uk-width-1-1 uk-margin-top">
                <span className="uk-form-icon" data-uk-icon="icon: world" />
                <input
                    ref={fieldRef}
                    name="languages"
                    label="Items"
                    placeholder="Enter a country and press enter"
                    className="uk-input uk-form-large uk-width-expand uk-border-pill"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    value={(fieldRef.current && fieldRef.current.value) || ""}
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    />

                {state.displayItems && state.inputValue.length && state.filteredItems ?
                    <div className="list-panel uk-panel uk-padding-remove uk-box-shadow-medium">
                        <ul className="uk-list">
                        {
                            state.filteredItems.map((optionName, index) => {
                                return (
                                    <li
                                        className={`uk-text-large uk-text-truncate ${state.activeItem === index ? "active-item" : "default-item"}`}
                                        key = {optionName}
                                        onClick = {handleClick}>
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
            {itemsArray.map((item, index) => (
                <div key={`country_${index}`} className="icon-tags uk-label uk-border-pill uk-width-auto">
                    <span data-uk-icon="icon: close; ratio: 0.8" onClick={() => dispatchSelected({ type: "remove", index })} />
                    <div><p className="uk-text-truncate">{item}</p></div>
                </div>
            ))}
            </div>
        </div>
    </section>
  );
}

export default App;
