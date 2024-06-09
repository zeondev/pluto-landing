function test(item, callback) {
  try {
    var result = callback();
  } catch (e) {
    alert(item + " failed : " + e + "\n\n" + e.stack);
  }

  var str = "";

  console.log(result);
  if (result === true) {
    str = "Passed:";
  } else {
    str = "Failed:";
  }

  document.getElementById("log").innerHTML += str + " " + item + "\n";
}

// document.getElementById("gobutton").addEventListener("click"

window.addEventListener("load", function () {
  try {
    test("async", function () {
      var isAsync = true;

      try {
        eval("async () => {}");
      } catch (e) {
        if (e instanceof SyntaxError) isAsync = false;
        else throw e; // throws CSP error
      }
      return isAsync;
    });
    test("let", function () {
      var result = eval("function h(){let x = true;return x};h()");
      if (result == true) {
        return result;
      }
    });
    test("const", function () {
      var result = eval("function h(){const x = true;return x};h()");
      if (result == true) {
        return result;
      }
    });
    test("array", function () {
      var result = eval(document.getElementById("arrayCode").innerText);
      if (result == true) {
        return result;
      }
    });
    test("WebSocket", function () {
      if ("WebSocket" in window) {
        return true;
      } else return false;
    });
    test("WeakSet", function () {
      if ("WeakSet" in window) {
        return true;
      } else return false;
    });
    test("querySelector", function () {
      if ("querySelector" in document) {
        // test querySelector
        var elm = document.body.querySelector("p#H");
        if (elm != null) {
          return true;
        }
        return false;
      } else return false;
    });
    test("fetch", function () {
      if ("fetch" in window) {
        return true;
      } else return false;
    });
    test("import", function () {
      var isImportSupported = true;

      try {
        new Function("import('data:,a')");
      } catch (e) {
        if (e instanceof SyntaxError) isImportSupported = false;
        else throw e; // throws CSP error
      }
      return isImportSupported;
    });
    test("maps", function () {
      if ("Map" in window) {
        return true;
      } else return false;
    });
  } catch (e) {
    alert("oops " + e + "\n\n" + e.stack);
  }
});
