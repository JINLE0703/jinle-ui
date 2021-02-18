# 第三方库

1. normalize.css --- 一个很小的 css 文件，在默认的HTML元素样式上提供了跨浏览器的高度一致性
2. Classnames --- 使用 js 来动态判断是否为组件添加 class
3. React-testing-library --- 组件单元测试
4. jest-dom --- 增加 DOM 测试断言
5. fontawesome --- svg 图标库
6. react-transition-group --- 动画库
7. storybook --- 本地调试组件和生成文档

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

#### 限制子节点为指定组件

`React.Children` 提供了用于处理 `this.props.children` 不透明数据结构的实用方法 `React.Children.map`

```tsx
const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem') {
        // 默认赋值 index
        return React.cloneElement(childElement, {
          index,
        });
      } else {
        console.error('Warning: Menu has a child with is not a MenuItem component');
      }
    });
  };
```

#### useState 异步问题

useState 里传入函数可解决

```tsx
const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
  setFileList((prevList) => {
    return prevList.map((file) => {
      if (file.uid === updateFile.uid) {
        return { ...file, ...updateObj };
      } else {
        return file;
      }
    });
  });
};
```

#### useState 更新后取得最新值

useState 没有像 setState 一样可以传入更新后的回调函数，无法立即获得最新值，只能用 useEffect

但实际场景是并不需要每次 state 更新都触发 success、error、change、progress 函数，且每次触发的函数都不一样

所以在封装了 useState 更新函数的基础上多封装一层 Promise，这样每次都能获取最新值

```tsx
const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
  return new Promise((resolve, reject) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          resolve({ ...file, ...updateObj });
          return { ...file, ...updateObj };
        } else {
          return file;
				}
			});
		});
	});
};
```

```tsx
updateFileList(file, { status: 'success', response: res.data, percent: 100 }).then((_newFile) => {
	const newFile = _newFile as UploadFile;
	onSuccess && onSuccess(res.data, newFile);
	onChange && onChange(newFile);
});
```

