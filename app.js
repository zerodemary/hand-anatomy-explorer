const POPULATIONS = {
  western: {
    label: "Western Male · 50th",
    scale: 1
  },
  asian: {
    label: "Asian Male · 50th",
    scale: 0.935
  }
};

const FINGERS = {
  thumb: { key: "thumb", name: "Thumb", nameZh: "拇指", color: "#d97706" },
  index: { key: "index", name: "Index", nameZh: "食指", color: "#06b6d4" },
  middle: { key: "middle", name: "Middle", nameZh: "中指", color: "#10b981" },
  ring: { key: "ring", name: "Ring", nameZh: "无名指", color: "#ef4444" },
  little: { key: "little", name: "Little", nameZh: "小指", color: "#ec4899" }
};

const SEGMENT_BASE = {
  thumb: { mc: 49, pp: 32, dp: 22 },
  index: { mc: 66, pp: 40, mp: 22, dp: 16 },
  middle: { mc: 69, pp: 44, mp: 24, dp: 17 },
  ring: { mc: 65, pp: 41, mp: 22, dp: 16 },
  little: { mc: 57, pp: 31, mp: 18, dp: 14 }
};

const SEGMENT_LABELS = {
  mc: "Metacarpal",
  pp: "Proximal Phalanx",
  mp: "Middle Phalanx",
  dp: "Distal Phalanx"
};

