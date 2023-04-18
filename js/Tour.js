AFRAME.registerComponent("tour", {
    schema: {
        state: {type: "string", default: "places-list"},
        selectedPlace: {type: "string", default: "#card1"},
        zoomAspectRatio: {type: "number", default: 1}
    },

    init: function(){
        this.placesContainer = this.el;
        this.cameraE1 = document.querySelector("#camera");
        this.createPlaace();
    },

    tick: function(){
        const {state} = this.el.getAttribute("tour");
        if(state == "view"){
            this.hideE1([this.placesContainer]);
            this.showView();
        }
    },

    hideE1: function(elList){
        elList.map(e1 => {
            el.setAttribute("visible", false)
        })
    },
    
    createPlace: function(){
        const details = {
            room_1: {
                position: {x: 0, y: 0, z: -4},
                src: "./assets/360-images/room_1.jpeg",
                title: "Bedroom 1",
                id: "room_1"
            },
            
            room_2: {
                position: {x: -5, y: 0, z: -4},
                src: "./assets/360-images/room_2.jpeg",
                title: "Room 2",
                id: "room_2"
            },

            living_room: {
                position: {x: -10, y: 0, z: -4},
                src: "./assets/360-images/living_room.jpeg",
                title: "Living Room",
                id: "living_room"
            },

            lobby: {
                position: {x: 5, y: 0, z: -4},
                src: './assets/360-images/lobby.jpeg',
                title: "Lobby",
                id: "lobby"
            },

            balcony: {
                position: {x: 10, y: 0, z: -4},
                src: "./assets/360-images/balcony.jpeg",
                title: "Balcony",
                id: "balcony"
            }
        };

        for(var key in details){
            const item = details[key]
            const thumbNail = this.createThumbnail(item)
            const title = this.createTitleE1(item)

            thumbNail.appendChild(title)
            this.placesContainer.appendChild(thumbNail)
        }
    },

    createThumbnail: function(){
        const entityE1 = document.createElement("a-entity")
        const id = `place-$(item.id)`;
        
        entityE1.setAttribute("visible", true)
        entityE1.setAttribute("id", id)
        entityE1.setAttribute("geometry", {
            primitive: "circle",
            radius: 3
        });

        entityE1.setAttribute("position", item.position);
        entityE1.setAttribute("rotation", item.rotation);
        entityE1.setAttribute("material", { src: item.src, opacity: 0.6 });
        entityE1.setAttribute("cursor-listener", {});
        return entityE1;
    },

    createTitleEl: function(item) {
        const entityEl = document.createElement("a-entity");
        const id = `title-${item.id}`;

        entityEl.setAttribute("text", {
          font: "exo2bold",
          align: "center",
          width: 50,
          color: "#e91e63",
          value: item.title
        });

        const position = { x: 0, y: -4, z: 0 };
        entityEl.setAttribute("position", position);
        entityEl.setAttribute("visible", true);
        return entityEl;
      },

    showView: function() {
        const { selectedPlace } = this.data;
        const skyEl = document.querySelector("#main-container");
        skyEl.setAttribute("material", {
          src: `./assets/360-images/${selectedPlace}.jpeg`,
          color: "#fff"
        });
    },

    update: function() {
        window.addEventListener("keydown", e => {
          if (e.key === "ArrowUp") {
            if (this.data.zoomAspectRatio <= 10) {
              this.data.zoomAspectRatio += 0.002;
              this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
            }
          }
          if (e.key === "ArrowDown") {
            if (this.data.zoomAspectRatio > 1) {
              this.data.zoomAspectRatio -= 0.002;
              this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
            }
          }
        });
      }

})