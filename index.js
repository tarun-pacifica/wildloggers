function mapper() {
    let map = window.map = new Microsoft.Maps.Map('#map-grid', {
        zoom: 10
    });

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
        const pin = new Microsoft.Maps.Pushpin(location, { text: item.text, color: 'aqua' });
        map.entities.push(pin);
    });
};

// colour of map / multiple markers / clickable / display info