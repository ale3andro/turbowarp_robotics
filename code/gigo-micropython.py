from microbit import *

# Initialize UART over USB
uart.init(baudrate=115200)

# Main loop
while True:
    if uart.any():
        raw = uart.read()
        if raw:
            command = raw.decode('utf-8').strip()
            cmd = command[:3]
            arg0 = command[4:5]
            arg1 = command[6:7]
            arg2 = command[8:11]
            if cmd == "LED":
                if (int(arg0)>=0 and int(arg0)<=4 and int(arg1)>=0 and int(arg1)<=4):
                    display.set_pixel(int(arg0), int(arg1), 9 if arg2=='on' else 0)
            elif cmd == "CLS":
                display.clear()
            elif cmd == "LEX":
                if (arg0 == "B"):
                    pin14.write_digital(int(arg1))
                if (arg0 == "C"):
                    pin2.write_digital(int(arg1))
                if (arg0 == "D"):
                    pin8.write_digital(int(arg1))
                if (arg0 == "E"):
                    pin15.write_digital(int(arg1))
                if (arg0 == "F"):
                    pin13.write_digital(int(arg1))
                if (arg0 == "G"):
                    pin12.write_digital(int(arg1))
                if (arg0 == "H"):
                    pin1.write_digital(int(arg1))
            elif cmd == "MOT":
                direction = 0
                if (arg1 == "1"):
                    direction = 1023
                if (arg0 == "E"):
                    pin15.write_analog(direction)
                    pin16.write_analog(int(arg2))
                if (arg0 == "F"):
                    pin13.write_analog(direction)
                    pin14.write_analog(int(arg2))
                if (arg0 == "G"):
                    pin12.write_analog(direction)
                    pin2.write_analog(int(arg2))
                if (arg0 == "H"):
                    pin1.write_analog(direction)
                    pin8.write_analog(int(arg2))
            elif cmd == "SRV":
                pulse = int(26 + (int(arg2) / 180) * (128 - 26))
                if (arg0 == "B"):
                    pin14.set_analog_period(20)
                    pin14.write_analog(pulse)
                if (arg0 == "C"):
                    pin2.set_analog_period(20)
                    pin2.write_analog(pulse)
                if (arg0 == "D"):
                    pin8.set_analog_period(20)
                    pin8.write_analog(pulse)
                if (arg0 == "E"):
                    pin15.set_analog_period(20)
                    pin15.write_analog(pulse)
                if (arg0 == "F"):
                    pin13.set_analog_period(20)
                    pin13.write_analog(pulse)
                if (arg0 == "G"):
                    pin12.set_analog_period(20)
                    pin12.write_analog(pulse)
                if (arg0 == "H"):
                    pin1.set_analog_period(20)
                    pin1.write_analog(pulse)
            else:
                uart.write("Unknown command: {}\n".format(command))
                display.show(command)
    sleep(100)
