var Context = {
  HTML: {
    "tag": (tagName, attributes, children) => '<' + tagName + '>' + children.join('') + '</' + tagName + '>'
  },
  Core: {
    "help": function () {
      // TODO: return some notes. possibly interactive with state being saved to help
    },
    "stringify": function stringify(obj) {
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
      return json;
    },
    "save": async function save() {
      this.handler = this.handler || await window.showSaveFilePicker();
      var contentBlob = Context.Core.stringify(Context);
      var tag = Context.HTML.tag;
      var htmlPage = tag('html', [],
        [tag('head', [], [
          
        ]
        ),
        tag('body', [], []),
		tag('script', [], ['\nvar Context = ' + contentBlob + '\nContext.main();\n'])
        ]
      );
      const writableStream = await this.handler.createWritable();
      await writableStream.write(htmlPage);
      await writableStream.close();
    },
    "view": function view(fn) {
      // console.log(fn.toString());
      return fn.toString();
    },
    "edit": function edit(fn) {
      copy(fn.toString());
      console.log(`Item copied to the clipboard`);
      // debugger;
    },
    "renderTemplate": function render(templateSelector, targetSelector, model) {

    }
  },
  main: function main() {
    // Add some favorite functions to the top level
    window.edit = Context.Core.edit;
    window.view = Context.Core.view;
    window.save = Context.Core.save;
	
	// init the app
	var tag = Context.HTML.tag;
	document.body.innerHTML = tag("h1", {}, ["Welcome"]);
  },
};
Context.main();