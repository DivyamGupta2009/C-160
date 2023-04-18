AFRAME.registerComponent("cursor-listener", {
    schema: {
        selectedItemId: {default: "", type: "string"}
    },

    init: function(){
        this.handleClickEvents();
        this.handleMouseEnterEvents();
        this.handleMouseLeaveEvents();
    },

    handleClickEvents: function(){
        this.el.addEventListener("click", evt => {
            const placesContainer = document.querySelector("#places-container")
            const {state} = placesContainer.getAttribute("tour")

            if(state == "places-lsit"){
                const id = this.el.getAttribute("id")
                const placesId = ["place_1, place_2, place_3, place_4, place_ 5"];

                if(placesId.includes(id)){
                    placesContainer.setAttribute("tour", {
                        state: "view",
                        selectedPlace: id
                    })
                }
            }
        })
    },

    handleMouseEnterEvents: function(){
        this.el.addEventListener('mouseenter', () => {
            const placesContainer = document.querySelector("#places-container")
            const {state} = placesContainer.getAttribute("tour")

            if(state == "places-list"){
                this.handlePlacesListState()
            }
        })
    },

    handlePlacesListState: function(){
        const id = this.el.getAttribute("id")
        const placesId = ["place_1", "place_2", "place_3", "place_4", "place_5"]

        if(placesId.includes(id)){
            const placesContainer = document.querySelector("#places-container")
            placesContainer.setAttribute("cursor-listener", {
                selectedItemId: id
            })

            this.el.setAttribute("material", {
                opacity: 1
            })
        }
    },

    handleMouseLeaveEvents: function(){
        this.el.addEventListener("mouseleave", () => {
            const placesContainer = document.querySelector("#places_container")
            const {state} = placesContainer.getAttribute("tour")

            if(state == "places-list"){
                const {selectedItemId} = this.handlePlacesListState
                
                if(selectedItemId){
                    const el = document.querySelector(`#${selectedItemId}`)
                    const id = el.getAttribute("id")

                    if(id == selectedItemId){
                        el.setAttribute("material", {
                            opacity: 0.4
                        })
                    }
                }
            }
        })
    }
})