# Chemical

One chemical is just an Object structure:

    {
      // ... properties
    }

## abstract Chemical

### constructor function Chemical(data)

Every property of data object if present will be copied over the Chemical object.

    var c = new Chemical({
      property: "value"
    })

    console.log(c.property) // "value"
