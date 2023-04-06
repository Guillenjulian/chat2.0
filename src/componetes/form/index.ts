import { state } from "../../state";
import { map } from "lodash/map";

type Message = {
  name: string;
  message: string;
};

export class Header extends HTMLElement {
  constructor() {
    super();
    this.conncTedCallback();
    this.render();
  }

  conncTedCallback() {
    state.subscribe(() => {
      const currenstate = state.getState();
      const userIds = currenstate.userId;

      const messageFromState = currenstate.messages;

      this.messages = messageFromState;
      this.render();
    });
    this.render();
  }
  addLissteners() {
    const form = this.querySelector(".submit-message") as any;
    form.addEventListener("submit", (e: any) => {
      e.preventDefault();
      const target = e.target as any;
      state.pushManager(target["new-message"].value);

      // console.log(target["new-message"].value);
      this.render();
    });
  }
  messages: Message[] = [];
  render() {
    const div = document.createElement("div");

    //console.log("Eeste mensasge", this.messages);

    div.className = "contenedor";
    div.innerHTML = `
    <div class = "messages">

    
    ${this.messages
      .map((m) => {
        let name = state.data.name;
        let userName = "";
        if (name === m.name) {
          userName = "user";
        }
        if (name !== m.name) {
          userName = "otroUser";
        }

        return `  
        <div class ="li-container">
        <spam class=" li_spam">${m.name} </spam>
        <li  class ="${userName}">
       <p>
        ${m.message}
       </p>
        
        </li>
        
        
        </div>
        `;
      })
      .join("")}
  

      </div>
      <div  >
      <form class= "submit-message">
      <input class= "imput" type="text"  name="new-message"  ><br>
      
      <button class="button">Ingresar</button>
      </form>
      
      
      </div>

      `;
    const style = document.createElement("style");

    style.innerHTML = `

    .contenedor{
      display: flex;
      align-items: center;
      flex-direction: column;
    }
 
    .submit-message {
      width: 150vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      margin-bottom: 20px;
      padding: 10px;
      border-radius: 5px;
      background-color: #ffffff;
      
    }
    
    .imput {
      width: 74vh;
      padding: 5px;
      border-radius: 5px;
      background-color: #fff;
      font-size: 14px;
      line-height: 1.5;
    }
    

    .button {
      width: 77vh;
      padding: 10px;
      border: none;
      border-radius: 5px;
      background-color: #0077cc;
      color: #ffffff;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
    }
 
    
    .messages{
      display: flex;
      flex-direction: column;
      border: solid 3px black;
      width: 500px;
      height: 250px;
      margin: 10px;
      margin-top: 10px;
      overflow-y: scroll;
      scroll-snap-align: end;
  scroll-snap-type: y 
      align-items: center; border-radius: 5px;
      
    }
    
      .li-container{
        display: flex;
        flex-direction: column;
        border-radius: 100px 100px 100px 6px;
        font-size: 17px;
        list-style-type: none;
        gap:10px;
        margin:5px;
        scroll-snap-align: end;
        
      }
  
      .user {
        background-color:#B9E97C ;
        overflow: hidden;
        border-radius: 12px;
        scroll-snap-align: end;
        
      }
   
      .li_spam{
        font-size: 14px; 
      }

    p{
      text-align:center;
      margin:5px;
    }

    .otroUser{
      background-color:#D8D8D8 ;
      font-size: 17px;
      overflow: hidden;
      scroll-snap-align: end;
      border-radius: 84px 84px 89px 2px;
      text-align: end;
    }
    /* El contenido se alinea a la izquierda */
    .messages .li-container:has(.user) {
      align-self: start;
    }
    /* El contenido se alinea a la derecha */
    .messages .li-container:has(.otroUser) {
      align-self: end;
    }
 
    `;

    div.appendChild(style);

    this.innerHTML = ``;
    this.append(div);
    const chatSecction = div.querySelector(".messages");

    chatSecction.scroll({
      top: 1000,
      left: 0,
      behavior: "auto",
    });

    this.addLissteners();
  }
}
customElements.define("form-element", Header);
