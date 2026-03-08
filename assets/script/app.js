'use strict'

class App {
    constructor(data) {
        this.data = data;
        this.durations = [
            ...new Set(this.data.adventures.map(i => i.howMuch))
        ];

        for (let duration of this.durations) {
            this[duration] = this.data.adventures
                .filter(i => i.howMuch == duration)
                .map(i => i.what);
        }
    }

    checkBox(duration) {
        const div = document.createElement('div');
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = duration;
        input.value = duration;
        input.name = 'duration';
        div.appendChild(input);
        const label = document.createElement('label');
        label.htmlFor = input.id;
        label.innerText = duration;
        div.appendChild(label);
        return div;
    }

    chooseActivity(options) {
        let randomOption = 0;
        if (options.length > 1) {
            randomOption = Math.floor(Math.random() * options.length);
        }

        let option = this[options[randomOption]];
        let randomActivity = Math.floor(Math.random() * option.length)

        return this[options[randomOption]][randomActivity];
    }
}

document.addEventListener('DOMContentLoaded', init);

async function init() {
    const form = document.forms.form;
    const fieldset = form.duration;
    const msg = document.querySelector('#msg');

    const data = await getData();
    const app = new App(data);

    msg.innerText = "Choose the duration of the activity you would like to do...";

    for (let duration of app.durations) {
        const checkbox = app.checkBox(duration);
        fieldset.appendChild(checkbox);
    }

    form.addEventListener('submit', function(evt){
        evt.preventDefault();
        const formData = new FormData(form);
        const checked = formData.getAll('duration');

        if (checked.length) {
            const activity = app.chooseActivity(checked);
            msg.innerText = `You could ${activity}`;
        }
    });
}

async function getData() {
    const res = await fetch('.netlify/functions/api');
    const data = await res.json();
    return data;
}
