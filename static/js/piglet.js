(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const profileSpecs = {
    solo: { cpu: 2, memory: 4, label: { en: "Solo Dev", zh: "个人开发" } },
    team: { cpu: 4, memory: 8, label: { en: "Team Space", zh: "团队空间" } },
    production: { cpu: 8, memory: 16, label: { en: "Production", zh: "生产节点" } },
  };

  const outputFiles = {
    yaml: "pigsty.yml",
    install: "install.sh",
    services: "services.txt",
  };

  const translations = {
    en: {
      valid: "VALID CONFIG",
      invalid: "CHECK INPUT",
      copied: "Copied",
      copy: "Copy",
      downloaded: "Downloaded",
      download: "Download",
      capabilities: "capabilities",
      node: "node",
      hint: "review it, then deploy",
      badHost: "Use an IPv4 address or a valid host name.",
      badDomain: "Use a valid domain name.",
    },
    zh: {
      valid: "配置有效",
      invalid: "请检查输入",
      copied: "已复制",
      copy: "复制",
      downloaded: "已下载",
      download: "下载",
      capabilities: "个能力",
      node: "台主机",
      hint: "审阅后即可部署",
      badHost: "请输入 IPv4 地址或有效主机名。",
      badDomain: "请输入有效域名。",
    },
  };

  /* ------------------------------------------------------------ highlight */

  const escapeHtml = (value) =>
    String(value).replace(/[&<>]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[character]));

  const wrap = (token, value) => `<span class="${token}">${escapeHtml(value)}</span>`;

  const patterns = {
    yaml: /(^[ \t]*#.*$)|('[^'\n]*')|("[^"\n]*")|(^[ \t]*(?:-[ \t]+)?[A-Za-z_][\w./-]*(?=:))|(?:([{,][ \t]*)([A-Za-z_][\w./-]*)(?=:))|(\btrue\b|\bfalse\b|\bnull\b|\bnone\b)|(\b\d+(?:\.\d+)?\b)|([{}[\],])/gm,
    install: /(^[ \t]*#.*$)|('[^'\n]*')|("[^"\n]*")|(\$\{?[A-Za-z_][\w]*\}?)|(^(?:curl|cd|echo|set|\.\/[\w.-]+))/gm,
    services: /(^PIGLET RUNTIME.*$)|(^=+$)|((?:postgres|https?):\/\/\S+)|(^\/\S+)/gm,
  };

  const tokenizers = {
    yaml: (match) => {
      if (match[1]) return wrap("y-comment", match[1]);
      if (match[2] || match[3]) return wrap("y-str", match[2] || match[3]);
      if (match[4]) return wrap("y-key", match[4]);
      if (match[6]) return wrap("y-punct", match[5]) + wrap("y-key", match[6]);
      if (match[7]) return wrap("y-bool", match[7]);
      if (match[8]) return wrap("y-num", match[8]);
      return wrap("y-punct", match[9]);
    },
    install: (match) => {
      if (match[1]) return wrap("y-comment", match[1]);
      if (match[2] || match[3]) return wrap("y-str", match[2] || match[3]);
      if (match[4]) return wrap("y-num", match[4]);
      return wrap("y-key", match[5]);
    },
    services: (match) => {
      if (match[1]) return wrap("y-key", match[1]);
      if (match[2]) return wrap("y-punct", match[2]);
      if (match[3]) return wrap("y-str", match[3]);
      return wrap("y-num", match[4]);
    },
  };

  function highlight(text, kind) {
    const pattern = patterns[kind];
    const tokenize = tokenizers[kind];
    if (!pattern || !tokenize) return escapeHtml(text);
    pattern.lastIndex = 0;
    let html = "";
    let cursor = 0;
    let match;
    while ((match = pattern.exec(text)) !== null) {
      if (match[0] === "") { pattern.lastIndex += 1; continue; }
      html += escapeHtml(text.slice(cursor, match.index)) + tokenize(match);
      cursor = match.index + match[0].length;
    }
    return html + escapeHtml(text.slice(cursor));
  }

  const checked = (form, name) => Boolean(form.elements[name]?.checked);

  function radioValue(form, name) {
    const field = form.elements[name];
    if (typeof RadioNodeList !== "undefined" && field instanceof RadioNodeList) return field.value;
    return field?.value || "";
  }

  function cleanToken(value) {
    return String(value || "").trim().replace(/[\r\n\t]/g, "");
  }

  function validIPv4(value) {
    const parts = value.split(".");
    return parts.length === 4 && parts.every((part) => /^\d{1,3}$/.test(part) && Number(part) <= 255);
  }

  function validHost(value) {
    if (validIPv4(value)) return true;
    return /^(?=.{1,253}$)(?!-)[a-z0-9-]{1,63}(?<!-)(?:\.(?!-)[a-z0-9-]{1,63}(?<!-))*$/i.test(value);
  }

  function validDomain(value) {
    return /^(?=.{1,253}$)(?!-)[a-z0-9-]{1,63}(?<!-)(?:\.(?!-)[a-z0-9-]{1,63}(?<!-))+$/i.test(value);
  }

  function readState(form) {
    return {
      profile: radioValue(form, "profile") || "solo",
      adminIp: cleanToken(form.elements.admin_ip.value),
      domain: cleanToken(form.elements.domain.value).toLowerCase(),
      region: form.elements.region.value,
      pgVersion: form.elements.pg_version.value,
      workload: form.elements.workload.value,
      workspace: form.elements.workspace.value,
      claude: checked(form, "claude"),
      code: checked(form, "code"),
      jupyter: checked(form, "jupyter"),
      grafana: checked(form, "grafana"),
      juicefs: checked(form, "juicefs"),
      minio: checked(form, "minio"),
    };
  }

  function extensionBundles(state) {
    const version = state.pgVersion;
    const base = [`pg${version}-main`, `pg${version}-feat`, `pg${version}-util`, `pg${version}-admin`, `pg${version}-stat`];
    const workload = {
      oltp: [`pg${version}-time`, `pg${version}-gis`, `pg${version}-rag`, `pg${version}-fts`],
      rag: [`pg${version}-rag`, `pg${version}-fts`, `pg${version}-gis`],
      olap: [`pg${version}-olap`, `pg${version}-etl`, `pg${version}-fdw`],
      tiny: [`pg${version}-feat`],
    }[state.workload];
    return [...new Set([...base, ...workload])];
  }

  function databaseExtensions(state) {
    const workload = {
      oltp: ["postgis", "timescaledb", "vector"],
      rag: ["vector", "pg_search"],
      olap: ["pg_duckdb", "pg_parquet"],
      tiny: ["vector"],
    }[state.workload];
    return workload;
  }

  function packageList(state) {
    const packages = ["openssh-server", "restic", "rclone", "uv", "opencode", "golang", "asciinema", "genai-toolbox", "postgrest"];
    if (state.claude) packages.push("claude");
    if (state.code) packages.push("code-server");
    if (state.juicefs) packages.push("juicefs");
    return packages;
  }

  function yamlOutput(state) {
    const profile = profileSpecs[state.profile] || profileSpecs.solo;
    const host = state.adminIp || "10.10.10.10";
    const tuning = { oltp: "oltp", rag: "oltp", olap: "olap", tiny: "tiny" }[state.workload];
    const workspace = state.juicefs ? state.workspace : "/data";
    const pgLibs = state.workload === "oltp"
      ? "timescaledb, pg_stat_statements, auto_explain, pg_wait_sampling"
      : "pg_stat_statements, auto_explain, pg_wait_sampling";
    const packages = packageList(state).join(", ");
    const extensions = extensionBundles(state).join(", ");
    const databaseExt = databaseExtensions(state).join(", ");
    const minio = state.minio
      ? `\n    minio: { hosts: { ${host}: { minio_seq: 1 } }, vars: { minio_cluster: minio } }`
      : "";
    const juice = state.juicefs
      ? `\n    juice_instances:\n      jfs:\n        path: ${workspace}\n        meta: postgres://dbuser_meta:DBUser.Meta@${host}:5432/meta\n        data: --storage postgres --bucket ${host}:5432/meta --access-key dbuser_meta --secret-key DBUser.Meta\n        port: 9567`
      : "";

    return `---
# Generated by piglet.run Config Studio
# Profile: ${state.profile} (${profile.cpu}C / ${profile.memory}G)
# Review passwords and network policy before deployment.

all:
  children:
    infra: { hosts: { ${host}: { infra_seq: 1 } }, vars: { repo_enabled: false } }
    etcd:  { hosts: { ${host}: { etcd_seq: 1 } }, vars: { etcd_cluster: etcd } }
    pgsql: { hosts: { ${host}: { pg_seq: 1, pg_role: primary } }, vars: { pg_cluster: pgsql } }${minio}

  vars:
    admin_ip: ${host}
    region: ${state.region}
    infra_portal:
      home: { domain: ${state.domain || "piglet.local"} }
    dns_enabled: false
    infra_extra_services:
${state.code ? "      - { name: Code Server, url: '/code', desc: 'VS Code Server', icon: 'code' }\n" : ""}${state.jupyter ? "      - { name: Jupyter, url: '/jupyter', desc: 'Jupyter Notebook', icon: 'jupyter' }\n" : ""}${state.claude && state.grafana ? "      - { name: Claude Code, url: '/ui/d/claude-code', desc: 'Claude Observability', icon: 'claude' }\n" : ""}    nodename_overwrite: false
    node_tune: ${tuning}
    node_dns_method: none
    node_repo_modules: node,infra,pgsql
    node_packages: [ ${packages} ]
    docker_enabled: true

    pg_version: ${state.pgVersion}
    pg_conf: ${tuning}.yml
    pg_packages: [ pgsql-main, patroni, pgbackrest, pg_exporter, pgbackrest_exporter ]
    pg_extensions: [ ${extensions} ]
    pg_databases:
      - { name: meta, baseline: cmdb.sql, schemas: [pigsty], extensions: [ ${databaseExt} ] }
    pg_libs: '${pgLibs}'
    pgbackrest_exporter_enabled: false
    pg_default_services: []

    code_enabled: ${state.code}
    jupyter_enabled: ${state.jupyter}
    claude_enabled: ${state.claude}
    vibe_data: ${workspace}${juice}
`;
  }

  function installOutput(state) {
    const optional = [state.juicefs && "./juice.yml", (state.code || state.jupyter || state.claude) && "./vibe.yml"].filter(Boolean);
    return `#!/usr/bin/env bash
set -euo pipefail

# Install Pigsty and enter the installation directory
curl -fsSL https://repo.pigsty.io/get | bash
cd "${"$"}{HOME}/pigsty"

# Replace pigsty.yml with the reviewed Config Studio output
./deploy.yml
${optional.join("\n") || "# No optional workspace playbooks selected"}

echo "Piglet runtime deployed on ${state.adminIp || "your host"}"
`;
  }

  function servicesOutput(state, lang) {
    const t = translations[lang];
    const services = [
      ["PostgreSQL", `postgresql://${state.adminIp}:5432/meta`, "always"],
      ["Pigsty Home", `https://${state.domain}/`, "always"],
      ["Grafana", `https://${state.domain}/ui/`, state.grafana],
      ["Code Server", `https://${state.domain}/code/`, state.code],
      ["JupyterLab", `https://${state.domain}/jupyter/`, state.jupyter],
      ["JuiceFS", state.workspace, state.juicefs],
      ["MinIO", `https://${state.domain}/minio/`, state.minio],
    ].filter(([, , enabled]) => enabled === true || enabled === "always");

    const width = Math.max(...services.map(([name]) => name.length));
    const rows = services.map(([name, endpoint]) => `${name.padEnd(width)}  ${endpoint}`).join("\n");
    const profile = profileSpecs[state.profile] || profileSpecs.solo;
    return `PIGLET RUNTIME / ${profile.label[lang].toUpperCase()}
${"=".repeat(48)}

${rows}

PostgreSQL ${state.pgVersion} · ${state.workload.toUpperCase()} · ${profile.cpu}C/${profile.memory}G
${t.hint}
`;
  }

  function validate(form, lang) {
    const t = translations[lang];
    const host = form.elements.admin_ip;
    const domain = form.elements.domain;
    const hostOkay = validHost(cleanToken(host.value));
    const domainOkay = validDomain(cleanToken(domain.value));

    host.setCustomValidity(hostOkay ? "" : t.badHost);
    domain.setCustomValidity(domainOkay ? "" : t.badDomain);
    host.toggleAttribute("aria-invalid", !hostOkay);
    domain.toggleAttribute("aria-invalid", !domainOkay);
    return hostOkay && domainOkay;
  }

  function initStudio(root) {
    const form = $("[data-config-form]", root);
    const output = $("[data-config-output]", root);
    const filename = $("[data-config-filename]", root);
    const status = $("[data-config-status]", root);
    const summary = $("[data-config-summary]", root);
    const hint = $("[data-config-hint]", root);
    const copyButton = $("[data-config-copy]", root);
    const downloadButton = $("[data-config-download]", root);
    const lang = root.dataset.lang === "zh" ? "zh" : "en";
    const t = translations[lang];
    let activeTab = "yaml";
    let currentOutput = "";

    const render = () => {
      const state = readState(form);
      const okay = validate(form, lang);
      const outputs = {
        yaml: yamlOutput(state),
        install: installOutput(state),
        services: servicesOutput(state, lang),
      };
      currentOutput = outputs[activeTab];
      output.innerHTML = highlight(currentOutput, activeTab);
      filename.textContent = outputFiles[activeTab];
      status.classList.toggle("is-invalid", !okay);
      $("span", status).textContent = okay ? t.valid : t.invalid;
      hint.textContent = okay ? t.hint : (lang === "zh" ? "修正高亮字段后再下载" : "fix the highlighted fields first");
      copyButton.disabled = !okay;
      downloadButton.disabled = !okay;
      const capabilityCount = [state.claude, state.code, state.jupyter, state.grafana, state.juicefs, state.minio].filter(Boolean).length;
      summary.textContent = lang === "zh"
        ? `${capabilityCount} ${t.capabilities} · 1 ${t.node}`
        : `${capabilityCount} ${t.capabilities} · 1 ${t.node}`;
    };

    form.addEventListener("input", render);
    form.addEventListener("change", render);
    form.addEventListener("reset", () => window.setTimeout(render, 0));

    $$("[data-config-tab]", root).forEach((tab) => {
      tab.addEventListener("click", () => {
        activeTab = tab.dataset.configTab;
        $$("[data-config-tab]", root).forEach((candidate) => candidate.setAttribute("aria-selected", String(candidate === tab)));
        render();
      });
    });

    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(currentOutput);
        $("span", copyButton).textContent = t.copied;
        window.setTimeout(() => { $("span", copyButton).textContent = t.copy; }, 1400);
      } catch (_error) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(output);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    });

    downloadButton.addEventListener("click", () => {
      const blob = new Blob([currentOutput], { type: "text/plain;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = outputFiles[activeTab];
      document.body.appendChild(link);
      downloadButton.dataset.downloaded = "true";
      $("span", downloadButton).textContent = t.downloaded;
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
      window.setTimeout(() => {
        delete downloadButton.dataset.downloaded;
        $("span", downloadButton).textContent = t.download;
      }, 1400);
    });

    render();
  }

  function initReveal() {
    const elements = $$('[data-reveal]');
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-revealed"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });
    elements.forEach((element) => observer.observe(element));
  }

  function initCommandCopy() {
    $$('[data-copy-command]').forEach((button) => {
      button.addEventListener("click", async () => {
        const terminal = button.closest(".piglet-terminal");
        const text = $("code", terminal).innerText
          .split("\n")
          .filter((line) => !line.trim().startsWith("#"))
          .map((line) => line.replace(/^\$\s*/, ""))
          .filter(Boolean)
          .join("\n");
        try {
          await navigator.clipboard.writeText(text);
          const label = $("[data-copy-label]", button);
          const previous = label ? label.textContent : "";
          button.classList.add("is-copied");
          if (label) label.textContent = label.dataset.copied || "copied";
          window.setTimeout(() => {
            button.classList.remove("is-copied");
            if (label) label.textContent = previous;
          }, 1400);
        } catch (_error) {
          button.title = text;
        }
      });
    });
  }

  function init() {
    $$("[data-config-studio]").forEach(initStudio);
    initReveal();
    initCommandCopy();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
