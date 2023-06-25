import ClearButton from "./ClearButton";

export default function GroceryContainer({ items, setItems, setInputValue,
    setSubmitTitle, setEditId, getLocalStorage, displayAlert }) {

    function deleteItem(id) {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
        removeFromLocalStorage(id);
        setSubmitTitle('Add');
        setInputValue('');
        displayAlert('item deleted', 'danger');
    }

    function editItem(id) {
        const element = items.filter(item => item.id === id);
        const elementTitle = element[0].title;
        setInputValue(elementTitle);
        setSubmitTitle('Edit');
        setEditId(id);
    }

    function removeFromLocalStorage(id) {
        const items = getLocalStorage();
        let updatedItems = items.filter(item => item.id !== id);
        updatedItems = JSON.stringify(updatedItems);
        localStorage.setItem('items', updatedItems);
    }


    return (
        <div className="grocery-container">
            {
                items.map(item => {
                    return <article className='grocery-item' key={item.id}>
                        <p className="title">{item.title}</p>
                        <div className="btn-container">
                            <button className="edit-btn"
                                onClick={() => editItem(item.id)}
                            >
                                Edit
                            </button>
                            <button
                                className="delete-btn"
                                onClick={() => deleteItem(item.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </article>
                })
            }

            <ClearButton
                setItems={setItems}
                getLocalStorage={getLocalStorage}
                displayAlert={displayAlert} />
        </div>
    );
}