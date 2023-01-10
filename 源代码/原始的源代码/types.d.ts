export interface 范_改良型浏览器存储器_SetItem方法的形制要求 {
    有效期_以秒计?: null | number;
}

export interface 范_改良型浏览器存储器_GetItem方法的形制要求 {
    若取得的原始数据不是标准单项则视为无效?: boolean;
}

export type 范_改良型浏览器存储器_单项<范_原始值 = any> = {
    原始值: 范_原始值;
    时间戳: number;
    时间戳_易读式: string;
    有效期_以秒计: null | number;
};

/**
 * 在浏览器中验证过：
 * 以下类型均可在 window.sessionStorage 上成功 setItem 、getItem 。
 * 但 symbol 不行。
 * 顺便指出， setItem() 和 setItem(undefined) 是不同的。前者报错，后者不报错。
 */
export type 范_浏览器标准存储器_条目名 = (
    | string
    | number
    | null
    | boolean
    | undefined
    | ((...args: unknown[]) => unknown)
);

/** 经验证，标准的 setItem() 可以接受任何类型的值。 */
export type 范_浏览器标准存储器_SetItem方法可接受的参数 = any;

/**
 * 经验证，标准的 getItem() 在 key 确实存在的前提下，返回的永远是文本。
 * 例如：
 *     setItem() 存入 null ， getItem() 会得到 'null' 。
 *     setItem() 存入函数， getItem() 会得到该函数的源代码全文。
 *
 * 顺便指出：本工具的 getItem() 的返回值可以是任意值。
 */
export type 范_浏览器标准存储器_GetItem方法的返回值 = string;

/**
 * 经验证，标准的 key() 在 index 确实存在的前提下，返回的永远是文本。
 * 例如：
 *     setItem() 采用 null 作为 key， key() 会得到 'null' 。
 *     setItem() 采用函数作为 key， key() 会得到该函数的源代码全文。
 */
export type 范_浏览器标准存储器_Key方法的返回值 = string;



export interface 范_改良型浏览器存储器 {
    /**
     * 默认值： window.sessionStorage 。
     */
    内核: Storage;

    /**
     * 默认值： '浏览器会话存储器' 。
     */
    内核之种类: '浏览器会话存储器' | '浏览器本地存储器';

    清空数据 (): void;

    保存条目<范_原始值 = 范_浏览器标准存储器_SetItem方法可接受的参数> (
        条目名?: 范_浏览器标准存储器_条目名,
        原始值?: 范_原始值,
        形制要求?: 范_改良型浏览器存储器_SetItem方法的形制要求
    ): boolean;

    当即取此条目<范_原始值 = any> (
        条目名?: 范_浏览器标准存储器_条目名,
        形制要求?: 范_改良型浏览器存储器_GetItem方法的形制要求
    ): {
        已成功: false;
        原始值: undefined;
    } | {
        已成功: true;
        原始值: 范_原始值;
    };

    取此条目<范_原始值 = any> (
        条目名?: 范_浏览器标准存储器_条目名,
        形制要求?: 范_改良型浏览器存储器_GetItem方法的形制要求
    ): Promise<范_原始值>;

    删去此条目 (
        条目名?: 范_浏览器标准存储器_条目名
    ): void;

    据编号取得条目名 (
        编号?: number
    ): 范_浏览器标准存储器_Key方法的返回值 | null;
}
