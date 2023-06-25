import { useState, useEffect } from "react";
import GroceryContainer from "./GroceryContainer";

export default function InputField({ displayAlert }) {

    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState([]);
    const [submitTitle, setSubmitTitle] = useState('Add');
    const [editId, setEditId] = useState('');

    useEffect(() => {
        const data = getLocalStorage();
        setItems(data);
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        if (inputValue && submitTitle !== 'Edit') {
            addItem(inputValue);
            displayAlert('item added', 'success');
        }
        else if (inputValue && submitTitle === 'Edit') {
            let updatedItems = items.map(item => {
                if (item.id === editId) {
                    return { ...item, title: inputValue }
                }
                return item;
            });
            setItems(updatedItems);
            displayAlert('item updated', 'success');
            setSubmitTitle('Add');
            setEditId('');
            updatedItems = JSON.stringify(updatedItems);
            localStorage.setItem('items', updatedItems);
        }
        else {
            displayAlert('please enter item name', 'danger');
            setSubmitTitle('Add');
        }
        setInputValue('');
    }


    function addItem(item) {
        const itemObj = {
            title: item,
            id: new Date().getTime().toString()
        };
        setItems([...items, itemObj]);
        addToLocalStorage(itemObj);
    }

    function getLocalStorage() {
        const data = localStorage.getItem('items')
            ? JSON.parse(localStorage.getItem('items'))
            : [];
        return data;
    }

    function addToLocalStorage(item) {
        let items = getLocalStorage();
        items.push(item);
        items = JSON.stringify(items);
        localStorage.setItem('items', items);
    }

    return <>
        <form className="input-field" onSubmit={handleSubmit}>
            <input type="text"
                className="text-box"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="e.g. eggs" />
            <input className="add-btn" type="submit"
                value={submitTitle} />
        </form>

        {
            items.length ?
                <GroceryContainer
                    items={items}
                    setItems={setItems}
                    setInputValue={setInputValue}
                    setSubmitTitle={setSubmitTitle}
                    setEditId={setEditId}
                    getLocalStorage={getLocalStorage}
                    displayAlert={displayAlert} />
                : <div>No items in the list...</div>
        }
    </>
}