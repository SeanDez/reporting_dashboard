
class JestCustomReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }
  
  onRunComplete(contexts, results) {
    console.log('Custom reporter output:');
    console.log('GlobalConfig: ', this._globalConfig);
    console.log('Options: ', this._options);
    console.log(`==========`);
    console.log(`==========`);
    console.log(`==========`);
    console.log(`==========`);
    console.log(`==========`);
  }
}

module.exports = JestCustomReporter;