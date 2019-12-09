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
            pattern: "shopping/cart"
        }, {
            name: "shopping-order",
            pattern: "shopping/order"
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
            <div route="shopping-not-found">Shopping Not Found</div>
        `
    }
}

customElements.define("app-shopping", Shopping);