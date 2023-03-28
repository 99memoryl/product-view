import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { PureHttpError, RequestMethods, PureHttpResponse, PureHttpRequestConfig } from './types.d'
import { loadEnv } from '../utils/env'

import { ElLoading } from 'element-plus'
import { getUrlParams } from '../utils/getUrlParams'
const { VITE_BASE_URL } = loadEnv()

let loadingInstance: any
// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
  baseURL: VITE_BASE_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
}

class PureHttp {
  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  // 初始化配置对象
  private static initConfig: PureHttpRequestConfig = {}

  // 保存当前Axios实例对象
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig)

  // 请求拦截
  private httpInterceptorsRequest(): void {
    PureHttp.axiosInstance.interceptors.request.use(
      (config: PureHttpRequestConfig) => {
        const $config = config
        // 开启进度条动画
        // NProgress.start()
        loadingInstance = ElLoading.service({
          fullscreen: true,
          lock: true,
          text: '加载中...',
          background: 'rgba(0, 0, 0, 0.5)',
        })
        // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
        if (typeof config.beforeRequestCallback === 'function') {
          config.beforeRequestCallback($config)
          return $config
        }
        if (PureHttp.initConfig.beforeRequestCallback) {
          PureHttp.initConfig.beforeRequestCallback($config)
          return $config
        }

        // const token = getToken()

        const token = getUrlParams('token')
        if (token) {
          if (config && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
          }
        }
        return $config
      },
      (error) => Promise.reject(error)
    )
  }

  // 响应拦截
  private httpInterceptorsResponse(): void {
    const instance = PureHttp.axiosInstance
    instance.interceptors.response.use(
      (response: PureHttpResponse) => {
        const $config = response.config
        const result = response.data
        const code = result.code
        // 关闭进度条动画
        // NProgress.done()
        loadingInstance.close()
        // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
        if (typeof $config.beforeResponseCallback === 'function') {
          $config.beforeResponseCallback(response)
          return result
        }
        if (PureHttp.initConfig.beforeResponseCallback) {
          PureHttp.initConfig.beforeResponseCallback(response)
          return result
        }

        if (code) {
          if (code != 200) {
            ElMessage.error({ message: result.message })
            return Promise.reject(result)
          }
        }
        return Promise.resolve(result)
      },
      (error: PureHttpError) => {
        const $error = error
        const result: any = error.response

        $error.isCancelRequest = Axios.isCancel($error)
        // 关闭进度条动画
        // NProgress.done()
        loadingInstance.close()
        // 无权限跳转登录界面
        if (result.status === 401 || result.status == 403) {
          // setToken('')
          // router.push({ path: '/login' })
          ElMessage.error({ message: '登录信息过期，请返回主平台重新进入' })
          return
        } else {
          ElMessage.warning(result?.data?.message)
        }
        // 所有的响应异常 区分来源为取消请求/非取消请求
        return Promise.reject($error)
      }
    )
  }

  // 通用请求工具函数
  public request<T>(
    method: RequestMethods,
    url: string,
    params?: AxiosRequestConfig,
    axiosConfig?: PureHttpRequestConfig
  ): Promise<T> {
    const config = {
      method,
      url,
      ...params,
      ...axiosConfig,
    } as PureHttpRequestConfig

    // 单独处理自定义请求/响应回掉
    return new Promise((resolve, reject) => {
      PureHttp.axiosInstance
        .request(config)
        .then((response: any) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  // 单独抽离的post工具函数
  public post<T, P>(url: string, params?: any, config?: PureHttpRequestConfig): Promise<P> {
    return this.request<P>('post', url, params, config)
  }

  // 单独抽离的get工具函数
  public get<T, P>(url: string, params?: any, config?: PureHttpRequestConfig): Promise<P> {
    return this.request<P>('get', url, params, config)
  }
}

export const http = new PureHttp()