const JOINTS = {
  th_cmc: {
    id: "th_cmc",
    abbr: "CMC",
    labelZh: "拇指腕掌关节",
    fullName: "Carpometacarpal Joint",
    cn: "拇指基底关节",
    type: "Saddle",
    dof: "2+",
    finger: "thumb",
    note: "拇指对掌（Opposition）的核心关节",
    motions: [
      { id: "th_cmc_fe", name: "Flexion / Extension", nameZh: "屈曲 / 伸展", min: -15, max: 20 },
      { id: "th_cmc_aa", name: "Abduction / Adduction", nameZh: "外展 / 内收", min: -30, max: 50 }
    ]
  },
  th_mcp: {
    id: "th_mcp",
    abbr: "MCP",
    labelZh: "拇指掌指关节",
    fullName: "Metacarpophalangeal Joint",
    cn: "掌指关节",
    type: "Condyloid",
    dof: "1-2",
    finger: "thumb",
    note: "以屈伸为主",
    motions: [
      { id: "th_mcp_fe", name: "Flexion / Extension", nameZh: "屈曲 / 伸展", min: -10, max: 50 }
    ]
  },
  th_ip: {
    id: "th_ip",
    abbr: "IP",
    labelZh: "拇指指间关节",
    fullName: "Interphalangeal Joint",
    cn: "指间关节（拇指）",
    type: "Hinge",
    dof: "1",
    finger: "thumb",
    note: "拇指只有一个 IP 关节",
    motions: [
      { id: "th_ip_fe", name: "Flexion / Extension", nameZh: "屈曲 / 伸展", min: -25, max: 80 }
    ]
  },
  ix_mcp: {
    id: "ix_mcp",
    abbr: "MCP",
    labelZh: "食指掌指关节",
    fullName: "Metacarpophalangeal Joint",
    cn: "掌指关节",
    type: "Condyloid",
    dof: "2",
    finger: "index",
    note: "屈伸 + 外展/内收",
    motions: [
      { id: "ix_mcp_fe", name: "Flexion / Extension", nameZh: "屈曲 / 伸展", min: -30, max: 90 },
      { id: "ix_mcp_aa", name: "Abduction / Adduction", nameZh: "外展 / 内收", min: -20, max: 20 }
    ]
  },
  ix_pip: {
    id: "ix_pip",
    abbr: "PIP",
    labelZh: "食指近端指间关节",
    fullName: "Proximal Interphalangeal Joint",
    cn: "近端指间关节",
    type: "Hinge",
    dof: "1",
    finger: "index",
    note: "常见误写为 PID，规范缩写是 PIP",
    motions: [{ id: "ix_pip_fe", name: "Flexion / Extension", nameZh: "屈曲 / 伸展", min: 0, max: 100 }]
  },
  ix_dip: {
    id: "ix_dip",
    abbr: "DIP",
    labelZh: "食指远端指间关节",
    fullName: "Distal Interphalangeal Joint",
    cn: "远端指间关节",
    type: "Hinge",
    dof: "1",
    finger: "index",
    note: "末端精细闭合动作关键关节",
    motions: [{ id: "ix_dip_fe", name: "Flexion / Extension", nameZh: "屈曲 / 伸展", min: -20, max: 70 }]
  },
  md_mcp: {
    id: "md_mcp",
    abbr: "MCP",
    labelZh: "中指掌指关节",
    fullName: "Metacarpophalangeal Joint",
    cn: "掌指关节",
    type: "Condyloid",
    dof: "2",
    finger: "middle",
    note: "中指 MCP 外展幅度通常较小",
    motions: [
      { id: "md_mcp_fe", name: "Flexion / Extension", nameZh: "屈曲 / 伸展", min: -30, max: 90 },
      { id: "md_mcp_aa", name: "Abduction / Adduction", nameZh: "外展 / 内收", min: -15, max: 15 }
    ]
  },
  md_pip: {
    id: "md_pip",
    abbr: "PIP",
    labelZh: "中指近端指间关节",
    fullName: "Proximal Interphalangeal Joint",
    cn: "近端指间关节",
    type: "Hinge",
    dof: "1",
    finger: "middle",
    note: "以屈伸为主",
    motions: [{ id: "md_pip_fe", name: "Flexion / Extension", nameZh: "屈曲 / 伸展", min: 0, max: 100 }]
  },
  md_dip: {
    id: "md_dip",
    abbr: "DIP",
    labelZh: "中指远端指间关节",
    fullName: "Distal Interphalangeal Joint",
    cn: "远端指间关节",
    type: "Hinge",
    dof: "1",
    finger: "middle",
    note: "以末节屈伸为主",
    motions: [{ id: "md_dip_fe", name: "Flexion / Extension", nameZh: "屈曲 / 伸展", min: -20, max: 70 }]
  },
  rg_mcp: {
    id: "rg_mcp",
    abbr: "MCP",
    labelZh: "无名指掌指关节",
    fullName: "Metacarpophalangeal Joint",
    cn: "掌指关节",
    type: "Condyloid",
    dof: "2",
    finger: "ring",
    note: "抓握时参与掌弓调节",
    motions: [
      { id: "rg_mcp_fe", name: "Flexion / Extension", nameZh: "屈曲 / 伸展", min: -30, max: 90 },
      { id: "rg_mcp_aa", name: "Abduction / Adduction", nameZh: "外展 / 内收", min: -20, max: 20 }
    ]
  },
  rg_pip: {
    id: "rg_pip",
    abbr: "PIP",
    labelZh: "无名指近端指间关节",
    fullName: "Proximal Interphalangeal Joint",
    cn: "近端指间关节",
    type: "Hinge",
    dof: "1",
    finger: "ring",
    note: "与中指 PIP 运动模式接近",
    motions: [{ id: "rg_pip_fe", name: "Flexion / Extension", nameZh: "屈曲 / 伸展", min: 0, max: 100 }]
  },
  rg_dip: {
    id: "rg_dip",
    abbr: "DIP",
    labelZh: "无名指远端指间关节",
    fullName: "Distal Interphalangeal Joint",
    cn: "远端指间关节",
    type: "Hinge",
    dof: "1",
    finger: "ring",
    note: "末节关节屈伸范围与食中指相近",
    motions: [{ id: "rg_dip_fe", name: "Flexion / Extension", nameZh: "屈曲 / 伸展", min: -20, max: 70 }]
  },
  lt_mcp: {
    id: "lt_mcp",
    abbr: "MCP",
    labelZh: "小指掌指关节",
    fullName: "Metacarpophalangeal Joint",
    cn: "掌指关节",
    type: "Condyloid",
    dof: "2",
    finger: "little",
    note: "外展/内收幅度通常最大",
    motions: [
      { id: "lt_mcp_fe", name: "Flexion / Extension", nameZh: "屈曲 / 伸展", min: -30, max: 90 },
      { id: "lt_mcp_aa", name: "Abduction / Adduction", nameZh: "外展 / 内收", min: -30, max: 30 }
    ]
  },
  lt_pip: {
    id: "lt_pip",
    abbr: "PIP",
    labelZh: "小指近端指间关节",
    fullName: "Proximal Interphalangeal Joint",
    cn: "近端指间关节",
    type: "Hinge",
    dof: "1",
    finger: "little",
    note: "精细抓握时角度变化明显",
    motions: [{ id: "lt_pip_fe", name: "Flexion / Extension", nameZh: "屈曲 / 伸展", min: 0, max: 100 }]
  },
  lt_dip: {
    id: "lt_dip",
    abbr: "DIP",
    labelZh: "小指远端指间关节",
    fullName: "Distal Interphalangeal Joint",
    cn: "远端指间关节",
    type: "Hinge",
    dof: "1",
    finger: "little",
    note: "末端触碰与夹持时重要",
    motions: [{ id: "lt_dip_fe", name: "Flexion / Extension", nameZh: "屈曲 / 伸展", min: -20, max: 70 }]
  }
};

