export class Welcome extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    const div = document?.createElement("div");
    const style = document.createElement("style");
    // console.log(div);
    div.className = "container-form";
    div.innerHTML = `
    <div class="body">
    <header-element></header-element>
   
    <form-welcome></form-welcome>

    
    <footer-element></footer-element>
    </div>

      `;
    style.innerHTML = `
    .body{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    .container-form{
    }
    

.
`;
    div.append(style);
    this.shadowRoot.appendChild(div);
  }
}

customElements.define("welcome-pages", Welcome);
