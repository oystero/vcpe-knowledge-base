---
tags: [vc-pe, Term-Sheet, 投资条款, 谈判, 股权投资]
created: 2026-05-27
updated: 2026-05-27
status: reviewed
---

# 投资条款清单（Term Sheet）

## 概述
Term Sheet（投资条款清单）是 VC/PE 投资中投资方与被投企业之间就投资条件达成的意向性文件。虽然大部分条款不具法律约束力（Non-Binding），但它是整个交易的基础框架，决定了投资的经济条款和治理安排。理解 Term Sheet 的核心条款是每位投资从业者和创业者的必备技能。

## 核心内容

### Term Sheet 的法律性质

| 条款类型 | 法律约束力 | 说明 |
|----------|-----------|------|
| 估值与投资金额 | 无约束力 | 签署正式协议前可协商调整 |
| 股东权利条款 | 无约束力 | 以最终股东协议为准 |
| 保密条款 | **有约束力** | 签署即生效 |
| 排他条款 | **有约束力** | 签署后一定期限内不得与第三方洽谈 |
| 费用承担 | **有约束力** | 通常约定交易费用由被投企业承担 |

### 核心经济条款

#### 1. 投资金额与估值

| 概念 | 说明 | 示例 |
|------|------|------|
| Pre-Money Valuation | 投资前企业估值 | 1 亿元 |
| Post-Money Valuation | 投资后企业估值 = Pre-Money + 投资额 | 1.3 亿元（投资 3,000 万） |
| 投资金额 | 本轮投资总额 | 3,000 万元 |
| 持股比例 | 投资额 / Post-Money | 3,000 万 / 1.3 亿 = 23.1% |

#### 2. 优先清算权（Liquidation Preference）

这是 VC/PE 投资中最重要的保护性条款之一。

| 类型 | 说明 | 对投资人的保护 |
|------|------|---------------|
| 1x Non-Participating（1倍不参与型） | 退出时取回 1x 投资本金 **或** 按持股比例分配，取较高者 | 中等保护 |
| 1x Participating（1倍参与型） | 先取回 1x 本金，**再** 按持股比例分配剩余 | 高度保护（对创始人不利） |
| 1x Participating with Cap（带上限参与型） | 参与分配，但总回报不超过约定上限（如 3x） | 平衡方案 |

**实务案例：**
- 投资 1,000 万，持股 20%，企业以 3,000 万退出
- **Non-Participating：** 比较 1x（1,000 万）vs 20% x 3,000 万（600 万），取 1,000 万
- **Participating：** 1,000 万 + 20% x (3,000 万 - 1,000 万) = 1,000 万 + 400 万 = 1,400 万

#### 3. 反稀释保护（Anti-Dilution Protection）

| 类型 | 计算方式 | 效果 |
|------|----------|------|
| Full Ratchet（完全棘轮） | 按最低一轮价格重新计算转换价格 | 对投资人保护最强，对创始人最不利 |
| Broad-Based Weighted Average（广义加权平均） | 综合考虑新发行股数和价格进行调整 | 行业标准，较平衡 |
| Narrow-Based Weighted Average（狭义加权平均） | 与 Broad-Based 类似，但计算基数更窄 | 折中方案 |

**行业趋势：** Broad-Based Weighted Average 是目前最主流的反稀释条款，Full Ratchet 已较少使用。

### 核心治理条款

#### 4. 董事会构成

| 典型安排 | 早期（A轮） | 成长期（C轮+） |
|----------|------------|---------------|
| 创始人/管理层 | 2 席 | 2-3 席 |
| 优先股投资人 | 1 席 | 1-2 席 |
| 独立董事 | 0-1 席 | 1-2 席 |
| **合计** | 3-4 席 | 5-7 席 |

#### 5. 保护性条款（Protective Provisions）

投资人（优先股）通常对以下事项拥有否决权：
- 修改公司章程或 LPA 中影响投资人权利的条款
- 发行新证券（特别是优先于或等同于当前优先股的证券）
- 进行超过一定金额的关联交易
- 分红或回购股权
- 超出预算的重大资本支出
- 出售或清算公司
- 变更主营业务

#### 6. 优先购买权与共同出售权

| 条款 | 说明 |
|------|------|
| 优先购买权（Right of First Refusal, ROFR） | 创始人/其他股东转让股权时，投资人有权优先购买 |
| 共同出售权（Co-Sale / Tag-Along） | 创始人出售股权时，投资人有权按比例一同出售 |
| 拖售权（Drag-Along） | 满足一定条件时，多数股东有权强制少数股东一同出售 |

