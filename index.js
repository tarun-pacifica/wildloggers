(function(window, document) {

    var videoHeight = document.getElementById('video').style.height;
    var clearBoxes = Array.from(document.getElementsByClassName('clear-box'));
    clearBoxes.forEach(function(box){
        box.style.height = 315;
    })


    .style.height = videoHeight;

    var menu = document.getElementById('menu'),
        rollback,
        WINDOW_CHANGE_EVENT = ('onorientationchange' in window) ? 'orientationchange' : 'resize';

    function toggleHorizontal() {
        menu.classList.remove('closing');
        [].forEach.call(
            document.getElementById('menu').querySelectorAll('.custom-can-transform'),
            function(el) {
                el.classList.toggle('pure-menu-horizontal');
            }
        );
    };

    function toggleMenu() {
        // set timeout so that the panel has a chance to roll up
        // before the menu switches states
        if (menu.classList.contains('open')) {
            menu.classList.add('closing');
            rollBack = setTimeout(toggleHorizontal, 500);
        } else {
            if (menu.classList.contains('closing')) {
                clearTimeout(rollBack);
            } else {
                toggleHorizontal();
            }
        }
        menu.classList.toggle('open');
        document.getElementById('toggle').classList.toggle('x');
    };

    function closeMenu() {
        if (menu.classList.contains('open')) {
            toggleMenu();
        }
    }

    document.getElementById('toggle').addEventListener('click', function(e) {
        toggleMenu();
        e.preventDefault();
    });

    window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu);
})(this, this.document);


function changeDescription(item, index) {
    document.getElementById("desc-header").innerText = "Day " + (index + 1)
    document.getElementById("desc-text").innerText = "We depart " + (item.name) + " at " + (index + 6) + "am. "
    document.getElementById("desc-name").innerText = ": " + (item.name)
}

function createCirclePushpin(text, location, radius, fillColor, strokeColor, strokeWidth) {
    strokeWidth = strokeWidth || 0;

    //Create an SVG string of a circle with the specified radius and color.
    var svg = ['<svg xmlns="http://www.w3.org/2000/svg" width="', (radius * 2),
        '" height="', (radius * 2), '"><circle cx="', radius, '" cy="', radius, '" r="',
        (radius - strokeWidth), '" stroke="', strokeColor, '" stroke-width="', strokeWidth, '" fill="', fillColor, '"/></svg>'
    ];

    //Create a pushpin from the SVG and anchor it to the center of the circle.
    return new Microsoft.Maps.Pushpin(location, {
        text: text,
        icon: svg.join(''),
        anchor: new Microsoft.Maps.Point(radius, radius)
    });
}

function addHandler(pin, item, index) {
    console.log(`${index}`);
    Microsoft.Maps.Events.addHandler(pin, 'click', function(e) {
        console.log(`click ${index}`);
        changeDescription(item, index)
    });

    Microsoft.Maps.Events.addHandler(pin, 'mouseover', function(e) {
        e.target.setOptions({ color: "red" });
        console.log('mouseover');
    });

    Microsoft.Maps.Events.addHandler(pin, 'mouseout', function(e) {
        e.target.setOptions({ color: "green" });
        console.log('mouseout');
    });


}

function mapper() {
    let map = window.map = new Microsoft.Maps.Map('#map-grid', {
        zoom: 6
    });

    window.locationPins = []


    let locations = window.locations = [
        { name: 'Delhi', text: '1', lat: 28.6517178, long: 77.2219388 },
        { name: 'Gorakhpur', text: '2', lat: 26.67132865, long: 83.36458284327038 },
        { name: 'Siliguri', text: '3', lat: 26.7164127, long: 88.4309916 },
        { name: 'Guwahati', text: '4', lat: 26.1805978, long: 91.753943 },
        { name: 'Shillong', text: '5', lat: 25.5760446, long: 91.8825282 },
        { name: 'Cherrapunji', text: '6', lat: 25.2837969, long: 91.7193603 },
        { name: 'Tezpur', text: '7', lat: 26.61695705, long: 92.76500717365028 },
        { name: 'Dirang', text: '8', lat: 27.36008, long: 92.24121 },
        { name: 'Tawang', text: '9', lat: 27.5879186, long: 91.863733 }
    ]
    map.setView({
        center: new Microsoft.Maps.Location(locations[2].lat, locations[2].long)
    })

    locations.forEach(function(item, index) {
        console.log("index:" + index)
        var location = new Microsoft.Maps.Location(item.lat, item.long);
        window.locationPins.push(location);
        const pin = createCirclePushpin(item.text, location, 14, 'rgb(136, 220, 238)', 'black', 1)
        map.entities.push(pin);
        addHandler(pin, item, index);
    });
    let polyline = new Microsoft.Maps.Polyline(window.locationPins, {
        strokeColor: 'rgb(136, 220, 238)',
        strokeThickness: 3
    });
    map.entities.push(polyline);
};

// colour of map / multiple markers / clickable / display info