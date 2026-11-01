import { useState } from "react";
import { BlockEditor } from "./components/BlockEditor";
import "./App.css";

// Outside the component so the reference stays stable between renders
const TOOLBOX = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Izpis",
      colour: "160",
      contents: [
        { kind: "block", type: "text_print" },
        { kind: "block", type: "text" },
        { kind: "block", type: "text_join" },
      ],
    },
    {
      kind: "category",
      name: "Števila",
      colour: "230",
      contents: [
        { kind: "block", type: "math_number" },
        { kind: "block", type: "math_arithmetic" },
      ],
    },
    {
      kind: "category",
      name: "Logika",
      colour: "210",
      contents: [
        { kind: "block", type: "controls_if" },
        { kind: "block", type: "logic_compare" },
        { kind: "block", type: "logic_boolean" },
      ],
    },
    {
      kind: "category",
      name: "Zanke",
      colour: "120",
      contents: [
        {
          kind: "block",
          type: "controls_repeat_ext",
          inputs: { TIMES: { shadow: { type: "math_number", fields: { NUM: 3 } } } },
        },
        { kind: "block", type: "controls_whileUntil" },
      ],
    },
    { kind: "category", name: "Spremenljivke", colour: "330", custom: "VARIABLE" },
  ],
};

export default function App() {
  const [code, setCode] = useState("");
  const [json, setJson] = useState(null);

  return (
    <div className="layout">
      <BlockEditor
        className="editor"
        toolbox={TOOLBOX}
        onCodeChange={setCode}
        onJsonChange={setJson}
      />
      <aside className="side">
        <h3>Generirana JS koda</h3>
        <pre>{code || "// Sestavi bloke …"}</pre>
        <h3>JSON</h3>
        <pre>{json ? JSON.stringify(json, null, 2) : "—"}</pre>
      </aside>
    </div>
  );
}