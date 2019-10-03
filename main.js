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
              <a href="#" class="btn btn-sm btn-danger" ">discard</a>
            </div>
            </div>`
        )
    }
    

    //generate resto list
    // ajax to fetch resto list from server
    //
    $.ajax({
        method: 'get',
        url:  `http://localhost:3000/zomato/nearby`
    })
    .done(({nearby_restaurants}) => {
        console.log(nearby_restaurants)
        nearby_restaurants.forEach(resto => {
            $(`#resto-list`).append(     
                `<div class="card" style="width: 15rem;">

                    <img class="card-img-top" src="${(resto.restaurant.thumb) ? resto.restaurant.thumb : 'https://pixel77.com/wp-content/uploads/2013/11/pixel77-free-vector-flat-food-icons-1114-300.jpg' }" style="margin-bottom:1vh;" alt="Card image cap">
                    <div class="card-body">
                    <button type="button" class="btn btn-sm btn-info" data-toggle="modal" onclick="initMap(${resto.restaurant.location.latitude},${resto.restaurant.location.longitude})"  data-target="#myMap">
                    location
                    </button>
                    
                    <button type="button" class="btn btn-sm btn-success">
                    add to wishlist
                    </button>

                    <h5 class="card-title" style="margin-top:2vh;">${resto.restaurant.name}</h5>
                    <p class="card-text">${resto.restaurant.location.address}</p>
                    
        
                    
                    </div>
                </div>`
                )
        });
    })
    .fail(err => {
        alert(err)
    })  
    
})



//GOOGLE MAPS INIT MAP
var map;
function initMap(lat = -6.72732, lng = 107.24593) {
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat, lng },
        zoom: 16
    });

    marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map
    })


}


