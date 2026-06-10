# JiaHong UI

嘉虹医疗统一 Vue 3 UI 组件库。组件库只承载通用 UI、设计变量、基础样式、图标和图片资产，不包含端侧业务逻辑、接口请求或状态管理。

## Usage

```js
import {
  StatusBadge,
  ReadTag,
  DurationChip,
  TypeIcon,
  assetUrl
} from '@jiahong/ui'

import '@jiahong/ui/styles.css'
```

## 更新简介

### 2026-06-06

- 组件库文档页的组件预览改为固定缩略图展示，超长或超宽组件不再为了卡片尺寸自适应压缩布局。
- 每个组件预览右上角新增 `1:1` 入口，点击后可在弹层中按原始比例查看完整组件；屏幕装不下时通过滚动查看，组件本身不被拉伸。
- 收紧文档页旧的预览裁切规则，避免原比例查看时隐藏组件内容。

如果项目需要显式注册随包维护的微软雅黑字体，可以额外按需引入：

```js
import '@jiahong/ui/fonts.css'
```

`styles.css` 导出源码入口 `styles/index.css`，避免业务端依赖未提交的 `dist/` 构建产物；字体文件统一放在 `assets/fonts/`，默认不内联到主样式。

## Exports

- `StatusBadge`: 通用状态标签，支持 `status`、`tone`、`label`。
- `ReadTag`: 已读/未读标签。
- `DurationChip`: 时长标签，支持 `seconds`、`variant`、`label`。
- `ConsultInfoCard`: 通用咨询信息卡，支持病情描述、病例图片、病例语音和图片预览事件。
- `TypeIcon`: 类型图标，支持默认图标映射和自定义 `icons`。
- `MedicineRiskTip`: 通用药品风险提示卡，支持风险等级、风险分类、警示文案、建议文案和关闭事件。
- `RoomPendingWorkspace`: 通用待接诊问诊室占位工作台，包含聊天骨架、处方占位和刷新事件。
- `VideoCallWindow`: 通用视频通话窗口，负责患者画面、医生本地画面、摄像头/麦克风控制按钮和媒体状态展示。
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

- 基础组件：`StatusBadge`、`ReadTag`、`DurationChip`、`ConsultInfoCard`、`TypeIcon`、`MedicineRiskTip`、`RoomPendingWorkspace`、`VideoCallWindow`、`Button`、`Card`、`Avatar`、`EmptyState`
- 通用 token：颜色、字体、圆角、阴影、间距、按钮、输入、表格、标签、开关、复选框
- 共享资产：logo、问诊类型图标、空状态、搜索、附件、视频、字体

暂不迁移：

- 医生端问诊工作台布局
- 处方编辑流程样式
- 风险检测弹窗业务结构
- 与医生端状态机、接口、字段强绑定的交互逻辑

---

© JiaHong Healthcare Design System
