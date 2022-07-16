var editor = CodeMirror.fromTextArea(document.getElementById("codeIDE"), {
  lineNumbers: true,
  extraKeys: { Tab: "autocomplete" },
  mode: { name: "javascript", globalVars: true },
  styleActiveLine: true,
  matchBrackets: true,
  autoCloseBrackets: true,
  scrollbarStyle: "simple",
  highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
});

if (typeof Promise !== "undefined") {
  var comp = [
    ["here", "hither"],
    ["asynchronous", "nonsynchronous"],
    ["completion", "achievement", "conclusion", "culmination", "expirations"],
    ["hinting", "advive", "broach", "imply"],
    ["function", "action"],
    ["provide", "add", "bring", "give"],
    ["synonyms", "equivalents"],
    ["words", "token"],
    ["each", "every"],
  ];
}

function synonyms(cm, option) {
  return new Promise(function (accept) {
    setTimeout(function () {
      var cursor = cm.getCursor(),
        line = cm.getLine(cursor.line);
      var start = cursor.ch,
        end = cursor.ch;
      while (start && /\w/.test(line.charAt(start - 1))) --start;
      while (end < line.length && /\w/.test(line.charAt(end))) ++end;
      var word = line.slice(start, end).toLowerCase();
      for (var i = 0; i < comp.length; i++)
        if (comp[i].indexOf(word) != -1)
          return accept({
            list: comp[i],
            from: CodeMirror.Pos(cursor.line, start),
            to: CodeMirror.Pos(cursor.line, end),
          });
      return accept(null);
    }, 100);
  });
}

editor.display.wrapper.className = "CodeMirror custom cm-s-" + themeName;
