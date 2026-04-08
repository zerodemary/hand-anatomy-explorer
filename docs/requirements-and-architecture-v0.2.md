# Hand Anatomy Explorer 需求与技术架构梳理（v0.2）

- 文档状态：讨论稿（用于与 GPT 对齐需求与技术路线）
- 最后更新：2026-04-04
- 对应项目：`hand-anatomy-explorer`
- 在线版本：https://zerodemary.github.io/hand-anatomy-explorer/

---

## 1. 项目目标

构建一个面向灵巧手（Dexterous Hand）设计的手部解剖参考网站，核心价值是：

1. 直观查看关节活动范围（ROM）与骨段长度。
2. 统一关节与角度命名，避免工程和医学术语混用。
3. 支持不同人群规格切换，辅助结构尺寸决策。

目标用户：

- 机器人结构工程师
- 工业设计师
- 生物力学/运动学研究者

---

## 2. 当前版本已实现（As-Is）

当前线上版本（2026-04-04）已包含：

1. Explorer
- 背侧手部示意图（可点击关节）
- 关节详情面板：
  - 关节命名（缩写/全称/类型/DOF）
  - ROM 弧形仪表 + 角度滑块
  - 当前人群下骨段长度（mm）

2. Lengths
- 五指分段长度表（MC/PP/MP/DP）
- Western Male 50th 与 Asian Male 50th 切换

3. Naming Guide
- CMC/MCP/PIP/DIP/IP 命名与说明
- 角度术语（Flexion/Extension, Abduction/Adduction 等）
- 参考来源链接（AAOS/ISB/IFSSH/FIPAT）

---

## 3. 核心需求（To-Be）

## 3.1 功能需求

FR-01 拇指
- 展示 CMC / MCP / IP ROM
- 展示 MC / PP / DP 长度
- 明确运动命名与方向

FR-02 四指（食-小）
- 展示 MCP / PIP / DIP ROM
- 展示 MC / PP / MP / DP 长度
- 支持 finger-by-finger 对比

FR-03 人群规格
- 最少支持：Western Male 50th、Asian Male 50th
- 预留扩展：Female、P5/P95

FR-04 命名规范
- 关节缩写、全称、关节类型、DOF
- 角度术语、符号和中立位定义
- 必须附来源与版本说明

FR-05 交互体验
- 点击关节即看数据（不要多层跳转）
- 可快速切换人群规格并看到联动变化
- 界面简洁、信息密度适中

## 3.2 非功能需求

- 可用性：桌面优先，移动端可读
- 性能：首屏加载尽量轻量（静态资源优先）
- 可维护性：数据层与展示层分离
- 可审计性：每条关键数据可追溯来源

---

## 4. 数据与命名规范建议

## 4.1 数据分层

建议拆为三层数据：

1. `reference`
- 原始参考值（Western baseline）
- 文献来源、版本、备注

2. `populationProfile`
- 人群缩放规则（如 `asian_male_50 = baseline * 0.935`）
- 未来可添加性别/分位数策略

3. `uiState`
- 当前选中关节
- 当前角度（仅交互态，不回写参考数据）

## 4.2 JSON 结构草案

```json
{
  "version": "0.2.0",
  "sources": {
    "rom": [{"id": "aaos-2nd", "title": "AAOS Joint Motion"}],
    "nomenclature": [{"id": "fipat-ta2", "title": "Terminologia Anatomica 2"}]
  },
  "baseline": {
    "western_male_50": {
      "segments_mm": {
        "thumb": {"mc": 49, "pp": 32, "dp": 22},
        "index": {"mc": 66, "pp": 40, "mp": 22, "dp": 16}
      },
      "rom_deg": {
        "th_cmc_fe": {"min": -15, "max": 20},
        "th_cmc_aa": {"min": -30, "max": 50}
      }
    }
  },
  "profiles": {
    "asian_male_50": {
      "segment_scale_from": "western_male_50",
      "scale": 0.935
    }
  }
}
```

## 4.3 命名规则（工程约定）

- 关节 ID：`<finger>_<joint>`，如 `ix_pip`
- 角度 ID：`<joint>_<motion>`，如 `ix_mcp_fe`
- motion 后缀建议：
  - `fe`: flexion/extension
  - `aa`: abduction/adduction
  - `ps`: pronation/supination（若后续加入前臂）
- 符号约定必须固定在文档中：
  - 屈曲为正、伸展为负
  - 外展为正、内收为负

---

## 5. 技术架构方案

## 5.1 当前线上方案（已落地）

- 形态：静态站点（HTML + CSS + Vanilla JS + SVG）
- 部署：GitHub Pages（Actions 自动部署）
- 优点：
  - 开发和部署快
  - 依赖少、维护成本低
  - 适合需求迭代早期
- 局限：
  - 复杂状态和组件复用能力一般
  - 长期扩展（3D/多语言/复杂筛选）成本会升高

## 5.2 正式版建议（中期）

建议迁移到 React + TypeScript（可继续静态部署）：

- UI：React + TypeScript
- 样式：Tailwind 或 CSS Modules（二选一）
- 图形：
  - 2D 优先：SVG（可维护）
  - 3D 备选：Three.js（仅在确有需求时引入）
- 数据：本地 JSON（版本化）
- 校验：Zod（可选）

推荐架构分层：

1. `data/`：标准数据与来源说明
2. `domain/`：ROM 计算、缩放与单位转换
3. `features/explorer`：关节浏览
4. `features/naming`：术语规范
5. `features/lengths`：长度对比

---

## 6. 部署与开源策略

当前已采用：

- 仓库：公开（MIT）
- 自动部署：push 到 `main` 自动发布 GitHub Pages
- 对外地址：`https://zerodemary.github.io/hand-anatomy-explorer/`

建议补充：

1. 版本管理
- 使用语义化版本（`v0.x`）
- 每次数据更新写 changelog

2. 数据治理
- 在 `docs/data-sources.md` 维护来源与许可说明
- 为关键 ROM 增加“证据等级/备注”字段

3. 质量保证
- 增加最小化测试（数据完整性 + ID 唯一性）
- 增加 lint/format

---

## 7. 待确认决策清单（给 GPT 一起定）

D1. 视觉表达
- 保持 2D SVG 为主，还是近期引入 3D？

D2. 数据策略
- 是否把 ROM 与长度分开版本号（`romVersion`, `segmentVersion`）？

D3. 人群扩展优先级
- Female 与 P5/P95 哪个先做？

D4. 工程功能
- 是否需要“导出当前关节数据卡（PNG/PDF）”？

D5. 设计对比功能
- 是否加入“机器人目标 ROM 与人手 ROM 的差值层（gap overlay）”？

D6. 国际化
- 是否在 v0.x 就做中英双语切换？

D7. 技术迁移时机
- 继续静态站点迭代，还是下一迭代就迁 React/TS？

---

## 8. 下一步建议（两周内）

第 1 周
1. 与 GPT 完成 D1-D7 决策
2. 冻结 v0.3 数据结构（JSON schema）
3. 补齐数据来源文档与字段解释

第 2 周
1. 完成一次版本发布（v0.3）
2. 增加“对比视图（Western vs Asian）”
3. 产出一份可用于设计评审的演示脚本

---

## 附录 A：当前实现文件映射

- 页面入口：`index.html`
- 样式：`styles.css`
- 交互与数据：`app.js`
- 部署工作流：`.github/workflows/deploy.yml`

