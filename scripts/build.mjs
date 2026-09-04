// Vinext beta calls process.exit immediately after prerender disposal. On
// Windows, allow pending libuv handle close callbacks to drain naturally.
// Preserve all exit codes: this does not turn build failures into successes.
if (process.platform === 'win32') {
  process.exit = (code = 0) => {
    process.exitCode = Number(code);
  };
}
process.argv = [process.argv[0], process.argv[1], 'build'];
await import('../node_modules/vinext/dist/cli.js');
