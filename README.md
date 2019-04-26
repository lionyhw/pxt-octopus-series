# Octopus series Package
---

![](/icon.png/)
octopus electronic blocks  for micro:bit

# Hardware
---

[http://www.elecfreaks.com](http://www.elecfreaks.com "http://www.elecfreaks.com")

## Code Example
```JavaScript
input.onButtonPressed(Button.A, function () {
    basic.showNumber(octopus_output.octopus_Rotation(AnalogPin.P0))
})
input.onButtonPressed(Button.B, function () {
    octopus_output.octopus_LED(DigitalPin.P0, false)
})
input.onButtonPressed(Button.AB, function () {
    if (octopus_output.octopus_Photo_Interrupter(DigitalPin.P0, octopus_output.Photo_Sensor_state.Tracking_State_0)) {
        basic.showIcon(IconNames.Yes)
    }
})


```

## License
MIT

## Supported targets
for PXT/microbit (The metadata above is needed for package search.)

