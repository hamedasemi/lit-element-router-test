// @ts-check
import { } from "@webcomponents/webcomponentsjs";

import { LitElement, html } from "lit-element";
import { routerMixin } from "lit-element-router";

import { } from "./core/main/main";
import { } from "./shared/link/link";

import { } from "./shopping/shopping";

class App extends routerMixin(LitElement) {

    static get properties() {
        return {
            route: { type: String },
            query: { type: Object },
            params: { type: Object }
        };
    }

    static get routes() {
        return [{
            name: "home",
            pattern: "",
            data: { title: "Home" },
            callback: (route, params, query, data) => { console.log("callback", route, params, query, data) },
            authentication: {
                unauthenticated: {
                    name: 'home-unauthenticated'
                },
                authenticate: () => {
                    return true;
                }
            },
        }, {
            name: "info",
            pattern: "info"
        }, {
            name: "shopping",
            pattern: "shopping.*"
        }, {
            name: "user",
            pattern: "user/:id",
            authentication: {
                unauthenticated: {
                    name: 'user-unauthenticated'
                },
                authenticate: () => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve(prompt("Authenticate", "true") === "true");
                        }, 1000);
                    });
                }
            },
        }, {
            name: "not-found",
            pattern: "*"
        }];
    }

    constructor() {
        super();
        this.route = "";
        this.params = {};
    }

    router(route, params, query, data) {
        this.route = route;
        this.params = params;
        this.query = query;
        console.log(route, params, query, data);
    }

    render() {
        return html`
            <app-link href="/">Home</app-link>
            <app-link href="/info">Info</app-link>
            <app-link href="/info?foo=bar">Info</app-link>
            <app-link href="/shopping">Shopping</app-link>
            <app-link href="/user/14">user/14</app-link>
            <app-link href="/user/16">user/16</app-link>
            <app-link href="/user/16/not/found">user/16/not/found</app-link>

            <app-main active-route="${this.route}">
                <div route="home">Home</div>
                <div route="info">Info ${this.query.foo}</div>
                <app-shopping route="shopping"></app-shopping>
                <div route="user">User ${this.params.id}</div>
                <div route="home-unauthenticated">Home Unauthenticated</div>
                <div route="user-unauthenticated">User Unauthenticated</div>
                <div route="not-found">Not Found</div>
            </app-main>
        `
    }
}

customElements.define("my-app", App);