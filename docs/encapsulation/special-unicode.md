# 特殊Unicode字符处理

```typescript
/**
 * 删除文本中的特殊Unicode字符配置选项
 */
export interface RemoveSpecialCharsOptions {
    /** 是否删除零宽字符，默认 true */
    removeZeroWidth?: boolean;
    /** 是否删除BOM字符，默认 true */
    removeBOM?: boolean;
    /** 是否删除其他不可见字符，默认 true */
    removeInvisible?: boolean;
    /** 是否删除私人使用区字符，默认 true */
    removePrivateUse?: boolean;
    /** 是否删除方向格式化字符，默认 true */
    removeDirectionalFormatting?: boolean;
    /** 是否处理转义字符序列（如 \n, \t 等），默认不启用，后续看需求决定是否启用 */
    processEscapeSequences?: boolean;
    /** 是否删除特殊空白符，默认 true */
    removeSpecialSpaces?: boolean;
    /** 自定义要删除的额外字符正则表达式 */
    customPatterns?: RegExp[];
}

/**
 * 删除文本中的特殊Unicode字符
 * @param text 原始文本
 * @param options 配置选项
 * @returns 清理后的文本
 */
export function removeSpecialUnicodeChars(text: string, options: RemoveSpecialCharsOptions = {}): string {
    if (typeof text !== 'string') {
        return text;
    }

    if (!text) {
        return text;
    }

    // 合并默认选项
    const config: Required<Omit<RemoveSpecialCharsOptions, 'customPatterns'>> & { customPatterns: RegExp[] } = {
        removeZeroWidth: true,
        removeBOM: true,
        removeInvisible: true,
        removePrivateUse: true,
        removeDirectionalFormatting: true,
        // TODO:转义字符的处理，默认不启用，后续看需求决定是否启用
        processEscapeSequences: false,
        removeSpecialSpaces: true,
        customPatterns: [],
        ...options
    };

    let result = text;

    // 第一步：处理转义字符序列（如果启用）
    if (config.processEscapeSequences) {
        const escapeSequences: { [key: string]: string } = {
            '\\\\n': '\n',   // 换行符
            '\\\\t': '\t',   // 制表符
            '\\\\r': '\r',   // 回车符
            '\\\\b': '\b',   // 退格符
            '\\\\f': '\f',   // 换页符
            '\\\\v': '\v',   // 垂直制表符
            '\\\\0': '\0',   // 空字符
            '\\\\\'': '\'',  // 单引号
            '\\\\"': '"',    // 双引号
            '\\\\\\\\': '\\' // 反斜杠
        };

        for (const [escapeSeq, actualChar] of Object.entries(escapeSequences)) {
            const regex = new RegExp(escapeSeq, 'g');
            result = result.replace(regex, actualChar);
        }
    }

    // 定义特殊字符的正则表达式部分
    const regexParts: string[] = [];

    if (config.removeZeroWidth) {
        // 零宽字符
        regexParts.push(
            '\u200b-\u200d' +  // U+200B~U+200D: 零宽空格、非连接符、连接符
            '\u2060' +         // U+2060: 词连接符
            '\u2061-\u2064'    // U+2061~U+2064: 数学函数应用符等
        );
    }

    if (config.removeBOM) {
        // BOM字符
        regexParts.push('\ufeff'); // U+FEFF: 字节顺序标记
    }

    if (config.removeDirectionalFormatting) {
        // 方向格式化字符
        regexParts.push(
            '\u061c' +         // U+061C: 阿拉伯文字母标记
            '\u200e\u200f' +   // U+200E~U+200F: 左右标记
            '\u202a-\u202e' +  // U+202A~U+202E: 方向嵌入和覆盖
            '\u2066-\u2069'    // U+2066~U+2069: 双向文本隔离符
        );
    }

    if (config.removeSpecialSpaces) {
        // 特殊空白符
        regexParts.push(
            '\u00a0' +         // U+00A0: 不换行空格
            '\u2007' +         // U+2007: 数字空格
            '\u2009' +         // U+2009: 窄空格
            '\u202f' +         // U+202F: 窄不换行空格
            '\u3000'           // U+3000: 表意文字空格（全角空格）
        );
    }

    if (config.removeInvisible) {
        // 其他不可见字符
        regexParts.push(
            '\u0000-\u001f' +  // U+0000~U+001F: C0控制字符
            '\u007f-\u009f' +  // U+007F~U+009F: 删除键和C1控制字符
            '\u00ad' +         // U+00AD: 软连字符
            '\u034f' +         // U+034F: 组合 grapheme joiner
            '\u115f-\u1160' +  // U+115F~U+1160: 韩文字母填充符
            '\u17b4-\u17b5' +  // U+17B4~U+17B5: 高棉语元音符号
            '\u180b-\u180e' +  // U+180B~U+180E: 蒙古文格式控制
            '\u2060-\u2064' +  // U+2060~U+2064: 词连接符等（已在其他类别中）
            '\u2066-\u206f' +  // U+2066~U+206F: 格式控制符（已在其他类别中）
            '\u3164' +         // U+3164: 韩文字母填充符
            '\ufe00-\ufe0f' +  // U+FE00~U+FE0F: 变体选择符
            '\ufff0-\ufff8' +  // U+FFF0~U+FFF8: 特殊用途
            '\ufff9-\ufffb' +  // U+FFF9~U+FFFB: 间注格式控制
            '\ufffc-\ufffd'    // U+FFFC~U+FFFD: 对象替换字符
        );
    }

    if (config.removePrivateUse) {
        // 私人使用区字符
        regexParts.push('\ue000-\uf8ff');  // U+E000~U+F8FF: 基本多文种平面PUA
    }

    // 处理Unicode特殊字符
    if (regexParts.length > 0) {
        try {
            const regex = new RegExp(`[${regexParts.join('')}]`, 'g');
            result = result.replace(regex, '');
        } catch (error) {
            console.warn('正则表达式构建失败:', error);
        }
    }

    // 处理自定义模式
    if (config.customPatterns.length > 0) {
        for (const pattern of config.customPatterns) {
            result = result.replace(pattern, '');
        }
    }

    return result;
}
```
