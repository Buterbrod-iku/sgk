// Отправка запроса для получения геоданных от Яндекса
import axios from "axios";

// Получение адреса с символом "-" вместо пробелов (вспомогательная для submitHandler)
function getFormattedAddress(prevAddress) {
    let newAddress = prevAddress.
    split(' ').
    join('-');

    return encodeURI(newAddress);
}

export default function getCoordsByAddress(address, parser) {
    return axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=09ffa4b8-a280-4606-a6f2-91f74c2bba7b&geocode=${getFormattedAddress(address)}`)
        .then(response => {
            // console.log("yandex", parser.parse(response.data));
            // console.log("yandex", `https://geocode-maps.yandex.ru/1.x/?apikey=09ffa4b8-a280-4606-a6f2-91f74c2bba7b&geocode=${getFormattedAddress(address)}`);

            let dataParsed = parser.parse(response.data);
            let coordsArr, city;
            if (Array.isArray(dataParsed.ymaps.GeoObjectCollection.featureMember)) {
                coordsArr = parser.parse(response.data).ymaps.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
                city = parser.parse(response.data).ymaps.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.SubAdministrativeArea.Locality.LocalityName;
            } else {
                coordsArr = parser.parse(response.data).ymaps.GeoObjectCollection.featureMember.GeoObject.Point.pos.split(' ');
                city = parser.parse(response.data).ymaps.GeoObjectCollection.featureMember.GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.SubAdministrativeArea.Locality.LocalityName;
            }

            return (
                {
                    long: coordsArr[0],
                    lats: coordsArr[1],
                    city: city
                }
            )
        })
        .catch(error => {
            console.error(error);
        });
}