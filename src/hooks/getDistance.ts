function distanceBetweenLocations(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
){
    let Radi = 6371; // radius of the earth in km
    let dLat = deg2radi(lat2 - lat1);
    let dLon = deg2radi(lon2 - lon1);
    let x = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2radi(lat1)) * 
            Math.cos(deg2radi(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    let e = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
    let m = Radi * e;
    return m;
}
const deg2radi = (deg: number) => {
    return deg * (Math.PI / 180);
}
export default distanceBetweenLocations;