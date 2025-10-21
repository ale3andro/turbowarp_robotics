class ArduinoWebSerial {
  constructor() {
    this.port = null;
    this.reader = null;
    this.writer = null;
    this.textDecoder = new TextDecoder();
  }

  getInfo() {
    return {
      id: 'arduinowebserial',
      name: 'S1 Arduino',
      color1: '#007bff',
      color2: '#0062cc',
      blocks: [
        {
          opcode: 'connect',
          blockType: Scratch.BlockType.COMMAND,
          text: 'σύνδεση με Arduino'
        },
        {
          opcode: 'led',
          blockType: Scratch.BlockType.COMMAND,
          text: 'LED στο pin [PIN] [STATE]',
          arguments: { 
            STATE: { 
              type: Scratch.ArgumentType.STRING, 
              menu: 'onoff', 
              defaultValue: 'άναψε'
            },
            PIN: {
              type: Scratch.ArgumentType.STRING,
              menu: 'pins',
              defaultValue: 'D6'
            }
          }
        },
        {
          opcode: 'led_brightness',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Led στο pin [PIN] άναψε με φωτεινότητα [BRIGHTNESS]',
          arguments: { 
            PIN: {
              type: Scratch.ArgumentType.STRING,
              menu: 'pins_led_brightness',
              defaultValue: 'D6'
            },
            BRIGHTNESS: { 
              type: Scratch.ArgumentType.STRING,
              menu: 'brightnessLevels',
              defaultValue: '128'
            },
          }
        },
        {
          opcode: 'neopixel',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Neopixel Led στο pin [PIN], [LEDS], χρώμα R:[R], G:[G], B:[B] φωτεινότητα [BRIGHTNESS]',
          arguments: { 
            PIN: {
              type: Scratch.ArgumentType.STRING,
              menu: 'servo_pins',
              defaultValue: 'D5'
            },
            LEDS: {
              type: Scratch.ArgumentType.STRING,
              menu: 'neopixel_leds',
              defaultValue: 'όλα'
            },
            R: {
              type: Scratch.ArgumentType.STRING,
              menu: 'color_values',
              defaultValue: '255'
            },
            G: {
              type: Scratch.ArgumentType.STRING,
              menu: 'color_values',
              defaultValue: '255'
            },
            B: {
              type: Scratch.ArgumentType.STRING,
              menu: 'color_values',
              defaultValue: '255'
            },
            BRIGHTNESS: {
              type: Scratch.ArgumentType.STRING,
              menu: 'brightnessLevels',
              defaultValue: '50'
            }
          }
        },
        {
          opcode: 'buzzer',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Buzzer στο pin [PIN], παίξε νότα [NOTE] για [TIME]',
          arguments: { 
            PIN: {
              type: Scratch.ArgumentType.STRING,
              menu: 'servo_pins',
              defaultValue: 'D6'
            },
            NOTE: {
              type: Scratch.ArgumentType.STRING,
              menu: 'notes',
              defaultValue: 'Χαμηλό Ντο (C3)'
            },
            TIME: {
              type: Scratch.ArgumentType.STRING,
              menu: 'note_times',
              defaultValue: 'μισό'
            }
          }
        },
        {
          opcode: 'laser',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Laser στο pin [PIN] [STATE]',
          arguments: { 
            STATE: { 
              type: Scratch.ArgumentType.STRING, 
              menu: 'onoff', 
              defaultValue: 'άναψε'
            },
            PIN: {
              type: Scratch.ArgumentType.STRING,
              menu: 'pins',
              defaultValue: 'D6'
            }
          }
        },
        {
          opcode: 'servo',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Σέρβο στο pin [PIN] όρισε γωνία [ANGLE]',
          arguments: { 
            PIN: {
              type: Scratch.ArgumentType.STRING,
              menu: 'servo_pins',
              defaultValue: 'D9'
            },
            ANGLE: { 
              type: Scratch.ArgumentType.ANGLE,
              defaultValue: 90
            },
            
          }
        },
        {
          opcode: 'motor',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Κινητήρας (στο D3/D4) όρισε ταχύτητα [SPEED] και φορά [DIRECTION]',
          arguments: { 
            SPEED: { 
              type: Scratch.ArgumentType.STRING,
              menu: 'brightnessLevels',
              defaultValue: '128'
            },
            DIRECTION: {
              type: Scratch.ArgumentType.STRING,
              menu: 'directions',
              defaultValue: 'ρολογιού'
            },            
          }
        },
        {
          opcode: 'readTemp',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Διάβασε θερμοκρασία από το pin [PIN]',
          arguments: {
            PIN: {
              type: Scratch.ArgumentType.STRING,
              menu: 'servo_pins'
            }
          },
        },
        {
          opcode: 'readHum',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Διάβασε υγρασία από το pin [PIN]',
          arguments: {
            PIN: {
              type: Scratch.ArgumentType.STRING,
              menu: 'servo_pins'
            }
          },
        },
        {
          opcode: 'readLight',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Διάβασε επίπεδο φωτός από το pin [PIN]',
          arguments: {
            PIN: {
              type: Scratch.ArgumentType.STRING,
              menu: 'analogPins'
            }
          },
        },
        {
          opcode: 'readAnalog',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Διάβασε ποτενσιόμετρο από το pin [PIN]',
          arguments: {
            PIN: {
              type: Scratch.ArgumentType.STRING,
              menu: 'analogPins'
            }
          },
        },
        {
          opcode: 'readSound',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Διάβασε ένταση ήχου από το μικρόφωνο στο pin [PIN]',
          arguments: {
            PIN: {
              type: Scratch.ArgumentType.STRING,
              menu: 'analogPins'
            }
          },
        },
        {
          opcode: 'isMagneticFieldAvailable',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'Αισθητήρας μαγνητικού πεδίου στο pin [PIN]. Ανιχνεύει μαγνήτη;',
          arguments: {
            PIN: {
              type: Scratch.ArgumentType.STRING,
              menu: 'servo_pins',
              defaultValue: 'D7'
            }
          }
        },
        {
          opcode: 'isButtonPressed', // Κουμπί πίεσης
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'Κουμπί πίεσης στο pin [PIN]. Είναι πατημένο;',
          arguments: {
            PIN: {
              type: Scratch.ArgumentType.STRING,
              menu: 'servo_pins',
              defaultValue: 'D7'
            }
          }
        },
        {
          opcode: 'isButton2Pressed', // Κουμπί αφής
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'Κουμπί αφής στο pin [PIN]. Είναι πατημένο;',
          arguments: {
            PIN: {
              type: Scratch.ArgumentType.STRING,
              menu: 'servo_pins',
              defaultValue: 'D6'
            }
          }
        },
        {
          opcode: 'isMotionSensorTriggered', // Κουμπί πίεσης
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'Αισθητήρας κίνησης στο pin [PIN]. Ανιχνεύτηκε κίνηση;',
          arguments: {
            PIN: {
              type: Scratch.ArgumentType.STRING,
              menu: 'servo_pins',
              defaultValue: 'D7'
            }
          }
        },





        {
          opcode: 'send',
          blockType: Scratch.BlockType.COMMAND,
          text: 'στείλε [MESSAGE]',
          arguments: { 
            MESSAGE: { 
              type: Scratch.ArgumentType.STRING, 
              defaultValue: 'Hello Arduino!' 
            } 
          }
        },
        {
          opcode: 'readLine',
          blockType: Scratch.BlockType.REPORTER,
          text: 'διάβασε γραμμή'
        },
        {
          opcode: 'connectionStatus',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Κατάσταση σύνδεσης S1'
        },{
          opcode: 'disconnect',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Αποσύνδεση από Arduino'
        }
      ],
      menus: {
        onoff: { 
          acceptReporters: false, 
          items: ['άναψε', 'σβήσε'] 
        },
        pins: {
          acceptReporters: false,
          items: ['D4', 'D5', 'D6', 'D7', 'D8', 'D9']
        },
        pins_led_brightness: {
          acceptReporters: false,
          items: ['D5', 'D6', 'D9']
        },
        servo_pins: {
          acceptReporters: false,
          items: ['D5', 'D6', 'D7', 'D8', 'D9']
        },
        analogPins: {
          acceptReporters: true,
          items: ['A0', 'A1', 'A2', 'A3']
        },
        brightnessLevels: {
          acceptReporters: false,
          items: ['0', '32', '64', '96', '128', '160', '192', '224', '255']
        },
        color_values: {
          acceptReporters: false,
          items: ['0', '16', '32', '48', '64', '80', '96', '112', '128', '144', '160', '176', '192', '208', '224', '240', '255']
        },
        neopixel_leds: {
          acceptReporters: true,
          items: ['όλα', '1ο', '2ο', '3ο', '4ο']
        },
        directions: {
          acceptReporters: false, 
          items: ['ρολογιού', 'αντίστροφη ρολογιού'] 
        },
        notes: {
          acceptReporters: false, 
          items: ["Χαμηλό Ντο (C3)", "Χαμηλό Ντο# (C#3)", "Χαμηλό Ρε (D3)", "Χαμηλό Ρε# (D#3)", "Χαμηλό Μι (E3)", "Χαμηλό Φα (C3)", "Χαμηλό Φα# (F#3)", "Χαμηλό Σολ (G3)", "Χαμηλό Σολ# (G#3)", "Χαμηλό Λα (A3)", "Χαμηλό Λα# (A#3)", "Χαμηλό Σι (B3)", "Μεσαίο Ντο (C4)", "Μεσαίο Ντο# (C#4)", "Μεσαίο Ρε (D4)", "Μεσαίο Ρε# (D#4)", "Μεσαίο Μι (E4)", "Μεσαίο Φα (F4)", "Μεσαίο Φα# (F#4)", "Μεσαίο Σολ (G4)", "Μεσαίο Σολ# (G#4)", "Μεσαίο Λα (A4)", "Μεσαίο Λα# (A#4)", "Μεσαίο Σι (B4)", "Υψηλό Ντο (C5)", "Υψηλό Ντο# (C#5)", "Υψηλό Ρε (D5)", "Υψηλό Ρε# (D#5)", "Υψηλό Μι (E5)", "Υψηλό Φα (F5)", "Υψηλό Φα# (F#5)", "Υψηλό Σολ (G5)", "Υψηλό Σολ# (G#5)", "Υψηλό Λα (A5)", "Υψηλό Λα# (A#5)", "Υψηλό Σι (B5)" ] 
        },
        note_times: {
          acceptReporters: false, 
          items: ['μισό', 'τέταρτο', 'όγδοο', 'ολόκληρο', 'διπλό', 'στοπ'] 
        },
      }
    };
  }

  async ensureConnection() {
    if (this.port) return true;
    const ports = await navigator.serial.getPorts();
    if (ports.length > 0) {
      this.port = ports[0];
      await this.port.open({ baudRate: 9600 });
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
    alert('Συνδέθηκε στο S1 Arduino!');
  }

  async connect() {
    try {
      if (!(await this.ensureConnection())) {
        if (!this.port) {
          this.port = await navigator.serial.requestPort();
          await this.port.open({ baudRate: 9600 });
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

  async send(args) {
    if (!this.writer) {
      alert('Δεν υπάρχει σύνδεση με το S1');
      return;
    }
    await this.writer.write(args.MESSAGE + '\n');
  }

  async readLine() {
    if (!this.reader) return '';
    const { value, done } = await this.reader.read();
    if (done) {
      this.reader.releaseLock();
      return '';
    }
    return value.trim();
  }

  async connectionStatus() {
    if (!this.port)
      return 'Χωρίς σύνδεση...';
    else 
      return 'Συνδεδεμένο!';
  }
  
  async led(args) {
    if (!this.writer) {
      alert('Χωρίς σύνδεση με το S1!');
      return;
    }
    const pin = args.PIN;
    const cmd = args.STATE === 'άναψε' ? 'LED_ON_' + pin.substring(1)  : 'LED_OFF_' + pin.substring(1);
    
    await this.writer.write(cmd + '\n');
  }

  async led_brightness(args) {
    if (!this.writer) {
      alert('Χωρίς σύνδεση με το S1!');
      return;
    }
    const pin = args.PIN;
    const brightness = args.BRIGHTNESS;
    const cmd = 'LEDBRIGHTNESS_' + pin.substring(1) + '_' + brightness;
    
    await this.writer.write(cmd + '\n');
  }

  async motor(args) {
    if (!this.writer) {
      alert('Χωρίς σύνδεση με το S1!');
      return;
    }
    const speed = args.SPEED;
    const direction = args.DIRECTION === 'ρολογιού' ? '1'  : '0';

    const cmd = 'MOTOR_' + speed + '_' + direction;
    
    await this.writer.write(cmd + '\n');
  }

  async buzzer(args) {
    if (!this.writer) {
      alert('Χωρίς σύνδεση με το S1!');
      return;
    }
    const pin = args.PIN;
    const Bnote = args.NOTE;
    const Btime = args.TIME;
    var time=0;
    var note=0;

    switch (Btime) {
      case 'μισό':
        time=500;
        break;
      case 'τέταρτο':
        time=250;
        break;
      case 'όγδοο':
        time=125;
        break;
      case 'ολόκληρο':
        time=1000;
        break;
      case 'διπλό':
        time=2000;
        break;
      default:
        time=1;
    }
    switch (Bnote) {
      case 'Χαμηλό Ντο (C3)':
          note = 131;
          break;
      case 'Χαμηλό Ντο# (C#3)':
          note = 139;
          break;
      case 'Χαμηλό Ρε (D3)':
          note = 147;
          break;
      case 'Χαμηλό Ρε# (D#3)':
          note = 156;
          break;
      case 'Χαμηλό Μι (E3)':
          note = 165;
          break;
      case 'Χαμηλό Φα (C3)':
          note = 175;
          break;
      case 'Χαμηλό Φα# (F#3)':
          note = 185;
          break;
      case 'Χαμηλό Σολ (G3)':
          note = 196;
          break;
      case 'Χαμηλό Σολ# (G#3)':
          note = 208;
          break;
      case 'Χαμηλό Λα (A3)':
          note = 220;
          break;
      case 'Χαμηλό Λα# (A#3)':
          note = 233;
          break;
      case 'Χαμηλό Σι (B3)':
          note = 247;
          break;
      case 'Μεσαίο Ντο (C4)':
          note = 262;
          break;
      case 'Μεσαίο Ντο# (C#4)':
          note = 277;
          break;
      case 'Μεσαίο Ρε (D4)':
          note = 294;
          break;
      case 'Μεσαίο Ρε# (D#4)':
          note = 311;
          break;
      case 'Μεσαίο Μι (E4)':
          note = 330;
          break;
      case 'Μεσαίο Φα (F4)':
          note = 349;
          break;
      case 'Μεσαίο Φα# (F#4)':
          note = 370;
          break;
      case 'Μεσαίο Σολ (G4)':
          note = 392;
          break;
      case 'Μεσαίο Σολ# (G#4)':
          note = 415;
          break;
      case 'Μεσαίο Λα (A4)':
          note = 440;
          break;
      case 'Μεσαίο Λα# (A#4)':
          note = 466;
          break;
      case 'Μεσαίο Σι (B4)':
          note = 494;
          break;
      case 'Υψηλό Ντο (C5)':
          note = 523;
          break;
      case 'Υψηλό Ντο# (C#5)':
          note = 554;
          break;
      case 'Υψηλό Ρε (D5)':
          note = 587;
          break;
      case 'Υψηλό Ρε# (D#5)':
          note = 622;
          break;
      case 'Υψηλό Μι (E5)':
          note = 659;
          break;
      case 'Υψηλό Φα (F5)':
          note = 698;
          break;
      case 'Υψηλό Φα# (F#5)':
          note = 740;
          break;
      case 'Υψηλό Σολ (G5)':
          note = 784;
          break;
      case 'Υψηλό Σολ# (G#5)':
          note = 831;
          break;
      case 'Υψηλό Λα (A5)':
          note = 880;
          break;
      case 'Υψηλό Λα# (A#5)':
          note = 932;
          break;
      case 'Υψηλό Σι (B5)':
          note = 988;
          break;
      default:
          note = 494;
    }   
    const cmd = 'BUZZER_' + pin.substring(1) + '_' + note + '_' + time;
    await this.writer.write(cmd + '\n');
  }

  async neopixel(args) {
    if (!this.writer) {
      alert('Χωρίς σύνδεση με το S1!');
      return;
    }
    const pin = args.PIN;
    const tLeds = args.LEDS;
    const r = args.R;
    const g = args.G;
    const b = args.B;
    const brightness = args.BRIGHTNESS;
    var leds = 0;
    switch (tLeds) {
      case '1ο':
        leds = 0;
        break;
      case '2ο':
        leds = 1;
        break;
      case '3ο':
        leds = 2;
        break;
      case '4ο':
        leds = 3;
        break;
      default:
        leds = 4;
    }
    const cmd = "NEOPIXEL_" + pin.substring(1) + '_' + leds + '_' + r + '_' + g + '_' + b + '_' + brightness;
    await this.writer.write(cmd + '\n');
  }

  async servo(args) {
    if (!this.writer) {
      alert('Χωρίς σύνδεση με το S1!');
      return;
    }
    const pin = args.PIN;
    const angle = args.ANGLE;
    const cmd = 'SERVO_' + pin.substring(1) + '_' + angle;
    
    await this.writer.write(cmd + '\n');
  }

  async readTemp(args) {
    if (!this.writer) {
      alert('Χωρίς σύνδεση με το S1!');
      return;
    }
    const pin = args.PIN;
    const cmd = 'TEMP_' + pin.substring(1);
    
    await this.writer.write(cmd + '\n');

    let result = '';
    while (true) {
      const { value, done } = await this.reader.read();
      if (done) break;
      result += value;
      if (result.includes('\n')) break; // got full line
    }
    return result.trim();
  }

  async readHum(args) {
    if (!this.writer) {
      alert('Χωρίς σύνδεση με το S1!');
      return;
    }
    const pin = args.PIN;
    const cmd = 'HUM_' + pin.substring(1);
    
    await this.writer.write(cmd + '\n');

    let result = '';
    while (true) {
      const { value, done } = await this.reader.read();
      if (done) break;
      result += value;
      if (result.includes('\n')) break; // got full line
    }
    return result.trim();
  }

  async readAnalog(args) {
    if (!this.writer || !this.reader) {
      alert('Δεν έχει γίνει σύνδεση με το S1');
      return;
    }
    const pin = args.PIN;
    const cmd = 'READ_' + pin.substring(1);
    await this.writer.write(cmd + '\n');

    let result = '';
    while (true) {
      const { value, done } = await this.reader.read();
      if (done) break;
      result += value;
      if (result.includes('\n')) break; // got full line
    }
    
    return result.trim();
  }
  
  async isButtonPressed(args) {
    if (!this.writer) {
      alert('Χωρίς σύνδεση με το S1!');
      return;
    }
    const pin = args.PIN;
    const cmd = 'BUTTON_' + pin.substring(1);
    
    await this.writer.write(cmd + '\n');

    let result = '';
    while (true) {
      const { value, done } = await this.reader.read();
      if (done) break;
      result += value;
      if (result.includes('\n')) break; // got full line
    }
    return result.trim();
  }

  async isButton2Pressed(args) { // κουμπί αφής
    if (!this.writer) {
      alert('Χωρίς σύνδεση με το S1!');
      return;
    }
    const pin = args.PIN;
    const cmd = 'BUTTON2_' + pin.substring(1);
    
    await this.writer.write(cmd + '\n');

    let result = '';
    while (true) {
      const { value, done } = await this.reader.read();
      if (done) break;
      result += value;
      if (result.includes('\n')) break; // got full line
    }
    return result.trim();
  }
  async disconnect() {
    try {
      if (this.reader) {
        try {
          await this.reader.cancel();
        } catch (e) {
          console.warn('Reader cancel failed:', e);
        }
        try {
          this.reader.releaseLock();
          this.reader = null;
        } catch (e) {
          console.warn('Reader release failed:', e);
        }
        //this.reader = null;
        console.log('DEBUG: Reader reset to null successfully')
      }

      if (this.writer) {
        try {
          await this.writer.close();
        } catch (e) {
          console.warn('Writer close failed:', e);
        }
        try {
          this.writer.releaseLock();
          this.writer = null;
        } catch (e) {
          console.warn('Writer release failed:', e);
        }
        //this.writer = null;
        console.log('DEBUG: Writer reset to null successfully')
      }

      if (!this.port) {
        try {
          await this.port.close();
        } catch (e) {
          console.warn('Port close failed:', e);
          alert(e);
        }
        await this.port.close();
        //this.port = null;
        console.log('DEBUG: Port reset to null successfully')
      }
      alert('🔌 Αποσυνδέθηκε από το Arduino');
    } catch (err) {
      alert('Σφάλμα κατά την αποσύνδεση: ' + err.message);
    }
  }


  // Function aliases
  readSound = this.readAnalog;
  readLight = this.readAnalog;
  laser = this.led;
  isMagneticFieldAvailable = this.isButtonPressed;
  isMotionSensorTriggered = this.isButton2Pressed;
}

Scratch.extensions.register(new ArduinoWebSerial());
