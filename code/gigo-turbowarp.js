class MicrobitTurbowarpExtension {
  constructor() {
    this.port = null;
    this.reader = null;
    this.writer = null;
    this.textDecoder = new TextDecoder();
    this.debug = false;
  }

  getInfo() {
    return {
      id: 'microbitGigo',
      name: 'Microbit Gigo',
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
            PIN: { type: Scratch.ArgumentType.STRING, menu: 'ledPinMenu', defaultValue: 'B' },
            STATE: { type: Scratch.ArgumentType.STRING, menu: 'onOffMenu', defaultValue: 'άναψε' },
          },
        },
        {
          opcode: 'setMotor',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Κινητήρας στη θύρα [PIN] : φορά [DIRECTION] και ταχύτητα [SPEED]',
          arguments: {
            PIN: { type: Scratch.ArgumentType.STRING, menu: 'motorPinMenu', defaultValue: 'E' },
            DIRECTION: { type: Scratch.ArgumentType.STRING, menu: 'directionMenu', defaultValue: 'ρολογιού' },
            SPEED: { type: Scratch.ArgumentType.STRING, menu: 'speedMenu', defaultValue: '600' },
          },
        },
        {
          opcode: 'setServo',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Σέρβο στη θύρα [PIN], όρισε γωνία [ANGLE]',
          arguments: {
            PIN: { type: Scratch.ArgumentType.STRING, menu: 'servoPinMenu', defaultValue: 'D' },
            ANGLE: { type: Scratch.ArgumentType.STRING, menu: 'angleMenu', defaultValue: '90' },
          },
        },
        {
          opcode: 'isTouchPressed',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'Κουμπί πίεσης στη θύρα [PIN], είναι πατημένο;',
          arguments: {
            PIN: { type: Scratch.ArgumentType.STRING, menu: 'buttonPinMenu', defaultValue: 'G' },
          },
        },
        {
          opcode: 'readLightLevel',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Επίπεδο φωτός',
          arguments: {}
        },
      ],
      menus: {
        onOffMenu: { acceptReporters: false, items: ['άναψε', 'σβήσε'] },
        ledPinMenu: { acceptReporters: false, items: ['B', 'C', 'D', 'E', 'F', 'G', 'H'] },
        motorPinMenu: { acceptReporters: false, items: ['E', 'F', 'G', 'H'] },
        buttonPinMenu: { acceptReporters: false, items: ['A', 'E', 'F', 'G', 'H'] },
        servoPinMenu: { acceptReporters: false, items: ['B', 'C', 'D', 'E', 'F', 'G', 'H'] },
        angleMenu: { acceptReporters: false, items: ['0', '30', '60', '90', '120', '150', '180'] },
        directionMenu: { acceptReporters: false, items: ['ρολογιού', 'αντίστροφη ρολογιού'] },
        speedMenu: { acceptReporters: false, items: ['0', '200', '400', '600', '800', '1023'] },
      },
    };
  }

  async ensureConnection() {
    if (this.port) return true;
    const ports = await navigator.serial.getPorts();
    if (ports.length > 0) {
      this.port = ports[0];
      await this.port.open({ baudRate: 115200 });
      return this.setupStreams();
    }
    return false;
  }

  async setupStreams() {
    const textDecoder = new TextDecoderStream();
    const textEncoder = new TextEncoderStream();

    this.port.readable.pipeTo(textDecoder.writable);
    textEncoder.readable.pipeTo(this.port.writable);

    this.reader = textDecoder.readable.getReader();
    this.writer = textEncoder.writable.getWriter();
    alert('Συνδέθηκε στο micro:bit!');
  }

  async connect() {
    try {
      if (!(await this.ensureConnection())) {
        if (!this.port) {
          this.port = await navigator.serial.requestPort();
          await this.port.open({ baudRate: 115200 });
          await this.setupStreams();
        }
      }
    } catch (err) {
      alert('Η σύνδεση απέτυχε: ' + err.message);
    }
    // Alec - this is needed for reconnecting successfully
    try {
      if ( (!this.writer) || (!this.reader) ) 
        await this.setupStreams();
    } catch (e) {
      alert(e);
    }
  }

  // --- Command blocks ---
  async clearLED() {
    const cmd = 'CLS\n';
    if (this.debug)
      console.log(cmd);
    await this.writer.write(cmd);
  }

  async setLED(args) {
    const { X, Y, STATE } = args;
    const micState = STATE === 'άναψε' ? 'on' : 'off';
    const cmd = 'LED ' + X + ' ' + Y + ' ' + micState + '\n';
    if (this.debug)
      console.log(cmd);
    await this.writer.write(cmd + '\n');
  }

  async setLEX(args) {
    const { PIN, STATE } = args;
    const micState = STATE === 'άναψε' ? '1' : '0';
    const cmd = 'LEX ' + PIN + ' ' + micState + '\n';
    if (this.debug)
      console.log(cmd);
    await this.writer.write(cmd + '\n');
  }

  async setMotor(args) {
    const { PIN, DIRECTION, SPEED } = args;
    const direction = DIRECTION === 'ρολογιού' ? 1 : 0;
    const cmd = 'MOT ' + PIN + ' ' + direction + ' ' + SPEED + '\n';
    if (this.debug)
      console.log(cmd);
    await this.writer.write(cmd + '\n');
  }

  async setServo(args) {
    const { PIN, ANGLE } = args;
    const cmd = 'SRV ' + PIN + ' x ' + ANGLE + '\n'; // x is just a placeholder in order to skip arg1 in micropython serial backend app
    if (this.debug)
      console.log(cmd);
    await this.writer.write(cmd + '\n');
  }
  
  
  async readLightLevel() {
    if (!this.writer) {
      alert('Χωρίς σύνδεση με το micro:bit!');
      return false;
    }
    const cmd = 'LIG\n';
    if (this.debug)
      console.log(cmd);
    await this.writer.write(cmd);

    let result = '';
    while (true) {
      const { value, done } = await this.reader.read();
      if (done) break;
      result += value;
      if (result.includes('\n')) break; // got full line
    }
    return result;
  }

  async isTouchPressed(args) {
    if (!this.writer) {
      alert('Χωρίς σύνδεση με το micro:bit!');
      return false;
    }

    const cmd = 'BTN ' + args.PIN + '\n';
    if (this.debug)
      console.log(cmd);
    // alec - wait 100ms before sending the command in the serial console
    await new Promise(resolve => setTimeout(resolve, 100));

    await this.writer.write(cmd);
    // alec - wait another 100ms before reading back the value
    await new Promise(resolve => setTimeout(resolve, 100));

    let result = '';
    while (true) {
      const { value, done } = await this.reader.read();
      if (done) break;
      result += value;
      if (result.includes('\n')) break; // got full line
    }
    //if (result.includes('1')) return false;
    //if (result.includes('0')) return true;
    
    let retval = false;
    if (result.includes('0')) 
      retval = true;
    if (this.debug)
      console.log(retval);
    return retval;
    
  }

  delay(ms, value) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
}

Scratch.extensions.register(new MicrobitTurbowarpExtension());
