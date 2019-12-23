// @ts-check
import { LitElement, html, css } from "lit-element";
import { routerMixin, outletMixin } from "lit-element-router";

class Shopping extends routerMixin(outletMixin(LitElement)) {

    static get styles() {
        return css`
            :host {
               display: block;
            }
        `;
    }

    static get properties() {
        return {
            params: { type: Object }
        };
    }

    static get routes() {
        return [{
            name: "shopping",
            pattern: "shopping"
        }, {
            name: "shopping-cart",
            pattern: "shopping/cart",
            authorization: {
                unauthorized: {
                    name: 'shopping-order-unauthorized'
                },
                authorize: () => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve(prompt("Authorize", "true") === "true");
                        }, 1000);
                    });
                }
            }
        }, {
            name: "shopping-order",
            pattern: "shopping/order",
            authentication: {
                unauthenticated: {
                    name: 'shopping-order-unauthenticated'
                },
                authenticate: () => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve(prompt("Authenticate", "true") === "true");
                        }, 1000);
                    });
                }
            },
            authorization: {
                unauthorized: {
                    name: 'shopping-order-unauthorized'
                },
                authorize: () => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve(prompt("Authorize", "true") === "true");
                        }, 1000);
                    });
                }
            }

        }, {
            name: "shopping-not-found",
            pattern: "*"
        }];
    }

    constructor() {
        super();
        this.params = {};
    }

    router(route, params, query, data) {
        this.activeRoute = route;
        this.params = params;
        console.log(route, params, query, data);
    }

    render() {
        return html`
            <app-link href="/shopping">Shopping</app-link>
            <app-link href="/shopping/cart">shapping/cart</app-link>
            <app-link href="/shopping/order">shapping/order</app-link>
            <app-link href="/shopping/not/found">shopping/not/found</app-link>

            <div route="shopping">Shopping</div>
            <div route="shopping-cart">Shopping Cart</div>
            <div route="shopping-order">Shopping Order</div>
            <div route="shopping-order-unauthenticated">Shopping Order Unauthenticated</div>
            <div route="shopping-order-unauthorized">Shopping Order Unauthorized</div>
            <div route="shopping-not-found">Shopping Not Found</div>
        `
    }
}

customElements.define("app-shopping", Shopping);