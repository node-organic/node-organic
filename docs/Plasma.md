# Plasma

The plasma has main purpose in transmitting Chemicals between Organelles and within the Cell itself.

    var plasma = new Plasma()
    plasma.on(chemicalPattern, reactionFn)
    plasma.off(chemicalPattern, reactionFn)
    plasma.once(chemicalPattern, reactionFn)
    plasma.emit(chemical)

## abstract Plasma

### constructor function Plasma()

Should implement construction and building logic of Plasma instance.

### function on(chemicalPattern, reactionFn)

Should implement logic for registering reaction functions capable to handle chemicals by given pattern.

* `chemicalPattern` - pattern for matching chemical(s)
* `reactionFn` - reaction function upon matched chemical(s)

### function off(chemicalPattern, reactionFn)

Should implement logic for unregistering reaction functions previously registered with respective chemicalPattern.

### function once(chemicalPattern, reactionFn)

Should implement the same logic as `function on(...)` with the important difference that `reactionFn` function should be invoked only once and then unregistered.

### function emit(chemical)

Should implement logic for trasmitting and delivering chemical(s) to registered reaction functions matched by their respective patterns.

* `chemical` is expected to implement [Chemical](./Chemical.md).

#### action <-> feedback

Nature's pattern for feedback and results delivery for organelles is based on emitting back a different chemical eg (over-simplified):

```
// worker organelle
plasma.on(doWorkPattern, function (doWorkChemical) {
  // do work with chemical
  plasma.emit(doWorkResultsChemical)
})

// cell
// register worker organelle results feedback
plasma.on(doWorkResultsChemical, function (resultsChemical) {

})
// engage action on worker organelle
plasma.emit(doWorkChemical)
```

However with increase in algorithmic complexity of implementations such can be shortened to be developer-friendly to its abstract form in code implementations:

##### via callbacks

```
// worker organelle
plasma.on(doWorkPattern, function (doWorkChemical, doneCallback) {
  // do work with chemical
  doneCallback(null, doWorkResults)
})

// cell
// engage action on worker organelle
plasma.emit(doWorkChemical, function (err, results) {

})
```

##### via promises

```
// worker organelle
plasma.on(doWorkPattern, function (doWorkChemical) {
  // do work with chemical
  return doWorkResultsPromise
})

// cell
// engage action on worker organelle
var doWorkResultsPromise = plasma.emit(doWorkChemical)
```
