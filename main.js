$(document).ready(function(){
    
    // $(`#map`).hide() //HIDE MAPS
    
    //MODAL


    //generate user information
    //ajax to fetch user information from server
    //
    $(`#user-information`).append(
        `<img src="https://www.chrislatta.org/images/graphics/backgrounds/solid-backgrounds-black-000000-300x300-Thumb.png?v=20171211195613" alt="" class="img-thumbnail"></img>
        <h5><b>Username</b></h5>
        <p>email</p>`
    )
    for(let i = 0; i < 5; i++){
        $(`#user-wishes`).append(
            `<div class="card" >
            <div class="card-body">
              <h5 class="card-title">Special title treatment</h5>
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="#" class="btn btn-sm btn-primary" ">Go somewhere</a>
            </div>
            </div>`
        )
    }
    

    //generate resto list
    // ajax to fetch resto list from server
    //
    for(let i = 0; i < 10; i++){
        $(`#resto-list`).append(     
        `<div class="card" style="width: 15rem;">
            <img class="card-img-top" src="https://www.chrislatta.org/images/graphics/backgrounds/solid-backgrounds-black-000000-300x300-Thumb.png?v=20171211195613" alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            
            <button type="button" class="btn btn-sm btn-info" data-toggle="modal" onclick="initMap(-7.32323,108.23029)"  data-target="#myMap">
                Launch demo modal
            </button>
            
            </div>
        </div>`
        )
    }
    
    
})



//GOOGLE MAPS INIT MAP
var map;
function initMap(lat = -6.72732, lng = 107.24593) {
    
    map = new google.maps.Map(document.getElementById('map'), {
    center: { lat, lng },
    zoom: 14
  });
}


