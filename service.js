module.exports = {
    getAirlineData: async () => {
        return fetch('https://gist.githubusercontent.com/bgdavidx/132a9e3b9c70897bc07cfa5ca25747be/raw/8dbbe1db38087fad4a8c8ade48e741d6fad8c872/gistfile1.txt')
            .then((response) => response.json())
            .then((json) => json);
    }
}