const JOINT_POINTS = {
  wrist: { x: 280, y: 494 },
  th_cmc: { x: 162, y: 414 },
  th_mcp: { x: 122, y: 352 },
  th_ip: { x: 99, y: 286 },
  th_tip: { x: 88, y: 236 },
  ix_mcp: { x: 198, y: 346 },
  ix_pip: { x: 196, y: 252 },
  ix_dip: { x: 193, y: 178 },
  ix_tip: { x: 189, y: 122 },
  md_mcp: { x: 256, y: 335 },
  md_pip: { x: 256, y: 228 },
  md_dip: { x: 256, y: 146 },
  md_tip: { x: 256, y: 88 },
  rg_mcp: { x: 314, y: 344 },
  rg_pip: { x: 320, y: 245 },
  rg_dip: { x: 326, y: 170 },
  rg_tip: { x: 331, y: 115 },
  lt_mcp: { x: 370, y: 365 },
  lt_pip: { x: 386, y: 282 },
  lt_dip: { x: 398, y: 216 },
  lt_tip: { x: 406, y: 168 }
};

const BONE_LINES = [
  ["wrist", "th_cmc"],
  ["wrist", "ix_mcp"],
  ["wrist", "md_mcp"],
  ["wrist", "rg_mcp"],
  ["wrist", "lt_mcp"],
  ["th_cmc", "th_mcp"],
  ["th_mcp", "th_ip"],
  ["th_ip", "th_tip"],
  ["ix_mcp", "ix_pip"],
  ["ix_pip", "ix_dip"],
  ["ix_dip", "ix_tip"],
  ["md_mcp", "md_pip"],
  ["md_pip", "md_dip"],
  ["md_dip", "md_tip"],
  ["rg_mcp", "rg_pip"],
  ["rg_pip", "rg_dip"],
  ["rg_dip", "rg_tip"],
  ["lt_mcp", "lt_pip"],
  ["lt_pip", "lt_dip"],
  ["lt_dip", "lt_tip"]
];

const JOINT_NAMING_ROWS = [
  ["CMC", "Carpometacarpal Joint", "腕掌关节（拇指基底）", "Saddle", "2+", "拇指对掌核心关节"],
  ["MCP", "Metacarpophalangeal Joint", "掌指关节", "Condyloid", "2", "全部五指均有"],
  ["PIP", "Proximal Interphalangeal Joint", "近端指间关节", "Hinge", "1", "食指到小指；常见误写 PID"],
  ["DIP", "Distal Interphalangeal Joint", "远端指间关节", "Hinge", "1", "食指到小指"],
  ["IP", "Interphalangeal Joint", "拇指指间关节", "Hinge", "1", "拇指专属"],
  ["MC / PP / MP / DP", "Metacarpal / Proximal / Middle / Distal Phalanx", "掌骨 / 近节 / 中节 / 末节指骨", "Bone Segment", "-", "长度计算的标准骨段"],
  ["RC", "Radiocarpal Joint", "桡腕关节", "Ellipsoid", "2", "本版本用于定位腕部参考点"]
];

const ANGLE_NAMING_ROWS = [
  ["Flexion / Extension", "屈曲 / 伸展", "F/E", "围绕局部横轴的主平面转动", "屈曲为正，伸展为负"],
  ["Abduction / Adduction", "外展 / 内收", "Abd/Add", "相对中轴线偏离/回归", "外展为正，内收为负"],
  ["Pronation / Supination", "旋前 / 旋后", "P/S", "前臂纵轴旋转（用于手朝向定义）", "旋后为正（可在工程里反号）"],
  ["Opposition / Reposition", "对掌 / 复位", "Opp/Rep", "拇指 CMC 复合运动", "工程实现可拆为 F/E + Abd/Add"],
  ["Neutral", "中立位", "0°", "临床记录的角度基准位", "超出中立位须注明符号"]
];

