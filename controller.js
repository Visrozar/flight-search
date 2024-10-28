const service = require('./service')

module.exports = {
    search: async (req, res) => {
        const payload = req.query;
        const { minTime, maxTime, duration, airline } = req.query;


        const airlineData = await service.getAirlineData().catch(err => console.log(err));
        // console.log(airlineData[0])
        const result = []
        for (data of airlineData) {
            const departureTime = new Date(data.departureTime)
            const arrivalTime = new Date(data.arrivalTime)
            let airlineScore = 1;
            if (airline && data.carrier === airline) {
                airlineScore = 0.9;
            }
            if (minTime && departureTime < new Date(minTime)) {
                continue;
            }
            if (maxTime && departureTime > new Date(maxTime)) {
                continue;
            }
            if (duration && (Math.abs(arrivalTime - departureTime) / 36e5) > duration) {
                continue;
            }
            let score = (duration * airlineScore) + getDistanceBetweenAirports(data.origin, data.destination)
            //(flight duration in hours) * (carrier preference)(0.9/1) + (distance in miles between airports)(getDistanceBetweenAirports)

            result.push({ ...data, score, airlineScore })
        }

        result.sort((a, b) => a.score - b.score)

        // console.log(payload)
        return res.json(result)
    }
}

const getDistanceBetweenAirports = (origin, destination) => {
    return 5;
}