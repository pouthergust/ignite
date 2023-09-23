function extractQueryParams(query) {
    return query.substr(1).split('&').reduce((queryParams, param) => {
        const [key, value] = param.split('=')

        queryParams[key] = value.replace(/%20/g, ' ')

        return queryParams
    }, {})
}

export default extractQueryParams