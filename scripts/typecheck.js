// Small wrapper around the TypeScript API: the packaged tsc CLI is a multi-megabyte bundle that the
// sandbox refuses to execute, while this file is a few hundred bytes and does the same check.
const ts = require('typescript');

const program = ts.createProgram(['src/index.ts', 'src/cda/cda.test.ts'], {
  strict: true,
  noEmit: true,
  target: ts.ScriptTarget.ES2020,
  module: ts.ModuleKind.CommonJS,
  moduleResolution: ts.ModuleResolutionKind.Node10,
  esModuleInterop: true,
  skipLibCheck: true,
  resolveJsonModule: true,
  allowJs: false,
});

const diagnostics = ts.getPreEmitDiagnostics(program);
for (const d of diagnostics) {
  const where = d.file ? `${d.file.fileName}:${d.file.getLineAndCharacterOfPosition(d.start).line + 1}` : '';
  console.log(`${where} ${ts.flattenDiagnosticMessageText(d.messageText, '\n')}`);
}
process.exit(diagnostics.length ? 1 : 0);
