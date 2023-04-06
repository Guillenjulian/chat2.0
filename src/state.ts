import { dataBase } from "./db";
import { map } from "lodash";
const API_BASE_URL = "http://localhost:3000";

const state = {
  data: {
    rtdbRoomId: "",
    name: "",
    email: "",
    userId: "",
    roomId: "",
    messages: [],
  },
  listeners: [],
  init() {
    if (window.localStorage.getItem("state")) {
      const local: any = window.localStorage.getItem("state");
      const localParseado = JSON.parse(local);
      //  console.log("localStorage:::::::", localParseado);
      this.setState(localParseado);

      this.listenRoom();
    }
  },
  listenRoom() {
    const currentstate = this.getState();
    const rtdbRoomId = currentstate.rtdbRoomId;
    const chatroomsRef = dataBase.ref("/rooms/" + rtdbRoomId);
    chatroomsRef.on("value", (snapshot) => {
      const messagesFromServer = snapshot.val();
      const messagesList = map(messagesFromServer);
      currentstate.messages = messagesList;
      this.setState(currentstate);
    });
  },
  getState() {
    return this.data;
  },
  setState(newState) {
    this.data = newState;
    //console.log(newState);

    for (const cd of this.listeners) {
      cd();
    }
    localStorage.setItem("state", JSON.stringify(newState));
    console.log("soy el state y e cambiado", this.data);
  },

  setEmail(email: string, name: string) {
    const currenstate = this.getState();
    currenstate.email = email;
    currenstate.name = name;

    this.setState(currenstate);
  },
  signup(email: string, name: string) {
    const currentState = this.getState();
    const emailFromState = currentState.email as string;
    const nameFromState = currentState.name as string;

    if (emailFromState && nameFromState) {
      return fetch(API_BASE_URL + "/signup", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: emailFromState,
          name: nameFromState,
        }),
      })
        .then((res) => {
          // if (res.ok) {
          //   throw new Error("Error al realizar la solicitud");
          // }
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            return res.json();
          } else {
            throw new Error("La respuesta del servidor no es JSON");
          }
        })
        .then((data) => {
          // console.log(data);

          currentState.userId = data.id;
          //  console.log(currentState.userId);

          this.setState(currentState);
        });
    } else {
      console.error("No hay un usuario en el state");
    }
  },

  singIn(email) {
    const currenstate = this.getState();

    const emailFromState = currenstate.email;

    console.log(emailFromState, "estes es el mail");

    if (emailFromState) {
      return fetch(API_BASE_URL + "/auth", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: emailFromState,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          currenstate.userId = data.id;
          // console.log(currenstate.userId);

          this.setState(currenstate);
        });
    } else {
      console.error("no hay un Email en el state");
    }
  },
  askNewRoom() {
    const currenstate = this.getState();
    if (currenstate.userId) {
      return fetch(API_BASE_URL + "/rooms", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId: currenstate.userId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          currenstate.roomId = data.id;
          //  console.log(data.id, "esta es la data desde ask");

          this.setState(currenstate);

          const roomIdEl = currenstate.roomId;
          //console.log("estes es el roomID", roomIdEl);

          this.accessToRoom(roomIdEl);

          //  console.log("este es el currend desde el ask", currenstate);
        });
    } else {
      console.log("no hay user id");
    }
  },

  accessToRoom(roomId?) {
    const currenstate = this.getState();
    const userId = currenstate.userId;
    // const roomId = currenstate.roomId;

    return fetch(API_BASE_URL + "/rooms/" + roomId + "?userId=" + userId, {})
      .then((res) => res.json())
      .then((data) => {
        console.log("id del room desdela api", data.rtdrRoomID);
        currenstate.rtdbRoomId = data.rtdrRoomID;

        this.setState(currenstate);
        this.listenRoom();
      });
  },

  pushManager(messages: string) {
    const currenstate = this.getState();
    //  console.log(currenstate, "desde el push");
    const nameFromState = currenstate.name;
    //console.log(nameFromState, "este es el pushmessage");
    const messageFromState = currenstate.messages;
    console.log(messageFromState);
    const rtdbRoomIdFromState = currenstate.rtdbRoomId;
    console.log(rtdbRoomIdFromState, "este es desde menssages");

    fetch(API_BASE_URL + "/messages", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: nameFromState,
        message: messages,
        rtdbRoomId: currenstate.rtdbRoomId,
      }),
    }).then(() => this.listenRoom());
  },

  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };
