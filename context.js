var Ctx = {
  main: function main() {
    // Add some favorite functions to the top level
    window.edit = Ctx.Core.edit;
    window.view = Ctx.Core.view;
    window.save = Ctx.Core.save;
  },
  Core: {
    "help": function () {

    },
    "stringify": function stringify(obj, prop) {
      //https://gist.github.com/cowboy/3749767
      var placeholder = '____PLACEHOLDER____';
      var fns = [];
      var json = JSON.stringify(obj, function (key, value) {
        if (typeof value === 'function') {
          fns.push(value);
          return placeholder;
        }
        return value;
      }, 2);
      json = json.replace(new RegExp('"' + placeholder + '"', 'g'), function (_) {
        return fns.shift();
      });
      return prop + ' = ' + json + ';';
    },
    "save": async function save() {
      this.handler = this.handler || await window.showSaveFilePicker();
      const writableStream = await handle.createWritable();
      await writableStream.write(contentBlob);
      await writableStream.close();
    },
    "view": function view(fn) {
      console.log(fn.toString());
    },
    "edit": function edit(fn) {
      console.log(`Item copied to the clipboard`);
      copy(fn.toString());
      // debugger;
    }
  }
};
Ctx.main();