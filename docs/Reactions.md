# Reactions

Reactions are operations performed over a chemical solution (one or more chemicals). 

## ReactionFn

Reaction function take the form:
    
    function reaction(c:Chemical(s) [, callback:Done]):void
    
## ReactionFn callback

Reaction `callback` is optional and having the following definition:
    
    function callback(error:Error/false, data:Chemical(s)):void

## ReactionFn contract and requirements

Reactions can be considered event handlers, with the passed chemical being the event itself. They are required to:

   * declare `done` as argument when reaction logic is asynchronious.
     * always invoke `done` once declared wither with `error` argument or with `false, data` arguments.
   * not to throw an exception.

A simple example reaction looks like the following:

    var divide = function (c, done) {
      if (c.b === 0) {
        return done(new Error("can not divide by zero"));
      }
      var result = c.a / c.b;
      done(false, result);
    }