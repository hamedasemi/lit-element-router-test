import { LitElement, html, css, unsafeCSS } from "lit-element";
import { navigator } from "lit-element-router";

@navigator
class Link extends LitElement {
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
        // @ts-ignore
        this.navigate(this.href);
    }
}

customElements.define("app-link", Link);