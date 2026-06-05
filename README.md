# JiaHong UI

嘉虹医疗统一 Vue 3 UI 组件库。组件库只承载通用 UI、设计变量、基础样式、图标和图片资产，不包含端侧业务逻辑、接口请求或状态管理。

## Usage

```js
import {
  StatusBadge,
  ReadTag,
  DurationChip,
  TypeIcon,
  FollowUpVoucher,
  assetUrl
} from '@jiahong/ui'

import '@jiahong/ui/styles.css'
```

如果项目需要显式注册随包维护的微软雅黑字体，可以额外按需引入：

```js
import '@jiahong/ui/fonts.css'
```

`styles.css` 默认不内联字体文件，避免组件库主样式体积膨胀；字体文件统一放在 `assets/fonts/`。

## Exports

- `StatusBadge`: 通用状态标签，支持 `status`、`tone`、`label`。
- `ReadTag`: 已读/未读标签。
- `DurationChip`: 时长标签，支持 `seconds`、`variant`、`label`。
- `TypeIcon`: 类型图标，支持默认图标映射和自定义 `icons`。
- `FollowUpVoucher`: 通用凭证展示组件，使用 `images`、`voices`、`variant`、`title` 等 props。
- `Button`、`Card`、`Avatar`、`EmptyState`: 基础组件。
- `assetUrl(path)`: 获取组件库共享资产 URL，兼容 `assets/foo.svg` 和 `foo.svg`。

## Local Development

```json
{
  "dependencies": {
    "@jiahong/ui": "file:../JiaHong_UI"
  }
}
```

构建组件库：

```bash
npm run build
```

启动组件 overview 审阅页：

```bash
npm run dev
```

构建 GitHub Pages 文档：

```bash
npm run build:pages
```

## Structure

```text
src/
  components/
  composables/
  utils/
  index.js
styles/
  fonts.css
  variables.css
  base.css
  typography.css
  index.css
assets/
  icons/
  images/
  illustrations/
```

## 维护原则

JiaHong UI 是嘉虹产品体系的唯一设计源（Single Source of Truth）。

所有产品应优先复用组件库能力，而不是在业务项目中重复实现相同组件。

新增组件时应优先考虑：

1. 是否具有跨产品复用价值
2. 是否符合现有设计语言
3. 是否保持无业务耦合
4. 是否具备足够扩展性

## 医生端迁移边界

已迁移到 UI：

- 基础组件：`StatusBadge`、`ReadTag`、`DurationChip`、`TypeIcon`、`FollowUpVoucher`、`Button`、`Card`、`Avatar`、`EmptyState`
- 通用 token：颜色、字体、圆角、阴影、间距、按钮、输入、表格、标签、开关、复选框
- 共享资产：logo、问诊类型图标、空状态、搜索、附件、视频、字体

暂不迁移：

- 医生端问诊工作台布局
- 处方编辑流程样式
- 风险检测弹窗业务结构
- 与医生端状态机、接口、字段强绑定的交互逻辑

---

© JiaHong Healthcare Design System
