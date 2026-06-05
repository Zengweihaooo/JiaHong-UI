# JiaHong UI

嘉虹医疗产品体系统一组件库（Design System & UI Library）

---

## 项目简介

JiaHong UI 是嘉虹医疗产品体系的统一设计系统与前端组件库。

该项目用于沉淀和维护：

- 全局视觉规范（Design Tokens）
- 通用样式（CSS Foundation）
- 图标系统（Icons）
- 图片与插画资产（Assets）
- Vue 组件（UI Components）
- 产品设计语言（Design Language）

通过统一组件库，保证以下产品拥有一致的视觉体验与交互规范：

- 医生端（Doctor）
- 药师端（Pharmacist）
- 患者端（Patient）
- 管理后台（Admin）
- 小程序（Mini Program）
- 未来扩展产品

---

## 设计目标

JiaHong UI 不承载业务逻辑。

它只负责：

✅ UI

✅ Design Token

✅ Style System

✅ Shared Components

✅ Assets

---

它不负责：

❌ 医生业务

❌ 药师业务

❌ API 请求

❌ 状态管理

❌ 数据模型

❌ 权限逻辑

---

## 技术栈

- Vue 3
- Vite
- JavaScript / TypeScript（未来支持）
- CSS Variables
- SVG Icon System

---

## 项目结构

text JiaHong_UI │ ├── src │   ├── components │   │ │   ├── composables │   │ │   ├── utils │   │ │   └── index.js │ ├── assets │   ├── icons │   ├── images │   └── illustrations │ ├── styles │   ├── variables.css │   ├── base.css │   ├── typography.css │   └── index.css │ ├── package.json │ ├── vite.config.js │ └── README.md 

---

## 当前导出组件

javascript import {   DurationChip,   ReadTag,   StatusBadge,   TypeIcon,   FollowUpVoucher,   assetUrl } from "@jiahong/ui"; 

---

### DurationChip

用于展示持续时长。

示例：

vue <DurationChip duration="7天" /> 

---

### ReadTag

用于展示已读/未读状态。

示例：

vue <ReadTag status="unread" /> 

---

### StatusBadge

用于展示业务状态。

示例：

vue <StatusBadge status="pending" /> 

---

### TypeIcon

用于展示业务类型图标。

示例：

vue <TypeIcon type="prescription" /> 

---

### FollowUpVoucher

用于展示随访券信息。

示例：

vue <FollowUpVoucher /> 

---

### assetUrl

统一获取共享资源路径。

示例：

javascript const iconUrl = assetUrl(   "icons/prescription.svg" ); 

---

## 安装

### npm

bash npm install @jiahong/ui 

---

### 本地开发

json {   "dependencies": {     "@jiahong/ui": "file:../JiaHong_UI"   } } 

根据实际目录调整路径。

---

## 使用

### 引入样式

javascript import "@jiahong/ui/styles.css"; 

---

### 使用组件

javascript import {   StatusBadge,   DurationChip } from "@jiahong/ui"; 

---

## 开发规范

### 组件职责

组件必须保持：

- 单一职责
- 可复用
- 无业务耦合

示例：

✅ StatusBadge

✅ EmptyState

✅ AppButton

---

禁止：

❌ DoctorStatusBadge

❌ PharmacistReviewCard

❌ PatientRecordPanel

上述属于业务组件，应放在具体业务项目中。

---

## 样式规范

统一使用：

- CSS Variables
- Design Tokens

例如：

css :root {   --jh-primary: #5B8FF9;   --jh-success: #52C41A;   --jh-warning: #FAAD14;   --jh-danger: #FF4D4F; } 

业务项目不得直接修改组件库颜色。

---

## 版本规范

遵循 Semantic Versioning：

text MAJOR.MINOR.PATCH 

示例：

text 1.0.0 1.1.0 1.1.1 2.0.0 

---

## 未来规划

计划增加：

- Button
- Input
- Modal
- Drawer
- Table
- Empty State
- Loading
- Toast
- Avatar
- Timeline
- Medical Card
- Medication Card
- Prescription Card

---

## 关联项目

### JiaHong Doctor

医生工作台系统

---

### JiaHong Pharmacist

药师工作台系统

---

### JiaHong Patient

患者服务平台

---

## 维护原则

JiaHong UI 是嘉虹产品体系的唯一设计源（Single Source of Truth）。

所有产品应优先复用组件库能力，而不是在业务项目中重复实现相同组件。

新增组件时应优先考虑：

1. 是否具有跨产品复用价值
2. 是否符合现有设计语言
3. 是否保持无业务耦合
4. 是否具备足够扩展性

---

© JiaHong Healthcare Design System