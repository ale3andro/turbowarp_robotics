class MicrobitLEDExtension {
  constructor(runtime) {
    this.runtime = runtime;
    this.port = null;
    this.writer = null;
  }

  getInfo() {
    return {
      id: 'microbitLED',
      name: 'Microbit LED',
      color1: '#FF8000',
      blocks: [
        {
          opcode: 'connect',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Σύνδεση στο micro:bit',
        },
        {
          opcode: 'clearLED',
          blockType: Scratch.BlockType.COMMAND,
          text: 'LED Matrix: καθάρισμα',
        },
        {
          opcode: 'setLED',
          blockType: Scratch.BlockType.COMMAND,
          text: 'LED Matrix: led στο x [X] και y [Y] [STATE]',
          arguments: {
            X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            STATE: {
              type: Scratch.ArgumentType.STRING,
              menu: 'onOffMenu',
              defaultValue: 'άναψε',
            },
          },
        },
        {
          opcode: 'setLEX',
          blockType: Scratch.BlockType.COMMAND,
          text: 'LED στη θύρα [PIN] [STATE]',
          arguments: {
            PIN: { 
                type: Scratch.ArgumentType.STRING, 
                menu: 'ledPinMenu',
                defaultValue: 'B'
            },
            STATE: {
              type: Scratch.ArgumentType.STRING,
              menu: 'onOffMenu',
              defaultValue: 'άναψε',
            },
          },
        },
        {
          opcode: 'setMotor',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Κινητήρας στη θύρα [PIN] : φορά [DIRECTION] και ταχύτητα [SPEED] ',
          arguments: {
            PIN: { 
                type: Scratch.ArgumentType.STRING, 
                menu: 'motorPinMenu',
                defaultValue: 'E'
            },
            DIRECTION: {
              type: Scratch.ArgumentType.STRING,
              menu: 'directionMenu',
              defaultValue: 'ρολογιού',
            },
            SPEED: {
              type: Scratch.ArgumentType.STRING,
              menu: 'speedMenu',
              defaultValue: '600',
            },
          },
        },
        {
          opcode: 'setServo',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Σέρβο στη θύρα [PIN], όρισε γωνία [ANGLE]',
          arguments: {
            PIN: { 
                type: Scratch.ArgumentType.STRING, 
                menu: 'servoPinMenu',
                defaultValue: 'D'
            },
            ANGLE: {
              type: Scratch.ArgumentType.STRING,
              menu: 'angleMenu',
              defaultValue: '90',
            },
          },
        },
      ],
      menus: {
        onOffMenu: {
            acceptReporters: false,
            items: ['άναψε', 'σβήσε'],
        },
        ledPinMenu: {
            acceptReporters: false,
            items: ['B', 'C', 'D', 'E', 'F', 'G', 'H']
        },
        motorPinMenu: {
            acceptReporters: false,
            items: ['E', 'F', 'G', 'H']
        },
        buttonPinMenu: {
            acceptReporters: false,
            items: ['A', 'E', 'F', 'G', 'H']
        },
        servoPinMenu: {
            acceptReporters: false,
            items: ['B', 'C', 'D', 'E', 'F', 'G', 'H']
        },
        angleMenu: {
            acceptReporters: false,
            items: ['0', '30', '60', '90', '120', '150', '180']
        },
        directionMenu: {
            acceptReporters: false,
            items: ['ρολογιού', 'αντίστροφη ρολογιού']
        },
        speedMenu: {
            acceptReporters: false,
            items: ['0', '200', '400', '600', '800', '1023']
        },
      },
    };
  }

  async connect() {
    try {
      this.port = await navigator.serial.requestPort();
      await this.port.open({ baudRate: 115200 });
      this.writer = this.port.writable.getWriter();
      console.log('Connected to micro:bit');
    } catch (err) {
      console.error('Connection failed:', err);
    }
  }

  async setLED(args) {
    if (!this.writer) return;
    const { X, Y, STATE } = args;
    var micState = 'off'
    if (STATE == "άναψε")
        micState = 'on';
    const cmd = `LED ${X} ${Y} ${micState}\n`;
    const data = new TextEncoder().encode(cmd);
    await this.writer.write(data);
  }

  async clearLED() {
    if (!this.writer) return;
    const cmd = `CLS\n`;
    const data = new TextEncoder().encode(cmd);
    await this.writer.write(data);
  }

  async setLEX(args) {
    if (!this.writer) return;
    const { PIN, STATE } = args;
    var micState = '0'
    if (STATE == "άναψε")
        micState = '1';
    const cmd = `LEX ${PIN} ${micState}\n`;
    const data = new TextEncoder().encode(cmd);
    console.log(cmd);
    await this.writer.write(data);
  }

  async setMotor(args) {
    if (!this.writer) return;
    const { PIN, DIRECTION, SPEED } = args;
    var direction = 0; // antistrofi fora rologiou
    if (DIRECTION == 'ρολογιού')
        direction = 1; // fora rologiou
    const cmd = `MOT ${PIN} ${direction} ${SPEED}\n`;
    const data = new TextEncoder().encode(cmd);
    console.log(cmd);
    await this.writer.write(data);
  }

  async setServo(args) {
    if (!this.writer) return;
    const { PIN, ANGLE } = args;
    const cmd = `SRV ${PIN} x ${ANGLE}\n`;
    const data = new TextEncoder().encode(cmd);
    console.log(cmd);
    await this.writer.write(data);
  } 
  
}

Scratch.extensions.register(new MicrobitLEDExtension());
