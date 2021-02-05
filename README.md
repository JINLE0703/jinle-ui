# 第三方库

1. normalize.css --- 一个很小的 css 文件，在默认的HTML元素样式上提供了跨浏览器的高度一致性
2. Classnames --- 使用 js 来动态判断是否为组件添加 class

# 技巧

#### 获取原生组件上的属性

类如 button，React 已经封装好了原生 button 的属性集合 ButtonHTMLAttributes

```tsx
import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
// 加入 btn 默认属性
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>; 
// 去除必选项
type ButtonProps = Partial<NativeButtonProps> //
```

