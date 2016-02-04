"use strict";

var API_URL = "http://peaceful-shelf-4675.herokuapp.com/game"

var GameClient = {
    generateShipPlacement: function(type, position, orientation) {
        var ship_size = {
            "carrier": 5,
            "battleship": 4,
            "submarine": 3,
            "destroyer": 3,
            "patrol": 2
        }
        var i;
        if (!ship_size[type]) {
            return;
        }
        if (orientation === "h" || orientation === 1) {
            shipArray = [position];
            for (i = 1; i < ship_size[type]; i ++) {
                if (position[0] + i > 10) {
                    return;
                }
                shipArray.push([position[0] + i, position[1]]);
            }
            return shipArray;
        } else {
            shipArray = [position];
            for (i = 1; i < ship_size[type]; i ++) {
                if (position[1] + i > 10) {
                    return;
                }
                shipArray.push([position[0], position[1] + i]);
            }
            return shipArray;
        }
    },
    newGame: function(carrier, battleship, submarine, destroyer, patrol) {
        return $.ajax(API_URL, {"method": "PUT", "dataType": "json", "contentType": "application/json", "data": JSON.stringify({"carrier": carrier, "battleship": battleship, "submarine": submarine, "destroyer": destroyer, "patrol boat": patrol})});
    },
    postShot: function(game, shot) {
        return $.ajax(API_URL + "/" +  game, {"method": "POST", "dataType": "json", "contentType": "application/json", "data": JSON.stringify({"shot": shot})});
    },
    getGame: function(game) {
        return $.get(API_URL + "/" +  game);
    }
}

var Application = React.createClass({
    componentDidMount: function() {
        GameClient.newGame([[0,0], [0,1], [0,2], [0,3], [0,4]],[[1,0], [1,1], [1,2], [1,3]], [[2,0], [2,1], [2,2]], [[3,0], [3,1], [3,2]], [[4,0], [4,1]])
        .then(function(data) {
            this.setState(data);
        }.bind(this));
    },
    render: function() {
        return <h1>Hello, world</h1>;
    }
});

ReactDOM.render(
<Application />,
document.getElementById('app')
);