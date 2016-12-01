before(function storageMock() {
  var storage = {};

  return {
    setItem: function(key, value) {
      storage[key] = value || '';
    },
    getItem: function(key) {
      return storage[key] || null;
    },
    removeItem: function(key) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: function(i) {
      var keys = Object.keys(storage);
      return keys[i] || null;
    }
  };
  // mock the localStorage
  window.localStorage = storageMock();
  // mock the sessionStorage
  window.sessionStorage = storageMock();
});

describe("localStorage",function () {
  it("should set a variable to the local storage and retrieve the same", function () {
    var foo = [{hi: "hello"},{
      bar: "baz",
      1: 2
    }]
    setLocal('foo', foo);
    var res = getLocal('foo')

    chai.assert.equal(_.isEqual(res,foo), true)
  })
})
