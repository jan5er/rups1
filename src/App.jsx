import { useCallback, useEffect, useState } from "react";
import { BlockEditor } from "./components/BlockEditor";
import "./generator";
import { run } from "./interpreter";
import { TOOLBOX } from "./toolbox";
import "./App.css";

/** Prešteje resnične bloke (brez senčnih privzetih vrednosti). */
function countBlocks(json) {
  let n = 0;
  const walk = (b) => {
    if (!b) return;
    n++;
    for (const input of Object.values(b.inputs ?? {})) walk(input.block);
    walk(b.next?.block);
  };
  for (const b of json?.blocks?.blocks ?? []) walk(b);
  return n;
}

const time = () => new Date().toLocaleTimeString("sl-SI");

export default function App() {
  const [code, setCode] = useState("");
  const [json, setJson] = useState(null);
  const [result, setResult] = useState(null);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [tab, setTab] = useState("js");
  const [copied, setCopied] = useState(false);

  const blockCount = countBlocks(json);

  const handleRun = useCallback(() => {
    setResult({ ...run(json), at: time() });
    setConsoleOpen(true);
  }, [json]);

  // Ctrl + Enter = zaženi
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRun();
      }
      if (e.key === "Escape") setConsoleOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleRun]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {

    }
  };

  const failed = Boolean(result?.error);

  return (
    <div className="app">
      <header className="topbar" style={{ "justifyContent": "right" }}>

        <div className="topbar-actions">
          <button type="button" className="btn" onClick={() => setConsoleOpen((o) => !o)} aria-pressed={consoleOpen}>
            Konzola
          </button>
          <button type="button" className="btn primary" onClick={handleRun}>
            <span aria-hidden="true">▶</span> Zaženi
            <kbd>Ctrl ↵</kbd>
          </button>
        </div>
      </header>

      <main className="main">
        <section className="stage" aria-label="Delovni prostor z bloki">
          <BlockEditor className="editor" toolbox={TOOLBOX} onCodeChange={setCode} onJsonChange={setJson} />

          {blockCount === 0 && (
            <div className="empty" aria-hidden="true">
              <div className="empty-emoji">🧩</div>
              <p>Povleci bloke iz menija na levi in jih zloži sem</p>
            </div>
          )}  
          <div className={`drawer${consoleOpen ? " open" : ""}`} role="region" aria-label="Konzola" aria-hidden={!consoleOpen}>
            <div className="drawer-head">
              <span className="drawer-title">Konzola</span>
              {result && (
                <span className={`status ${failed ? "bad" : "good"}`}>
                  {failed ? "✕ Napaka" : "✓ Uspešno"} · {result.at}
                </span>
              )}
              <span className="spacer" />
              <button type="button" className="icon-btn" onClick={() => setResult(null)} title="Počisti">
                Počisti
              </button>
              <button type="button" className="icon-btn" onClick={() => setConsoleOpen(false)} aria-label="Zapri konzolo">
                ✕
              </button>
            </div>

            <div className="drawer-body">
              {!result && <p className="muted">Pritisni »Zaženi«, da se izpis prikaže tukaj.</p>}
              {result && (
                <>
                  {result.output.length === 0 && !failed && <p className="muted">Program ni nič izpisal.</p>}
                  {result.output.map((line, i) => (
                    <div className="line" key={i}>
                      <span className="ln">{i + 1}</span>
                      <span className="txt">{line}</span>
                    </div>
                  ))}
                  {failed && (
                    <div className="line err">
                      <span className="ln">!</span>
                      <span className="txt">{result.error}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>

        <aside className="side">
          <div className="tabs" role="tablist">
            <button type="button" role="tab" aria-selected={tab === "js"} className={tab === "js" ? "on" : ""} onClick={() => setTab("js")}>
              JavaScript
            </button>
            <button type="button" role="tab" aria-selected={tab === "json"} className={tab === "json" ? "on" : ""} onClick={() => setTab("json")}>
              JSON
            </button>
          </div>

          <div className="panel">
            {tab === "js" ? (
              <>
                <p className="hint">Tako bi bili tvoji bloki videti kot prava koda!</p>
                <pre className="code">{code.trim() || "// Povleci bloke v delovni prostor …"}</pre>
                <button type="button" className="btn small" onClick={copy} disabled={!code.trim()}>
                  {copied ? "Kopirano ✓" : "Kopiraj kodo"}
                </button>
              </>
            ) : (
              <>
                <p className="hint">Serializirana oblika blokov, iz katere interpreter izvede program.</p>
                <pre className="code">{json ? JSON.stringify(json, null, 2) : "—"}</pre>
              </>
            )}
          </div>

          <footer className="stats">
            <div>
              <strong>{blockCount}</strong>
              <span>blokov</span>
            </div>
            <div>
              <strong>{result ? result.output.length : 0}</strong>
              <span>vrstic izpisa</span>
            </div>
          </footer>
        </aside>
      </main>
    </div>
  );
}