    function createCirclePushpin(location, radius, fillColor, strokeColor, strokeWidth) {
        strokeWidth = strokeWidth || 0;

        //Create an SVG string of a circle with the specified radius and color.
        var svg = ['<svg xmlns="http://www.w3.org/2000/svg" width="', (radius * 2),
            '" height="', (radius * 2), '"><circle cx="', radius, '" cy="', radius, '" r="',
            (radius - strokeWidth), '" stroke="', strokeColor, '" stroke-width="', strokeWidth, '" fill="', fillColor, '"/></svg>'
        ];

        //Create a pushpin from the SVG and anchor it to the center of the circle.
        return new Microsoft.Maps.Pushpin(location, {
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
            zoom: 5
        });

        window.locationPins = []

        let locations = window.locations = [
            { text: 'Day 1: Delhi, India', lat: 28.6517178, long: 77.2219388 },
            { text: 'Day 2: Gorakhpur, India', lat: 26.67132865, long: 83.36458284327038 },
            { text: 'Day 3: Siliguri, India', lat: 26.7164127, long: 88.4309916 },
            { text: 'Day 4: Guwahati, India', lat: 26.1805978, long: 91.753943 },
            { text: 'Day 5: Shillong, India', lat: 25.5760446, long: 91.8825282 },
            { text: 'Day 6: Cherrapunji, India', lat: 25.2837969, long: 91.7193603 },
            { text: 'Day 7: Tezpur, India', lat: 26.61695705, long: 92.76500717365028 },
            { text: 'Day 8: Dirang, India', lat: 27.36008, long: 92.24121 },
            { text: 'Day 9: Tawang, India', lat: 27.5879186, long: 91.863733 }
        ]

        map.setView({
            center: new Microsoft.Maps.Location(locations[0].lat, locations[0].long)
        })

        locations.forEach(function(item) {
            var location = new Microsoft.Maps.Location(item.lat, item.long);
            window.locationPins.push(location);
            const pin = createCirclePushpin(location, 10, 'rgb(136, 220, 238)', 'black', 1)
	        // var polyline = new Microsoft.Maps.Polyline(location: location);
            map.entities.push(pin);
            addHandler(pin);
        });
        let polyline = new Microsoft.Maps.Polyline(window.locationPins);
        map.entities.push(polyline);
    };

    // colour of map / multiple markers / clickable / display info