
/**
 * Calculate distance
 */ 
export let calculateDistance = function(lat1,lng1,lat2,lng2) {

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lng2-lng1); 
    var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return Math.trunc(d);
     
     
     function deg2rad(deg) {
        return deg * (Math.PI/180)
     }
};

/**
 * Gets color for the distance line
 * @param {distance in km} distance 
 */
// https://gist.github.com/mlocati/7210513
export let getDistanceColor = function(distance) {
    var max = 1500;
    var perc = Math.trunc((distance/max) * 100);
    console.log(100 - perc);
    var percentage = perc > 100 ? 0 : 100 - perc;
    return perc2color(percentage);

    function perc2color(perc) {
        var r, g, b = 0;
        if(perc < 50) {
            r = 255;
            g = Math.round(5.1 * perc);
        }
        else {
            g = 255;
            r = Math.round(510 - 5.10 * perc);
        }
        var h = r * 0x10000 + g * 0x100 + b * 0x1;
        return '#' + ('000000' + h.toString(16)).slice(-6);
    }
};
 
