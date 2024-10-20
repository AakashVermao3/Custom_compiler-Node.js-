const vm = require('vm');

function compileCode(code) {
    try {
        // Set up a sandbox environment
        const sandbox = {
            console: {
                log: (...args) => {
                    sandbox.output.push(args.join(' '));
                },
            },
            output: [],
            result: null,
        };

        vm.createContext(sandbox);

        // Run the code inside a VM script
        const script = new vm.Script(`
            result = (function() {
                ${code}
            })();
        `);

        script.runInContext(sandbox);

        // Return the output or the result of the last expression
        if (sandbox.output.length > 0) {
            return sandbox.output.join('\n');
        } else if (sandbox.result !== undefined) {
            return String(sandbox.result);
        } else {
            return 'No output';
        }
    } catch (err) {
        return `Error: ${err.message}`;
    }
}

module.exports = compileCode;
