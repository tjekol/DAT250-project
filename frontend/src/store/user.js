import {writable} from "svelte/store";

const storedUser = JSON.parse(localStorage.getItem('user'));
const user = writable(storedUser || null);

user.subscribe(value => {
    if (value) {
        localStorage.setItem('user', JSON.stringify(value));
    } else {
        localStorage.removeItem('user');
    }
})

export default user
