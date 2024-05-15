import axios, { AxiosError, type AxiosInstance } from 'axios'
import config from 'src/config'
// import HttpStatusCode from '../constants/httpStatusCode.enum'
// import { toast } from 'react-toastify'
// import { AuthResponse, RefreshTokenReponse } from '../types/auth.type'


// import config from '../constants/config'
// import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from '../apis/auth.api'
// import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'
// import { ErrorResponse } from '../types/utils.types'
// API Purchase: 1 - 3 (bắt đầu gọi API từ giây 1 -> giây 3)
// API Me: 2 - 5 (bắt đầu gọi API từ giây 2 -> giây 5)
// API Refresh Token cho API purchase: 3 -  4 (sau khi API Purchase bị lỗi là bắt đầu từ giây 3)
// Gọi lại Purchase: 4 - 6 (sau đó gọi lại Purchase từ giây 4 -> giây 6)
// Refresh Token mới cho API me: 5 - 6 (sau khi Me hết hạn thì nó lỗi. Sau đó nó gọi lại refresh token cho Me. Bắt đầu từ giây 5 -> giây 6)
// Gọi lại Me: 6 (cuối cùng thì nó gọi lại API Me từ giây thứ 6)

export class Http {
    instance: AxiosInstance

    private refreshTokenRequest: Promise<string> | null

    constructor() {
        this.refreshTokenRequest = null
        this.instance = axios.create({
            baseURL: config.NETWORK_CONFIG.API_BASE_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                'expire-access-token': 60 * 60 * 24, // 1 ngày
                'expire-refresh-token': 60 * 60 * 24 * 160 // 160 ngày
            }
        })
        this.instance.interceptors.request.use(
            (config) => {
                // Update access token in request header
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )
        // Add a response interceptor
        this.instance.interceptors.response.use(
            (response) => {
                const { url } = response.config

                return response
            },
            (error: AxiosError) => {
                // Chỉ toast lỗi không phải 422 và 401

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const data: any | undefined = error.response?.data
                const message = data?.message || error.message
                // toast.error(message)
                console.log(message)


                // Lỗi Unauthorized (401) có rất nhiều trường hợp
                // - Token không đúng
                // - Không truyền token
                // - Token hết hạn*

                // Nếu là lỗi 401
                // if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
                //     const config = error.response?.config || {}
                //     // const { url } = config
                //     // Trường hợp Token hết hạn và request đó không phải là của request refresh token
                //     // thì chúng ta mới tiến hành gọi refresh token
                //     if (isAxiosExpiredTokenError(error)) {
                //         // Hạn chế gọi 2 lần handleRefreshToken
                //         this.refreshTokenRequest = this.refreshTokenRequest
                //             ? this.refreshTokenRequest
                //             : this.handleRefreshToken().finally(() => {
                //                 // Giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng
                //                 setTimeout(() => {
                //                     this.refreshTokenRequest = null
                //                 }, 10000)
                //             })
                //         return this.refreshTokenRequest.then((access_token) => {
                //             // Nghĩa là chúng ta tiếp tục gọi lại request cũ vừa bị lỗi
                //             return this.instance({
                //                 ...config,
                //                 headers: {
                //                     // ...config.headers,
                //                     authorization: access_token
                //                 }
                //             })
                //         })
                //     }

                //     // Còn những trường hợp như token không đúng
                //     // không truyền token,
                //     // token hết hạn nhưng gọi refresh token bị fail
                //     // thì tiến hành xóa local storage và toast message

                //     clearLS()
                //     this.accessToken = ''
                //     this.refreshToken = ''
                //     toast.error(error)
                //     // window.location.reload()
                // }
                return Promise.reject(error)
            }
        )
    }
    // private handleRefreshToken() {
    //     return this.instance
    //         .post<RefreshTokenReponse>(URL_REFRESH_TOKEN, {
    //             refresh_token: this.refreshToken
    //         })
    //         .then((res) => {
    //             const { access_token } = res.data.access_token
    //             setAccessTokenToLS(access_token)
    //             this.accessToken = access_token
    //             return access_token
    //         })
    //         .catch((error) => {
    //             clearLS()
    //             this.accessToken = ''
    //             this.refreshToken = ''
    //             throw error
    //         })
    // }
}
const http = new Http().instance
export default http