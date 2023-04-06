import { state } from "../../state";

export class TitleChat extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    const div = document.createElement("div");
    div.className = "container";
    const data = state.getState().roomId;
    div.innerHTML = `
      <h1 class="title"> Bienvenido a el Chat </h1>
      <h3> Esta es la sala ${state.getState().roomId} </h3>
      `;
    const style = document.createElement("style");
    style.innerHTML = `
    .container{
      display: flex;
      flex-direction: column;
    
    }
      .title{
        font-size: 2rem;
        font-weight: 600;
        color: #000;
        text-align: center;
        margin-top: 1rem;
        margin-bottom: 1rem;
    
        height: 122px;
        text-align: center;
        

      }
      `;
    div.append(style);
    this.appendChild(div);
    return div;
  }
}
customElements.define("title-chat", TitleChat);
