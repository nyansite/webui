# @nyansite/webui

喵站PC WebUI + 移动端WebUI

## 项目结构规划

采用多模块monorepo

```
  - | webui-pc  pc端模块
    | webui-mobile 移动端ui模块
    | logic 通用逻辑封装，包含业务逻辑和api请求封装
    | package.json
```

对于Monorepo项目依赖安装，在项目根目录使用：

```shell
pnpm i -r
```

来递归安装深层模块的依赖，不用去子模块目录里面逐个安装。

## 业务逻辑调试以及单测

- 调试：使用`tsx`直接运行ts文件即可调试业务逻辑。
  ```shell
  pnpm run tsx xx/xx.ts
  ```
- 单元测试：在logic模块计划集成vitest跑单测
  ```shell
  pnpm run test xx/xx.test.ts
  ```
