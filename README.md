# @nyansite/webui

喵站PC WebUI + 移动端WebUI

## 项目规划

### 结构

采用多模块Monorepo

```
  - | webui-pc  pc端模块
    | webui-mobile 移动端ui模块
    | logic 通用逻辑封装，包含业务逻辑和api请求封装
    | package.json
```

### 技术选型

- 框架：Vue + Vite
- 插件：UnoCSS, VueUse
- 组件库：[PrimeVue](https://github.com/primefaces/primevue)

# Monorepo注意事项

## 1.依赖安装

对于Monorepo项目依赖安装，在项目根目录使用：

```shell
pnpm i -r
```

来递归安装深层模块的依赖，不用去子模块目录里面逐个安装。

## 2.依赖升级

利用工具: `taze`，在根目录，运行：

```shell
pnpm run dep
```

即可更新所有子模块的依赖

## 业务逻辑调试以及单测

### 调试

使用`tsx`直接运行ts文件即可调试业务逻辑。

```shell
pnpm run tsx xx/xx.ts
```

### 单元测试

在logic模块的`test`文件夹中写单测代码，利用vitest进行单元测试

```shell
pnpm run test xx/xx.test.ts
```
