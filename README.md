# 第三方库

1. normalize.css --- 一个很小的 css 文件，在默认的HTML元素样式上提供了跨浏览器的高度一致性
2. Classnames --- 使用 js 来动态判断是否为组件添加 class
3. React-testing-library --- 组件单元测试
4. jest-dom --- 增加 DOM 测试断言

# 解决方法

#### 获取原生组件上的属性

类如 button，React 已经封装好了原生 button 的属性集合 ButtonHTMLAttributes

```tsx
import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
// 加入 btn 默认属性
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>; 
// 去除必选项
type ButtonProps = Partial<NativeButtonProps> //
```

#### 内置 jest 框架自测

```js
test('test common matcher', () => {
  expect( 2 + 2 ).toBe(4)
  expect(2 + 2).not.toBe(5)
})

test('test to be true or false', () => {
  expect(1).toBeTruthy()
  expect(0).toBeFalsy()
})

test('test number', () => {
  expect(4).toBeGreaterThan(3)
  expect(2).toBeLessThan(3)
})

test('test object', () => {
  expect({name: 'viking'}).toEqual({name: 'viking'})
})
```

```shell
npx jest jest.test.js --watch
```
