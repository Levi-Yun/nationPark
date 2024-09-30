// 定位地圖中央
const tw = [23.5, 121.0];

// 引入Leaflet API，初始化地圖
var map = L.map('map').setView(tw, 5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// 載入JSON
fetch('nationalparks.json').then(response => {
    if (!response.ok) {
        throw new Error("網路 not ok");
    }
    return response.json();
}).then(data => {
    data.forEach(location => {
        const { coordinates, name } = location; // js導入json屬性名
        const popupContent = name;

        // 調整彈出視窗大小
        L.marker(coordinates)
            .addTo(map)
            .bindPopup(popupContent, {
                maxWidth: 300,
                maxHeight: 200,
                autoClose: true,
                closeOnClick: true
            });
    });
}).catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
});

