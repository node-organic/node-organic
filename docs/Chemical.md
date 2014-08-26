# Chemical

One chemical has this generalized structure

    {
      type: String,
      // ...
      reference: Object,
      // ...
      property: Value
      // ...
      function: Function(also an Object or Class)
    }

## abstract Chemical

### constructor function Chemical(data)

Every property of data object if present will be copied over the Chemical object.

    var c = new Chemical({
      property: "value"
    })

    console.log(c.property) // "value"