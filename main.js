$(document).ready(function(){


    // $(`#map`).hide() //HIDE MAPS

    //generate user information
    //ajax to fetch user information from server
    //
    if(localStorage.getItem('token')){
        $(`#signoutbtn`).show()
        $(`#signinbtn`).hide()
        $(`#user-information`).empty()
        $(`#user-information`).append(
            `<img src=http://localhost:3000/myAvatars/${$("#logname").val()}" alt="" class="img-thumbnail"></img>
            <h5><b>${$("#logname").val()}</b></h5>
            <img class="logo" src="logo.png" alt="" style="width: 15vw !important;">`
        )
        $(`#user-wishes`).empty()
        //http://localhost:3000/addWishlist GET
        getWishlist()
    }else{
        $(`#signoutbtn`).hide()
        $(`#signinbtn`).show()
    }    

    //generate resto list
    // ajax to fetch resto list from server
    //initial resto list
    $.ajax({
        method: 'get',
        url:  `http://localhost:3000/zomato/nearby`
    })
    .done(({restaurants}) => {
        // console.log(nearby_restaurants)
        restaurants.forEach(resto => {
            $(`#resto-list`).append(     
                `<div class="card" style="width: 15rem;">
                    <img class="card-img-top" src="${(resto.restaurant.thumb) ? resto.restaurant.thumb : 'https://pixel77.com/wp-content/uploads/2013/11/pixel77-free-vector-flat-food-icons-1114-300.jpg' }" style="margin-bottom:1vh;" alt="Card image cap">
                    <div class="card-body">
                    <button type="button" class="btn btn-sm btn-info" data-toggle="modal" onclick="initMap(${resto.restaurant.location.latitude},${resto.restaurant.location.longitude})"  data-target="#myMap">
                    location
                    </button>
                    
                    <button id="${resto.restaurant.id}" type="button" class="btn btn-sm btn-success">
                    add to wishlist
                    </button>
                    <h5 class="card-title" style="margin-top:2vh;">${resto.restaurant.name}</h5>
                    <p class="card-text">${resto.restaurant.location.address}</p>
                    <p><span>rating : ${resto.restaurant.user_rating.aggregate_rating}/5</span></p>       
        
                    
                    </div>
                </div>`
                )
                $(`#${resto.restaurant.id}`).on('click', function(){
                    $.ajax({
                            method: 'patch',
                            url:  `http://localhost:3000/user/addWishlist`,
                            data : {
                                    id: resto.restaurant.id,
                                    name : resto.restaurant.name,
                                    address : resto.restaurant.location.address,
                                    thumb : resto.restaurant.thumb,
                                    rating: resto.restaurant.user_rating.aggregate_rating,
                                    url: resto.restaurant.url
                                },
                            headers: {
                                token : localStorage.getItem('token')
                            }
                        })
                        .done( msg => {
                            getWishlist()
                        })
                        .fail(err => {
                            console.log(err)
                        })
                })
        });
    })
    .fail(err => {
        alert(err)
    })  
    
     //SEARCH ZOMATO
     $(`#search-zomato`).on('submit' , (e) => {
        e.preventDefault()
        let city = $(`#location`).val()
        let food = $(`#food`).val()
        $(`#location`).val('')
        $(`#food`).val('')
        //AJAX FETCH FROM SERVER
        $.ajax({
            method: 'post',
            url:  `http://localhost:3000/zomato/search`,
            data : {
                city,food
            }
        })
        .done(({restaurants}) => {
            $(`#resto-list`).empty()
            restaurants.forEach(resto => {
                $(`#resto-list`).append(
                    `<div class="card" style="width: 15rem;">
                    <img class="card-img-top" src="${(resto.restaurant.thumb) ? resto.restaurant.thumb : 'https://pixel77.com/wp-content/uploads/2013/11/pixel77-free-vector-flat-food-icons-1114-300.jpg' }" style="margin-bottom:1vh;" alt="Card image cap">
                    <div class="card-body">
                    <button type="button" class="btn btn-sm btn-info" data-toggle="modal" onclick="initMap(${resto.restaurant.location.latitude},${resto.restaurant.location.longitude})"  data-target="#myMap">
                    location
                    </button>
                    
                    <button id="${resto.restaurant.id}" type="button" class="btn btn-sm btn-success">
                    add to wishlist
                    </button>
                    <h5 class="card-title" style="margin-top:2vh;">${resto.restaurant.name}</h5>
                    <p class="card-text">${resto.restaurant.location.address}</p>
                    <p><span>rating : ${resto.restaurant.user_rating.aggregate_rating}/5</span></p>                    
                    </div>
                </div>`
                )

                $(`#${resto.restaurant.id}`).on('click', function(){
                    $.ajax({
                            method: 'patch',
                            url:  `http://localhost:3000/user/addWishlist`,
                            data : {
                                    id: resto.restaurant.id,
                                    name : resto.restaurant.name,
                                    address : resto.restaurant.location.address,
                                    thumb : resto.restaurant.thumb,
                                    rating: resto.restaurant.user_rating.aggregate_rating,
                                    url: resto.restaurant.url
                                },
                            headers: {
                                token : localStorage.getItem('token')
                            }
                        })
                        .done( msg => {
                            getWishlist()
                        })
                        .fail(err => {
                            console.log(err)
                        })
                })
            })
        })
        .fail(err => {
            console.log(err)
        })
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


// register dan login

$('#register').submit(e => {
    $('.successRegis').empty()
    e.preventDefault();
    $.ajax({
        method:'post',
        url: `http://localhost:3000/user/register`,
        data: {
            username: `${$("#regname").val()}`,
            password: `${$("#regpass").val()}`
        }
    })
        .done(token => {
            $('.errRegis').empty()
            $("#regname").val('')
            $("#regpass").val('')
            $('.successRegis').append(`<p style="color:green;">Successfully Registered</p>`)
            localStorage.setItem('token', token)

        setTimeout(function(){
            $('#modalForm').modal('hide')
        }, 3000);

        })
        .fail(err=>{
            $('.errRegis').empty()
            $('.errRegis').append(`<p style="color:red;">${err.responseJSON.message}</p>`)
        })
})

$('#login').submit(e => {
    e.preventDefault();
    
    $.ajax({
        method:'post',
        url: `http://localhost:3000/user/login`,
        data: {
            username: `${$("#logname").val()}`,
            password: `${$("#logpass").val()}`
        }
    })
        .done((token)=> {
            
            let data = $("#logname").val()
            $("#logpass").val('')
            $("#logname").val('')
            $('.successLogin').append(`<p style="color:green;">Successfully Login</p>`)
            localStorage.setItem('token', token)
            $(`#signinbtn`).hide()
            $(`#signoutbtn`).show()

            $(`#user-information`).empty()
            $(`#user-information`).append(
                    `<img src=http://localhost:3000/myAvatars/${data}" alt="" class="img-thumbnail"></img>
                    <h5><b>${data}</b></h5>
                    <img class="logo" src="logo.png" alt="" style="width: 15vw !important;">`
            )
            $(`#user-wishes`).empty()
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
            setTimeout(function(){
                $('#modalForm').modal('hide')
            }, 3000);
        })
        .fail(err=>{
            $('.errLogin').empty()
            $('.errLogin').append(`<p style="color:red;">${err.responseJSON.message}</p>`)
        })
})

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;   
    $.ajax({
        url: 'http://localhost:3000/user/signGoogle',
        method: 'post',
        data:{
            id_token
        }
    })
        .done((token) => {
            localStorage.setItem('token', token)
            $('.successLogin').append(`<p style="color:green;">Successfully Login</p>`)
            $(`#signinbtn`).hide()
            $(`#signoutbtn`).show()

            $(`#user-information`).empty()
            $(`#user-information`).append(
                `<img src=http://localhost:3000/myAvatars/${profile.getName()}" alt="" class="img-thumbnail"></img>
                <h5><b>${profile.getName()}</b></h5>
                <img class="logo" src="logo.png" alt="" style="width: 15vw !important;">`
            )
            $(`#user-wishes`).empty()
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
            setTimeout(function(){
                $('#modalForm').modal('hide')
            }, 5000);
        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    localStorage.removeItem('token')
    $('.successLogin').hide()
    $(`#signoutbtn`).hide()
    $(`#signinbtn`).show()
    
    // $(`#user-container`).css('background-image', "url('https://as2.ftcdn.net/jpg/01/45/81/23/1000_F_145812369_SBaAsYoDOYbQFRL4Uv7YCBMKsGYT65GO.jpg')" )
    $(`#user-information`).empty()
    $(`#user-wishes`).empty()
}


function getWishlist(){
    $.ajax({
        method: 'get',
        url:  `http://localhost:3000/user/allWishlist`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done( wishlist => {
        wishlist.forEach(wish => {
            $(`#user-wishes`).append(
                `<div class="card" >
                <div class="card-body">
                <h5 class="card-title">${wish.name}</h5>
                <p class="card-text">${wish.address}</p>
                <a href="#" class="btn btn-sm btn-danger" id="${wish.id}">discard</a>
                </div>
                </div>`                
                )
            $(`#${wish.id}`).on('click' , function(){
                $.ajax({
                    method: 'patch',
                    url:  `http://localhost:3000/user/delWishlist`,
                    data: {
                        wish
                    },
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                .done( updated => {
                    alert(`success add restaurant to wishlist`)
                })
                .fail( err => {
                    alert(err)
                })
            })
        });
    })
    .fail( err => {
        alert(err)
    })
}