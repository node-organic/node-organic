# Plasma

This is a Class(OOP) implementation with support of decorations/extensions/plugins. The plasma also has main purpose in transmitting Chemicals between Organelles and within the Cell itself.

    var plasma = new Plasma()
    plasma.on("ChemicalName", reactionFn)
    plasma.off("ChemicalName", reactionFn)
    plasma.once("ChemicalName", reactionFn)
    
    // ... any kind of plasma interaction can be achieved via applied on instance level decorations
    plasma.onAll("ChemicalName1", "ChemicalName2", reactionFn)

## abstract Plasma

### constructor function Plasma()

Should implement construction and building logic of Plasma instance.

### function on(chemicalPattern, reactionFn [, context])

Should implement logic for registering reaction functions capable to handle chemicals by given pattern.

* `chemicalPattern` is a value used to link emitted chemicals to their respective reaction functions. Current implementations assume chemicalPatterns as of having String, Object and/or Prototype values.
* `reactionFn` is expected to have the form of [Reaction function](./Reacitons.md#reactionfn)
* `context` argument is optional and is indicator that the `reactionFn` should be invoked with other than its own context.

### function off(chemicalPattern, reactionFn)

Should implement logic for unregistering reaction functions previously registered with respective chemicalPattern.

* `chemicalPattern` is expected to have the same value when `reactionFn` has been registered.
* `reactionFn` is expected to be the same `reactionFn` which has been previously registered.

### function once(chemicalPattern, reactionFn [, context])

Should implement the same logic as `function on(...)` with the important difference that `reactionFn` function should be invoked only once and then unregistered.

### function emit(chemical [, callback])

Should implement logic for trasmitting and delivering chemicals to registered reaction functions based on their respective patterns.

* `chemical` is expected to implement [Chemical](./Chemica.md).
* `callback` is optional and is expected to implement [reactionFn's callback form](./Reactions.md#reactionfn-callback).