let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':

        APIURL = 'http://localhost:3000'
        break;

    case 'af-topspots-client.herokuapp.com':

        APIURL = 'https://af-topspots-server.herokuapp.com'

}

export default APIURL;