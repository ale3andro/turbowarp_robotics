Micro:bit Pin Usage Overview

----------------------------------------
| Pin | Function                  | Notes                |
|-----|---------------------------|--------------------|
| P0  | LED Column 3 / GPIO        | Also analog input  |
| P1  | LED Column 4 / GPIO        | Also analog input  |
| P2  | Free GPIO / Analog input   | Safe to use        |
| P3  | LED Column 0 / Button A    | Shared              |
| P4  | LED Column 1 / Button B    | Shared              |
| P10 | LED Column 2               |                      |
| P13 | LED Row 0                  |                      |
| P14 | LED Row 1                  |                      |
| P15 | LED Row 2                  |                      |
| P16 | LED Row 3                  |                      |
| P17 | LED Row 4                  |                      |
| P5  | Free GPIO                  |                      |
| P6  | Free GPIO                  |                      |
| P7  | Free GPIO                  |                      |
| P8  | Free GPIO                  |                      |
| P9  | Free GPIO                  |                      |
| P11 | Free GPIO                  |                      |
| P12 | Free GPIO                  |                      |
| P19 | Free GPIO                  |                      |
| P20 | Free GPIO / I2C SDA        |                      |
----------------------------------------

Other Notes:
- Buttons A/B are connected to P3 and P4 (shared with columns 0 and 1).  
- LEDs are multiplexed; manually driving these pins can conflict with display unless `display.off()` is called.  
- P2 is completely free and safe for GPIO, analog input, or PWM output.  
