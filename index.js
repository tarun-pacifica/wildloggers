    function createCirclePushpin(text, location, radius, fillColor, strokeColor, strokeWidth) {
        strokeWidth = strokeWidth || 0;

        //Create an SVG string of a circle with the specified radius and color.
        var svg = ['<svg xmlns="http://www.w3.org/2000/svg" width="', (radius * 2),
            '" height="', (radius * 2), '"><circle cx="', radius, '" cy="', radius, '" r="',
            (radius - strokeWidth), '" stroke="', strokeColor, '" stroke-width="', strokeWidth, '" fill="', fillColor, '"/></svg>'
        ];

        //Create a pushpin from the SVG and anchor it to the center of the circle.
        return new Microsoft.Maps.Pushpin(location, {
        	text : text,
            icon: svg.join(''),
            anchor: new Microsoft.Maps.Point(radius, radius)
        });
    }

    function addHandler(pin) {
        Microsoft.Maps.Events.addHandler(pin, 'click', function(e) {
            console.log('click');
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
            { text: '1', lat: 28.6517178, long: 77.2219388 },
            { text: '2', lat: 26.67132865, long: 83.36458284327038 },
            { text: '3', lat: 26.7164127, long: 88.4309916 },
            { text: '4', lat: 26.1805978, long: 91.753943 },
            { text: '5', lat: 25.5760446, long: 91.8825282 },
            { text: '6', lat: 25.2837969, long: 91.7193603 },
            { text: '7', lat: 26.61695705, long: 92.76500717365028 },
            { text: '8', lat: 27.36008, long: 92.24121 },
            { text: '9', lat: 27.5879186, long: 91.863733 }
        ]

        map.setView({
            center: new Microsoft.Maps.Location(locations[1].lat, locations[1].long)
        })

        locations.forEach(function(item) {
            var location = new Microsoft.Maps.Location(item.lat, item.long);
            window.locationPins.push(location);
            const pin = createCirclePushpin(item.text, location, 12, 'rgb(136, 220, 238)', 'black', 1)
            // var polyline = new Microsoft.Maps.Polyline(location: location);
            map.entities.push(pin);
            addHandler(pin);
        });
        let polyline = new Microsoft.Maps.Polyline(window.locationPins, {
            strokeColor: 'rgb(136, 220, 238)',
            strokeThickness: 3
        });
        map.entities.push(polyline);
    };

    // colour of map / multiple markers / clickable / display info