#### 7. 其他重要条款

| 条款 | 说明 |
|------|------|
| 优先认购权（Pro-Rata Right） | 投资人在后续融资轮次中按比例认购的权利 |
| 跟投权（Right to Invest More） | 投资人在本轮中可追加投资的权利 |
| 信息权（Information Rights） | 要求企业提供定期财务报告和运营数据的权利 |
| 锁定期（Lock-up） | 创始人股权的锁定期限（通常 4 年，含 1 年 Cliff） |
| 竞业限制（Non-Compete） | 创始人在职期间及离职后一定期限内的竞业限制 |
| 知识产权归属（IP Assignment） | 确保公司拥有创始人开发的所有相关 IP |

### VC vs PE Term Sheet 差异

| 维度 | VC（风险投资） | PE（私募股权） |
|------|---------------|---------------|
| 主要条款工具 | 优先股条款（Preferred Stock） | 股东协议 + 增资协议 |
| 估值方法 | 相对估值（PS/Revenue Multiple） | DCF、可比公司、可比交易 |
| 保护性条款 | 优先股保护条款 | 对赌协议、回购条款 |
| 特有条款 | 领售权、反稀释 | 对赌（VAM）、优先清算 |

## 关键术语

| 术语 | 英文 | 定义 |
|------|------|------|
| 投资条款清单 | Term Sheet / Letter of Intent | 投资方与被投方就投资条件达成的意向性文件 |
| 投前估值 | Pre-Money Valuation | 投资前企业的估值 |
| 投后估值 | Post-Money Valuation | 投资完成后的企业估值 |
| 优先清算权 | Liquidation Preference | 优先股在清算/退出时优先于普通股获得分配的权利 |
| 反稀释保护 | Anti-Dilution Protection | 保护投资人免受后续低价融资稀释的条款 |
| 保护性条款 | Protective Provisions | 投资人对重大事项的否决权 |
| 拖售权 | Drag-Along Right | 多数股东强制少数股东一同出售的权利 |
| 对赌协议 | VAM (Valuation Adjustment Mechanism) | 基于未来业绩调整估值或股权比例的协议 |

## 实务要点

- **Term Sheet 是谈判的起点而非终点：** 不要在 Term Sheet 阶段就试图锁定所有细节，重点是核心经济条款和治理安排，细节留给正式协议
- **估值不是越高越好：** 过高的估值会导致后续融资困难（Down Round 风险）和创始人过度稀释，合理估值比"最高估值"更重要
- **优先清算权要关注"退出倍数"：** 在企业以较低价格退出时，1x Non-Participating vs 1x Participating 的差异可能是创始人拿到钱和拿不到钱的区别
- **注意关联交易条款的范围：** 合理定义关联交易的范围和审批流程，过宽的定义会影响企业正常运营
- **投资人的领售权应有限制：** Drag-Along 应设定最低退出价格或最低回报门槛，防止投资人在企业低点强制退出

## 常见误区

- **将 Term Sheet 当作最终协议：** Term Sheet 大部分条款不具法律约束力，在 DD 发现重大问题后估值和条款都有可能调整，创业者不应过早宣布融资完成
- **忽视保护性条款的累积效应：** 单看每一条保护性条款似乎合理，但当多轮投资人各自拥有否决权时，可能导致公司重大决策难以推进，应在后续轮次中协调统一
- **创始人忽视竞业限制和锁定期条款：** 这些条款看似"标准"，但可能在创始人离职或想做新业务时产生重大限制，应在签署前仔细评估

## 参考来源

- Wasserman, N. *The Founder's Dilemmas*. Princeton University Press, 2012.
- Gompers, P. et al. *Venture Capital, Private Equity, and the Financing of Entrepreneurship*. Wiley, 2016.
- Cooley LLP. *Cooley GO Term Sheet Generator*, 2024.
- NVCA (National Venture Capital Association). *Model Legal Documents*, 2023.
- Y Combinator. *SAFE (Simple Agreement for Future Equity) Primer*, 2024.

## 相关主题

- [[LP与GP关系]] — GP 在投资决策中代表 LP 行使权利
- [[尽职调查框架]] — Term Sheet 签署后的 DD 流程
- [[投资决策流程]] — Term Sheet 签署前的投决流程
- [[交割与工商变更]] — Term Sheet 签署后的交割执行
