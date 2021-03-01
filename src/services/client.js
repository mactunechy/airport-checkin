import { create } from 'apisauce';

export const backendBaseURL = "https://app.fakejson.com"
const FAKE_JSON_TOKEN = "biZbOJ2HsSW7iOeVJvM1AA"

const apiClient = create({
    baseURL: backendBaseURL,
});

apiClient.addRequestTransform(request => {
    request.data.token = FAKE_JSON_TOKEN
})


export default apiClient;