const state = {
  population: "western",
  activeJoint: "ix_mcp",
  angles: {}
};

const svgNS = "http://www.w3.org/2000/svg";

const dom = {
  populationSelect: document.getElementById("populationSelect"),
  tabButtons: Array.from(document.querySelectorAll(".tab-btn")),
  tabPanels: Array.from(document.querySelectorAll(".tab-panel")),
  handSvg: document.getElementById("handSvg"),
  fingerLegend: document.getElementById("fingerLegend"),
  jointTitle: document.getElementById("jointTitle"),
  jointMeta: document.getElementById("jointMeta"),
  motionControls: document.getElementById("motionControls"),
  segmentSummary: document.getElementById("segmentSummary"),
  lengthTableWrap: document.getElementById("lengthTableWrap"),
  jointNamingTable: document.getElementById("jointNamingTable"),
  angleNamingTable: document.getElementById("angleNamingTable")
};

function createSvg(tag, attrs = {}) {
  const el = document.createElementNS(svgNS, tag);
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, String(value)));
  return el;
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function round1(v) {
  return Number(v.toFixed(1));
}

function formatSigned(v) {
  return `${v > 0 ? "+" : ""}${v.toFixed(0)}°`;
}

function mapRange(value, inMin, inMax, outMin, outMax) {
  if (inMax === inMin) return outMin;
  const t = (value - inMin) / (inMax - inMin);
  return outMin + t * (outMax - outMin);
}

