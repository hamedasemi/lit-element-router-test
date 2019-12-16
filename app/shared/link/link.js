// @ts-check
import { LitElement, html, css, unsafeCSS } from "lit-element";
import { routerMixin, outletMixin, navigateMixin } from "lit-element-router";

export class Link extends navigateMixin(LitElement) {
    constructor() {
        super();
        this.href = "";
    }
    static get properties() {
        return {
            href: { type: String }
        };
    }
    render() {
        return html`
            <a href="${this.href}" @click="${this.linkClick}"><slot></slot></a>
        `;
    }
    linkClick(event) {
        event.preventDefault();
        this.navigate(this.href);
    }
}

customElements.define("app-link", Link);