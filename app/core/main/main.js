// @ts-check
import { LitElement, html, css } from "lit-element";
import { outletMixin } from "lit-element-router";

export class Main extends outletMixin(LitElement) {
    static get styles() {
        return css`
            :host {
               color: gray;
            }
        `;
    }

    render() {
        return html`
            <slot></slot>
        `;
    }
}

customElements.define("app-main", Main);