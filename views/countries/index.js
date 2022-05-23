import { render } from 'ejs';

let people = ['geddy', 'neil', 'alex'];
let html = render('<%= people.join(", "); %>', {people: people});
