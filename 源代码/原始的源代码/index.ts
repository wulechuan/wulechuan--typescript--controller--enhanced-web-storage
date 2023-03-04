/**
 * @author 吴乐川 <wulechuan@live.com>
 * 2023-01-10
 */



import type {
    范_改良型浏览器存储器,
    范_改良型浏览器存储器_GetItem方法的形制要求,
    范_改良型浏览器存储器_SetItem方法的形制要求,
    范_改良型浏览器存储器_单项,
    // 范_浏览器标准存储器_GetItem方法的返回值,
    // 范_浏览器标准存储器_Key方法的返回值,
    范_浏览器标准存储器_SetItem方法可接受的参数,
    范_浏览器标准存储器_条目名,
} from './types'



function 构建改良型浏览器存储器 (作为内核的标准存储器系本地存储器?: boolean): 范_改良型浏览器存储器 {
    if (!window || !window.localStorage) {
        throw new ReferenceError('构建改良型浏览器存储器：出错！ 运行环境中不存在全局量 `window` ，或 `window` 上不存在 `localStorage` 。')
    }



    let 内核: Storage
    let 内核之种类: 范_改良型浏览器存储器['内核之种类']

    if (作为内核的标准存储器系本地存储器) {
        内核之种类 = '浏览器本地存储器'
        内核 = window.localStorage
    } else {
        内核之种类 = '浏览器会话存储器'
        内核 = window.sessionStorage
    }



    const 改良型存储器: 范_改良型浏览器存储器 = {
        内核,
        内核之种类,

        清空数据 () {
            return 内核.clear()
        },

        保存条目<范_原始值 = 范_浏览器标准存储器_SetItem方法可接受的参数> (
            条目名?: 范_浏览器标准存储器_条目名,
            原始值?: 范_原始值,
            形制要求?: 范_改良型浏览器存储器_SetItem方法的形制要求
        ): boolean {
            if (typeof 条目名 === 'symbol') {
                console.error('Storage.setItem 不支持 symbol 类型的值作为 `key`。')
                return false
            }



            if (typeof 形制要求 !== 'object' || !形制要求 || Array.isArray(形制要求)) {
                形制要求 = {}
            }

            const 有效期_以秒计_给出的值 = 形制要求.有效期_以秒计
            let 有效期_以秒计: null | number

            if (typeof 有效期_以秒计_给出的值 !== 'number') {
                有效期_以秒计 = NaN
            } else {
                有效期_以秒计 = 有效期_以秒计_给出的值
            }

            // 此处做判断是为了避免 有效期_以秒计 取值为 NaN。不能采用 NaN 是因为 JSON.stringify 会将 NaN 替换成 null 。
            if (!(有效期_以秒计 >= 0.001)) {
                有效期_以秒计 = null
            }

            const 单项: 范_改良型浏览器存储器_单项<范_原始值 | undefined> = {
                原始值,
                时间戳: Date.now(),
                时间戳_易读式: new Date().toLocaleString(),
                有效期_以秒计,
            }

            const 处理得到的文本 = JSON.stringify(单项)

            // 此处 “as string” 是人为“欺骗” TypeScript ，令其放宽对 内核.setItem 的类型的检查。
            内核.setItem(条目名 as string, 处理得到的文本)

            return true
        },



        当即取此条目<范_原始值 = any> (
            条目名?: 范_浏览器标准存储器_条目名,
            形制要求?: 范_改良型浏览器存储器_GetItem方法的形制要求
        ): {
            已成功: false;
            原始值: undefined;
        } | {
            已成功: true;
            原始值: 范_原始值;
        } {
            if (typeof 形制要求 !== 'object' || !形制要求 || Array.isArray(形制要求)) {
                形制要求 = {}
            }

            const 若取得的原始数据不是标准单项则视为无效 = !!形制要求.若取得的原始数据不是标准单项则视为无效



            const 取值失败时专用的返回值: {
                已成功: false;
                原始值: undefined;
            } = {
                已成功: false,
                原始值: undefined,
            }



            const 取得的原始数据 = 内核.getItem(条目名 as string)
            if (取得的原始数据 === null) {
                return 取值失败时专用的返回值
            }



            let 处理得到的对象: null | 范_改良型浏览器存储器_单项<范_原始值> = null

            try {
                const JSON处理结果 = JSON.parse(取得的原始数据)
                处理得到的对象 = JSON处理结果
                // console.debug(`范_改良型浏览器存储器 > getItem("${key}") TRY   > 处理得到的对象 (${typeof 处理得到的对象})`, 处理得到的对象)
            } catch (错误之志) {
                // console.debug(`范_改良型浏览器存储器 > getItem("${key}") CATCH > 处理得到的对象 (${typeof 处理得到的对象})`, 处理得到的对象)
                console.error(错误之志)
            }

            if (!处理得到的对象 || typeof 处理得到的对象 !== 'object') {
                // 从 内核 取得的 rawData 应该是标准的 Storage 值，而非由 EnhancedWebStorage 存放的。
                if (若取得的原始数据不是标准单项则视为无效) {
                    return 取值失败时专用的返回值
                } else {
                    return {
                        已成功: true,
                        原始值: 取得的原始数据 as unknown as 范_原始值,
                    }
                }
            }



            const 标志性属性名列表: Array<keyof 范_改良型浏览器存储器_单项> = [
                '原始值',
                '时间戳',
                '有效期_以秒计',
            ]

            if (标志性属性名列表.some(属性名 => !(属性名 in (处理得到的对象 as object)))) {
                // 从 内核 取得的 rawData 应该是人为其他手段配置的值，而非由 EnhancedWebStorage 存放的标准 WrappedValue。
                if (若取得的原始数据不是标准单项则视为无效) {
                    return 取值失败时专用的返回值
                } else {
                    return {
                        已成功: true,
                        原始值: 处理得到的对象 as unknown as 范_原始值,
                    }
                }
            }

            const {
                原始值,
                时间戳,
                有效期_以秒计,
            } = 处理得到的对象



            let 已过有效期 = false
            if (有效期_以秒计 !== null) {
                const 当下 = Date.now()
                已过有效期 = 当下 >= 时间戳 + 1 + 有效期_以秒计 * 1000
            }

            if (已过有效期) {
                内核.removeItem(条目名 as string)
                return 取值失败时专用的返回值
            }

            // console.debug(`范_改良型浏览器存储器 > getItem("${key}") > 原始值 (${typeof 原始值})`, 原始值)

            return {
                已成功: true,
                原始值: 原始值,
            }
        },

        取此条目<范_原始值 = any> (
            条目名?: 范_浏览器标准存储器_条目名,
            形制要求?: 范_改良型浏览器存储器_GetItem方法的形制要求
        ): Promise<范_原始值> {
            const 原始结果 = 改良型存储器.当即取此条目<范_原始值>(条目名, 形制要求)
            if (原始结果.已成功) {
                return Promise.resolve(原始结果.原始值)
            } else {
                return Promise.reject()
            }
        },

        删去此条目 (
            条目名?: 范_浏览器标准存储器_条目名
        ) {
            return 内核.removeItem(条目名 as string)
        },

        据编号取得条目名 (编号?: number) {
            if (typeof 编号 === 'number') {
                return 内核.key(编号)
            }
            return null
        },
    }

    return 改良型存储器
}



export const 改良型浏览器会话存储器 = 构建改良型浏览器存储器(false)
export const 改良型浏览器本地存储器 = 构建改良型浏览器存储器(true)
