# Hand Anatomy Explorer

用于灵巧手设计的人体手部解剖可视化网站（开源版）。

## Live Demo

部署后访问：`https://<your-github-username>.github.io/<repo-name>/`

## 功能

- Explorer：可点击关节示意图（拇指 + 四指），查看 ROM 与当前角度。
- Lengths：骨段长度表（mm），支持 `Western Male 50th` / `Asian Male 50th (×0.935)` 切换。
- Naming Guide：关节缩写和角度术语规范（含 CMC/MCP/PIP/DIP/IP）。

## 数据与命名依据

- AAOS Finger Joint Replacement: https://orthoinfo.aaos.org/en/treatment/finger-joint-replacement/
- AAOS Thumb CMC Arthroplasty: https://orthoinfo.aaos.org/en/treatment/thumb-carpometacarpal-cmc-arthroplasty/
- ISB STC Recommendation (Part II): https://pubmed.ncbi.nlm.nih.gov/15844264/
- IFSSH History & Purpose: https://www.ifssh.info/history.php
- FIPAT Terminologia Anatomica 2: https://fipat.library.dal.ca/wp-content/uploads/2020/09/FIPAT-TA2-Part-2.pdf

## 本地运行

```bash
cd hand-anatomy-site
python3 -m http.server 4173
```

打开 `http://127.0.0.1:4173/index.html`

## 开源协议

MIT License，见 [LICENSE](./LICENSE)。