function polar(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx, cy, r, startDeg, endDeg) {
  const s = polar(cx, cy, r, endDeg);
  const e = polar(cx, cy, r, startDeg);
  const largeArcFlag = Math.abs(endDeg - startDeg) <= 180 ? "0" : "1";
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${e.x} ${e.y}`;
}

function getScaledSegments(fingerKey) {
  const scale = POPULATIONS[state.population].scale;
  const base = SEGMENT_BASE[fingerKey];
  const out = {};
  Object.entries(base).forEach(([k, v]) => {
    out[k] = round1(v * scale);
  });
  return out;
}

function ensureAngleDefaults() {
  Object.values(JOINTS).forEach((joint) => {
    joint.motions.forEach((motion) => {
      if (typeof state.angles[motion.id] !== "number") {
        state.angles[motion.id] = clamp(0, motion.min, motion.max);
      }
    });
  });
}

function renderFingerLegend() {
  dom.fingerLegend.innerHTML = "";
  Object.values(FINGERS).forEach((finger) => {
    const item = document.createElement("div");
    item.className = "legend-item";
    item.innerHTML = `<span class="legend-dot" style="background:${finger.color}"></span>${finger.nameZh} / ${finger.name}`;
    dom.fingerLegend.appendChild(item);
  });
}

function renderHand() {
  dom.handSvg.innerHTML = "";

  BONE_LINES.forEach(([from, to]) => {
    const a = JOINT_POINTS[from];
    const b = JOINT_POINTS[to];
    const line = createSvg("line", {
      x1: a.x,
      y1: a.y,
      x2: b.x,
      y2: b.y,
      class: from === "wrist" ? "bone palm" : "bone"
    });
    dom.handSvg.appendChild(line);
  });

  Object.values(JOINTS).forEach((joint) => {
    const p = JOINT_POINTS[joint.id];
    const finger = FINGERS[joint.finger];

    const node = createSvg("circle", {
      cx: p.x,
      cy: p.y,
      r: 10,
      fill: finger.color,
      class: `joint-node ${state.activeJoint === joint.id ? "active" : ""}`,
      "data-joint-id": joint.id,
      tabindex: 0,
      role: "button",
      "aria-label": `${joint.labelZh} ${joint.abbr}`
    });

    node.addEventListener("click", () => {
      state.activeJoint = joint.id;
      renderExplorer();
    });

    node.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        state.activeJoint = joint.id;
        renderExplorer();
      }
    });

    dom.handSvg.appendChild(node);

    const text = createSvg("text", {
      x: p.x + 12,
      y: p.y - 12,
      class: "joint-label"
    });
    text.textContent = joint.abbr;
    dom.handSvg.appendChild(text);
  });

  const wristLabel = createSvg("text", {
    x: JOINT_POINTS.wrist.x - 24,
    y: JOINT_POINTS.wrist.y + 28,
    class: "joint-label"
  });
  wristLabel.textContent = "RC/WRIST";
  dom.handSvg.appendChild(wristLabel);
}

function renderJointHeader(joint) {
  const finger = FINGERS[joint.finger];
  dom.jointTitle.textContent = `${joint.labelZh} · ${joint.abbr}`;
  dom.jointMeta.textContent = `${joint.fullName} ｜ ${finger.nameZh} ｜ ${joint.type} ｜ DOF ${joint.dof} ｜ ${POPULATIONS[state.population].label}`;
}

function buildGauge(motion, value) {
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", "0 0 220 110");
  svg.setAttribute("class", "gauge");

  const start = -120;
  const end = 120;
  const cx = 110;
  const cy = 96;
  const r = 72;

  const theta = mapRange(value, motion.min, motion.max, start, end);

  const track = createSvg("path", {
    d: arcPath(cx, cy, r, start, end),
    class: "track"
  });

  const active = createSvg("path", {
    d: arcPath(cx, cy, r, start, theta),
    class: "active"
  });

  svg.append(track, active);

  if (motion.min < 0 && motion.max > 0) {
    const neutralTheta = mapRange(0, motion.min, motion.max, start, end);
    const from = polar(cx, cy, r - 18, neutralTheta);
    const to = polar(cx, cy, r + 3, neutralTheta);
    svg.append(
      createSvg("line", {
        x1: from.x,
        y1: from.y,
        x2: to.x,
        y2: to.y,
        class: "neutral"
      })
    );
  }

  const tip = polar(cx, cy, r + 2, theta);
  const from = polar(cx, cy, r - 20, theta);
  svg.append(
    createSvg("line", {
      x1: from.x,
      y1: from.y,
      x2: tip.x,
      y2: tip.y,
      class: "pointer"
    })
  );

  return svg;
}

function renderMotionControls(joint) {
  dom.motionControls.innerHTML = "";

  joint.motions.forEach((motion) => {
    const card = document.createElement("div");
    card.className = "motion-card";

    const value = state.angles[motion.id];

    const top = document.createElement("div");
    top.className = "motion-top";

    const left = document.createElement("div");
    left.className = "motion-name";
    left.textContent = `${motion.nameZh} (${motion.name})`;

    const right = document.createElement("div");
    right.className = "motion-value";
    right.textContent = formatSigned(value);

    top.append(left, right);
    card.appendChild(top);
    card.appendChild(buildGauge(motion, value));

    const row = document.createElement("div");
    row.className = "range-row";

    const minEl = document.createElement("span");
    minEl.textContent = `${motion.min}°`;

    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = String(motion.min);
    slider.max = String(motion.max);
    slider.value = String(value);
    slider.step = "1";
    slider.addEventListener("input", (event) => {
      const next = Number(event.target.value);
      state.angles[motion.id] = clamp(next, motion.min, motion.max);
      renderMotionControls(joint);
    });

    const maxEl = document.createElement("span");
    maxEl.textContent = `${motion.max}°`;

    row.append(minEl, slider, maxEl);
    card.appendChild(row);
    dom.motionControls.appendChild(card);
  });
}

function renderSegmentSummary(joint) {
  const segments = getScaledSegments(joint.finger);
  const values = Object.values(segments);
  const max = Math.max(...values);

  dom.segmentSummary.innerHTML = "";

  Object.entries(segments).forEach(([segmentKey, value]) => {
    const row = document.createElement("div");
    row.className = "seg-row";

    const name = document.createElement("div");
    name.className = "seg-name";
    name.textContent = SEGMENT_LABELS[segmentKey];

    const track = document.createElement("div");
    track.className = "seg-track";

    const fill = document.createElement("div");
    fill.className = "seg-fill";
    fill.style.width = `${(value / max) * 100}%`;
    track.appendChild(fill);

    const mm = document.createElement("div");
    mm.className = "seg-mm";
    mm.textContent = `${value.toFixed(1)} mm`;

    row.append(name, track, mm);
    dom.segmentSummary.appendChild(row);
  });

  const total = round1(values.reduce((sum, current) => sum + current, 0));
  const note = document.createElement("div");
  note.className = "total-box";
  note.textContent = `Total: ${total.toFixed(1)} mm (${POPULATIONS[state.population].label})`;
  dom.segmentSummary.appendChild(note);

  if (joint.note) {
    const tip = document.createElement("div");
    tip.className = "note";
    tip.textContent = `说明: ${joint.note}`;
    dom.segmentSummary.appendChild(tip);
  }
}

function renderExplorer() {
  const joint = JOINTS[state.activeJoint];
  renderHand();
  renderJointHeader(joint);
  renderMotionControls(joint);
  renderSegmentSummary(joint);
}

function renderLengthsTable() {
  const rows = Object.values(FINGERS).map((finger) => {
    const s = getScaledSegments(finger.key);
    const total = round1(Object.values(s).reduce((acc, current) => acc + current, 0));
    return {
      finger,
      ...s,
      total
    };
  });

  const html = [
    `<table>
      <thead>
        <tr>
          <th>Finger</th>
          <th class="mono">MC</th>
          <th class="mono">PP</th>
          <th class="mono">MP</th>
          <th class="mono">DP</th>
          <th class="mono">Total</th>
        </tr>
      </thead>
      <tbody>`
  ];

  rows.forEach((row) => {
    html.push(`<tr>
      <td style="color:${row.finger.color};font-weight:600;">${row.finger.nameZh} / ${row.finger.name}</td>
      <td class="mono">${row.mc?.toFixed(1) ?? "-"}</td>
      <td class="mono">${row.pp?.toFixed(1) ?? "-"}</td>
      <td class="mono">${row.mp?.toFixed(1) ?? "-"}</td>
      <td class="mono">${row.dp?.toFixed(1) ?? "-"}</td>
      <td class="mono">${row.total.toFixed(1)}</td>
    </tr>`);
  });

  html.push(`</tbody></table>`);

  html.push(
    `<p class="note">当前视图：${POPULATIONS[state.population].label}。长度单位为 mm，显示到 0.1 mm。</p>`
  );

  dom.lengthTableWrap.innerHTML = html.join("\n");
}

function renderNamingTables() {
  const jointHeader = `<table>
    <thead>
      <tr>
        <th>缩写</th>
        <th>英文全称</th>
        <th>中文</th>
        <th>类型</th>
        <th>DOF</th>
        <th>备注</th>
      </tr>
    </thead>
    <tbody>`;

  const jointRows = JOINT_NAMING_ROWS.map(
    (row) => `<tr>
      <td class="mono">${row[0]}</td>
      <td>${row[1]}</td>
      <td>${row[2]}</td>
      <td>${row[3]}</td>
      <td class="mono">${row[4]}</td>
      <td>${row[5]}</td>
    </tr>`
  ).join("\n");

  dom.jointNamingTable.innerHTML = `${jointHeader}${jointRows}</tbody></table>`;

  const angleHeader = `<table>
    <thead>
      <tr>
        <th>术语</th>
        <th>中文</th>
        <th>缩写</th>
        <th>定义</th>
        <th>正方向约定</th>
      </tr>
    </thead>
    <tbody>`;

  const angleRows = ANGLE_NAMING_ROWS.map(
    (row) => `<tr>
      <td>${row[0]}</td>
      <td>${row[1]}</td>
      <td class="mono">${row[2]}</td>
      <td>${row[3]}</td>
      <td>${row[4]}</td>
    </tr>`
  ).join("\n");

  dom.angleNamingTable.innerHTML = `${angleHeader}${angleRows}</tbody></table>`;
}

function bindTabs() {
  dom.tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.dataset.tab;
      dom.tabButtons.forEach((b) => b.classList.toggle("active", b === button));
      dom.tabPanels.forEach((panel) => panel.classList.toggle("active", panel.id === `tab-${tab}`));
    });
  });
}

function bindPopulationSwitch() {
  dom.populationSelect.value = state.population;
  dom.populationSelect.addEventListener("change", (event) => {
    state.population = event.target.value;
    renderExplorer();
    renderLengthsTable();
  });
}

function init() {
  ensureAngleDefaults();
  renderFingerLegend();
  renderExplorer();
  renderLengthsTable();
  renderNamingTables();
  bindTabs();
  bindPopulationSwitch();
}

init();
