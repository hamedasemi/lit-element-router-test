import { LitElement, html, css } from "lit-element";
import { outlet } from "lit-element-router";

@outlet
class Main extends LitElement {
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