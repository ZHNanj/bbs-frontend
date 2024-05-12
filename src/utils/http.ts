// src/utils/http.ts
import axios, { AxiosError, AxiosResponse } from 'axios';

// 通用的泛型接口类型，与后端的通用返回结果封装一致
type TResponseType<T> = {
	message: string;
	data: T;
};

// 请求实例
const httpInstance = axios.create({
	baseURL: 'http://localhost:8080',
	timeout: 5000
});

// 响应拦截器
httpInstance.interceptors.response.use(
	(response: AxiosResponse<TResponseType<any>>) => {
		// 第一个 data 取出的数值是 TResponseType，第二个 data 取出的值才是 TResponseType 中的 data
		return response.data.data;
	},
	(error: AxiosError<TResponseType<any>>) => {
		// 错误处理逻辑
		if (error.response) {
			// 服务器有响应但不是 2xx 的状态码
			console.error(
				`[API Error]: ${error.response.status} - ${error.response.data.message}`
			);
		} else if (error.request) {
			// 请求已发出，但没有收到响应
			console.error('[API Error]: No response received');
		} else {
			// 发送请求时出了点问题
			console.error(`[API Error]: ${error.message}`);
		}
		return Promise.reject(error);
	}
);

export { httpInstance };
