export default function ClearButton({setItems, getLocalStorage, displayAlert}) {

    function clearItems() {
        setItems([]);
        const data = getLocalStorage();
        while(data.length) {
            data.pop();
        }
        displayAlert('List cleared', 'danger');
        localStorage.setItem('items', JSON.stringify(data));
    }

    return <button className="clear-btn" onClick={clearItems}>Clear Items</button>
}