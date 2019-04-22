/****************************************************************/
/*   ELECFREAKS octopus Series               		            */
/*   More information please visit https://wwww.elecfreaks.com	*/
/*   Code by Lionkk												*/
/****************************************************************/


//% weight=100 color=#fc8715  icon="\uf1e6" block="octopus"
//% groups='["8*16Matrix","DigitalPin","AnalogPin","IIC Interface","RTC1307","DoublePin"]'
namespace octopus_output {
    /************************************************************Value********************************************************/
    let initialized = false
    let initializedMatrix = false
    let matBuf = pins.createBuffer(17)
    const PCA9685_ADDRESS = 0x40
    const MODE1 = 0x00
    const PRESCALE = 0xFE
    const LED0_ON_L = 0x06
    // HT16K33 commands
    const HT16K33_ADDRESS = 0x70
    const HT16K33_BLINK_CMD = 0x80
    const HT16K33_BLINK_DISPLAYON = 0x01
    const HT16K33_BLINK_OFF = 0
    const HT16K33_BLINK_2HZ = 1
    const HT16K33_BLINK_1HZ = 2
    const HT16K33_BLINK_HALFHZ = 3
    const HT16K33_CMD_BRIGHTNESS = 0xE0
    //BME280
    let BME280_I2C_ADDR = 0x76
    let dig_T1 = getUInt16LE(0x88)
    let dig_T2 = getInt16LE(0x8A)
    let dig_T3 = getInt16LE(0x8C)
    let dig_P1 = getUInt16LE(0x8E)
    let dig_P2 = getInt16LE(0x90)
    let dig_P3 = getInt16LE(0x92)
    let dig_P4 = getInt16LE(0x94)
    let dig_P5 = getInt16LE(0x96)
    let dig_P6 = getInt16LE(0x98)
    let dig_P7 = getInt16LE(0x9A)
    let dig_P8 = getInt16LE(0x9C)
    let dig_P9 = getInt16LE(0x9E)
    let dig_H1 = getreg(0xA1)
    let dig_H2 = getInt16LE(0xE1)
    let dig_H3 = getreg(0xE3)
    let a = getreg(0xE5)
    let dig_H4 = (getreg(0xE4) << 4) + (a % 16)
    let dig_H5 = (getreg(0xE6) << 4) + (a >> 4)
    let dig_H6 = getInt8LE(0xE7)
    let T = 0
    let P = 0
    let H = 0
    setreg(0xF2, 0x04)
    setreg(0xF4, 0x2F)
    setreg(0xF5, 0x0C)
    setreg(0xF4, 0x2F)
    //DS1307RTC
    let DS1307_I2C_ADDR = 0x68;
    let DS1307_REG_SECOND = 0
    let DS1307_REG_MINUTE = 1
    let DS1307_REG_HOUR = 2
    let DS1307_REG_WEEKDAY = 3
    let DS1307_REG_DAY = 4
    let DS1307_REG_MONTH = 5
    let DS1307_REG_YEAR = 6
    let DS1307_REG_CTRL = 7
    let DS1307_REG_RAM = 8
    /*******************************************************************************************************************/


    /***************************************************listStyleType***************************************************/
    export enum Relay_state {
        //% block="NC:open|NO:close" enumval=0
        state0,
        //% block="NC:close|NO:open" enumval=1
        state1
    }
    export enum Button_state {
        //% block="pressed" enumval=0
        pressed,
        //% block="unpressed" enumval=1
        unpressed
    }
    export enum ADKeyPad_state {
        //% block="A" enumval=0
        A,
        //% block="B" enumval=1
        B,
        //% block="C" enumval=2
        C,
        //% block="D" enumval=3
        D,
        //% block="E" enumval=4
        E
    }
    export enum Vibration_Motor_state {
        //% block="once" enumval=0
        Once,
        //% block="Always" enumval=1
        Always,
        //% block="none" enumval=2
        None
    }
    export enum BME280_state {
        //% block="Temperature(℃)" enumval=0
        Temperature,
        //% block="Humidity(RH)" enumval=1
        Humidity,
        //% block="Pressure(Pa)" enumval=2
        Pressure,
        //% block="Altitude(M)" enumval=3
        Altitude
    }
    export enum Distance_Unit_state {
        //% block="mm" enumval=0
        Distance_Unit_mm,
        //% block="cm" enumval=1
        Distance_Unit_cm,
        //% block="inch" enumval=2
        Distance_Unit_inch
    }
    export enum Tracking_state {
        //% block="● ●" enumval=0
        Tracking_State_0,
        //% block="◌ ●" enumval=1
        Tracking_State_1,
        //% block="● ◌" enumval=2
        Tracking_State_2,
        //% block="◌ ◌" enumval=3
        Tracking_State_3
    }
    export enum Tilt_Sensor_state {
        //% block="Left" enumval=0
        pressed,
        //% block="Right" enumval=1
        unpressed
    }
    export enum TimeType_state {
        //% block="second" enumval=0
        SECOND,
        //% block="minute" enumval=1
        MINUTE,
        //% block="hour" enumval=2
        HOUR,
        //% block="day" enumval=3
        DAY,
        //% block="month" enumval=4
        MONTH,
        //% block="year" enumval=5
        YEAR
    }
    export enum Photo_Sensor_state {
        //% block="◌" enumval=0
        Tracking_State_0,
        //% block="●" enumval=1
        Tracking_State_1
    }
    export enum Vibration_Sensor_state {
        //% block="vibrate" enumval=0
        vibrate,
        //% block="static" enumval=1
        static
    }
    export enum DHT11_state {
        //% block="temperature(℃)" enumval=0
        DHT11_temperature_C,
        //% block="temperature(℉)" enumval=1
        DHT11_temperature_F,
        //% block="humidity(RH)" enumval=2
        DHT11_humidity
    }
	export enum PIR_state{
		//% block="animal|human" enumval=0
        human,
        //% block="none" enumval=1
        none
	}
	export enum tmp36_state {
    //% block="(℃)" enumval=0
    temperature_C,
    //% block="(℉)" enumval=1
    temperature_F,
}


    /***************************************************************************************************************/


    /****************************************************************Function***************************************/
    ///////////////IIC8*16Matrix
    function i2cwrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2ccmd(addr: number, value: number) {
        let buf = pins.createBuffer(1)
        buf[0] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2cread(addr: number, reg: number) {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }

    function initPCA9685(): void {
        i2cwrite(PCA9685_ADDRESS, MODE1, 0x00)
        setFreq(50);
        for (let idx = 0; idx < 16; idx++) {
            setPwm(idx, 0, 0);
        }
        initialized = true
    }
    function matrixInit() {
        i2ccmd(HT16K33_ADDRESS, 0x21);// turn on oscillator
        i2ccmd(HT16K33_ADDRESS, HT16K33_BLINK_CMD | HT16K33_BLINK_DISPLAYON | (0 << 1));
        i2ccmd(HT16K33_ADDRESS, HT16K33_CMD_BRIGHTNESS | 0xF);
    }

    function matrixShow() {
        matBuf[0] = 0x00;
        pins.i2cWriteBuffer(HT16K33_ADDRESS, matBuf);
    }
    function setFreq(freq: number): void {
        // Constrain the frequency
        let prescaleval = 25000000;
        prescaleval /= 4096;
        prescaleval /= freq;
        prescaleval -= 1;
        let prescale = prescaleval; //Math.Floor(prescaleval + 0.5);
        let oldmode = i2cread(PCA9685_ADDRESS, MODE1);
        let newmode = (oldmode & 0x7F) | 0x10; // sleep
        i2cwrite(PCA9685_ADDRESS, MODE1, newmode); // go to sleep
        i2cwrite(PCA9685_ADDRESS, PRESCALE, prescale); // set the prescaler
        i2cwrite(PCA9685_ADDRESS, MODE1, oldmode);
        control.waitMicros(5000);
        i2cwrite(PCA9685_ADDRESS, MODE1, oldmode | 0xa1);
    }

    function setPwm(channel: number, on: number, off: number): void {
        if (channel < 0 || channel > 15)
            return;
        //serial.writeValue("ch", channel)
        //serial.writeValue("on", on)
        //serial.writeValue("off", off)

        let buf = pins.createBuffer(5);
        buf[0] = LED0_ON_L + 4 * channel;
        buf[1] = on & 0xff;
        buf[2] = (on >> 8) & 0xff;
        buf[3] = off & 0xff;
        buf[4] = (off >> 8) & 0xff;
        pins.i2cWriteBuffer(PCA9685_ADDRESS, buf);
    }
    ////////////////////////////////bme280
    function setreg(reg: number, dat: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = dat;
        pins.i2cWriteBuffer(BME280_I2C_ADDR, buf);
    }

    function getreg(reg: number): number {
        pins.i2cWriteNumber(BME280_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(BME280_I2C_ADDR, NumberFormat.UInt8BE);
    }

    function getInt8LE(reg: number): number {
        pins.i2cWriteNumber(BME280_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(BME280_I2C_ADDR, NumberFormat.Int8LE);
    }

    function getUInt16LE(reg: number): number {
        pins.i2cWriteNumber(BME280_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(BME280_I2C_ADDR, NumberFormat.UInt16LE);
    }

    function getInt16LE(reg: number): number {
        pins.i2cWriteNumber(BME280_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(BME280_I2C_ADDR, NumberFormat.Int16LE);
    }
    function get(): void {
        let adc_T = (getreg(0xFA) << 12) + (getreg(0xFB) << 4) + (getreg(0xFC) >> 4)
        let var1 = (((adc_T >> 3) - (dig_T1 << 1)) * dig_T2) >> 11
        let var2 = (((((adc_T >> 4) - dig_T1) * ((adc_T >> 4) - dig_T1)) >> 12) * dig_T3) >> 14
        let t = var1 + var2
        T = ((t * 5 + 128) >> 8) / 100
        var1 = (t >> 1) - 64000
        var2 = (((var1 >> 2) * (var1 >> 2)) >> 11) * dig_P6
        var2 = var2 + ((var1 * dig_P5) << 1)
        var2 = (var2 >> 2) + (dig_P4 << 16)
        var1 = (((dig_P3 * ((var1 >> 2) * (var1 >> 2)) >> 13) >> 3) + (((dig_P2) * var1) >> 1)) >> 18
        var1 = ((32768 + var1) * dig_P1) >> 15
        if (var1 == 0)
            return; // avoid exception caused by division by zero
        let adc_P = (getreg(0xF7) << 12) + (getreg(0xF8) << 4) + (getreg(0xF9) >> 4)
        let _p = ((1048576 - adc_P) - (var2 >> 12)) * 3125
        _p = (_p / var1) * 2;
        var1 = (dig_P9 * (((_p >> 3) * (_p >> 3)) >> 13)) >> 12
        var2 = (((_p >> 2)) * dig_P8) >> 13
        P = _p + ((var1 + var2 + dig_P7) >> 4)
        let adc_H = (getreg(0xFD) << 8) + getreg(0xFE)
        var1 = t - 76800
        var2 = (((adc_H << 14) - (dig_H4 << 20) - (dig_H5 * var1)) + 16384) >> 15
        var1 = var2 * (((((((var1 * dig_H6) >> 10) * (((var1 * dig_H3) >> 11) + 32768)) >> 10) + 2097152) * dig_H2 + 8192) >> 14)
        var2 = var1 - (((((var1 >> 15) * (var1 >> 15)) >> 7) * dig_H1) >> 4)
        if (var2 < 0) var2 = 0
        if (var2 > 419430400) var2 = 419430400
        H = (var2 >> 12) / 1024
    }
    ///////////////////////////rtc1307
    function RTC_setReg(reg: number, dat: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = dat;
        pins.i2cWriteBuffer(DS1307_I2C_ADDR, buf);
    }
    function RTC_getReg(reg: number): number {
        pins.i2cWriteNumber(DS1307_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(DS1307_I2C_ADDR, NumberFormat.UInt8BE);
    }
    function HexToDec(dat: number): number {
        return (dat >> 4) * 10 + (dat % 16);
    }
    function DecToHex(dat: number): number {
        return Math.idiv(dat, 10) * 16 + (dat % 10)
    }



    /*********************************************************************************************************************************/


    /****************************************************************Blockcode******************************************************/
    /*******************Input*****************/
    //% block="Button connects to %pin Status is %state"
    //% state.fieldEditor="gridpicker"
    //% state.fieldOptions.columns=2
    //% subcategory="Input"
    //% group=DigitalPin
    export function octopus_Button(pin: DigitalPin, state: Button_state): boolean {
        switch (state) {
            case 0:
                if (pins.digitalReadPin(pin) == 0) {
                    return true;
                }
                else {
                    return false;
                }
                break;
            case 1:
                if (pins.digitalReadPin(pin) == 1) {
                    return true;
                }
                else {
                    return false;
                }
                break;
            default:
                return false
        }
    }
    //% block="Read Analog Rotation value to %pin"
    //% subcategory="Input"
    //% group=AnalogPin
    export function octopus_Rotation(pin: AnalogPin): number {
        return pins.analogReadPin(pin);
    }
    //% block="Read Black Analog Rotation value to %pin"
    //% subcategory="Input"
    //% group=AnalogPin
    export function octopus_Rotation_Black(pin: AnalogPin): number {
        return pins.analogReadPin(pin);
    }
    //% block="Read Linear Slider Potentiometer value to %pin"
    //% subcategory="Input"
    //% group=AnalogPin
    export function octopus_Rotation_Linear(pin: AnalogPin): number {
        return pins.analogReadPin(pin);
    }
    //% block="ADKeyPad connects to %pin Press button %state"
    //% state.fieldEditor="gridpicker"
    //% state.fieldOptions.columns=5
    //% subcategory="Input"
    //% group=AnalogPin
    export function octopus_ADKeyPad(pin: AnalogPin, state: ADKeyPad_state): boolean {
        switch (state) {
            case 0:
                if (pins.analogReadPin(pin) > 0 && pins.analogReadPin(pin) < 20) {
                    return true;
                }
                else {
                    return false;
                }
                break;
            case 1:
                if (pins.analogReadPin(pin) > 30 && pins.analogReadPin(pin) < 70) {
                    return true;
                }
                else {
                    return false;
                }
                break;
            case 2:
                if (pins.analogReadPin(pin) > 70 && pins.analogReadPin(pin) < 110) {
                    return true;
                }
                else {
                    return false;
                }
                break;
            case 3:
                if (pins.analogReadPin(pin) > 110 && pins.analogReadPin(pin) < 150) {
                    return true;
                }
                else {
                    return false;
                }
                break;
            case 4:
                if (pins.analogReadPin(pin) > 150 && pins.analogReadPin(pin) < 600) {
                    return true;
                }
                else {
                    return false;
                }
                break;
            default:
                return false
        }
    }
    //% block="Push Lock E-Switch connects to %pin Status is %state"
    //% state.fieldEditor="gridpicker"
    //% state.fieldOptions.columns=2
    //% subcategory="Input"
    //% group=DigitalPin
    export function octopus_Push_Lock(pin: DigitalPin, state: Button_state): boolean {
        switch (state) {
            case 0:
                if (pins.digitalReadPin(pin) == 0) {
                    return true;
                }
                else {
                    return false;
                }
                break;
            case 1:
                if (pins.digitalReadPin(pin) == 1) {
                    return true;
                }
                else {
                    return false;
                }
                break;
            default:
                return false;
        }
    }

    /***************************************************output**************************************************/
    //% block="Relay connects to %pin Status is %state"
    //% subcategory="Output"
    //% group=DigitalPin
    export function octopus_Relay(pin: DigitalPin, state: Relay_state): void {
        switch (state) {
            case 0:
                pins.digitalWritePin(pin, 1);
                break;
            case 1:
                pins.digitalWritePin(pin, 0);
                break;
        }
    }
    //% block="connect IIC 8*16 Matrix Draw|X %x|Y %y"
    //% subcategory="Output"
    //% group=8*16Matrix
    export function octopus_MatrixDraw(x: number, y: number): void {
        if (!initializedMatrix) {
            matrixInit();
            initializedMatrix = true;
        }
        let idx = y * 2 + x / 8;
        let tmp = matBuf[idx + 1];
        tmp |= (1 << (x % 8));
        matBuf[idx + 1] = tmp;
        matrixShow();
    }
    //% block="connect IIC 8*16 Matrix Clear"
    //% subcategory="Output"
    //% group=8*16Matrix
    export function octopus_MatrixClear(): void {
        if (!initializedMatrix) {
            matrixInit();
            initializedMatrix = true;
        }
        for (let i = 0; i < 16; i++) {
            matBuf[i + 1] = 0;
        }
        matrixShow();
    }
    //% block="LED connects to %pin Set $on"
    //% on.shadow="toggleOnOff"
    //% subcategory="Output"
    //% group=DigitalPin
    export function octopus_LED(pin: DigitalPin, on: boolean): void {
        if (on == true) {
            pins.digitalWritePin(pin, 1);
        } else {
            pins.digitalWritePin(pin, 0);
        }
    }
    //% block="130 Motor connects to %pin Set speed $speed \\%"
    //% speed.shadow="speedPicker"
    //% speed.min=0 speed.max=100
    //% subcategory="Output"
    //% group=AnalogPin
    export function octopus_130motor(pin: AnalogPin, speed: number): void {
        speed = speed * 10;
        pins.analogSetPeriod(pin, 1000)
        pins.analogWritePin(pin, speed)
    }
    //% block="Vibration Motor connects to %pin Set %state"
    //% subcategory="Output"
    //% group=DigitalPin
    export function octopus_Vibration_Motor(pin: DigitalPin, state: Vibration_Motor_state): void {
        switch (state) {
            case 0:
                pins.digitalWritePin(pin, 1)
                basic.pause(10)
                pins.digitalWritePin(pin, 0)
                break;
            case 1:
                pins.digitalWritePin(pin, 1)
                break;
            case 2:
                pins.digitalWritePin(pin, 0)
                break;
        }

    }
    /*****************************************************sensor**************************************************/
    //% block="Read BME280 %state value"
    //% subcategory="Sensor"
    //% group=IIC Interface
    export function octopus_BME280(state: BME280_state): number {
        switch (state) {
            case 0:
                get();
                return Math.round(T);
                break;
            case 1:
                get();
                return Math.round(H);
                break;
            case 2:
                get();
                return Math.round(P / 100);
                break;
            case 3:
                get();
                return (Math.round(P / 100) - 970) * 3
                break;
            default:
                return 0
        }
        return 0;
    }
    //% block="Sonar bit connects to %pin Set unit %state"
    //% subcategory="Sensor"
    //% group=DigitalPin
    export function octopus_Sonarbit(pin: DigitalPin, state: Distance_Unit_state): number {
        pins.setPull(pin, PinPullMode.PullNone)
        pins.digitalWritePin(pin, 0)
        control.waitMicros(2)
        pins.digitalWritePin(pin, 1)
        control.waitMicros(10)
        pins.digitalWritePin(pin, 0)
        let d = pins.pulseIn(pin, PulseValue.High, 23000)
        let distance = d * 10 * 5 / 3 / 58
        if (distance > 4000) {
            distance = 0
        }
        switch (state) {
            case 0:
                return Math.round(distance) //mm
                break
            case 1:
                return Math.round(distance / 10)  //cm
                break
            case 2:
                return Math.round(distance * 10 / 254)   //inch
                break
            default:
                return 0
        }
    }
    //% block="Read pm2.5 sensor value to %pin"
    //% subcategory="Sensor"
    //% group=DigitalPin
    export function octopus_PM25(pin: DigitalPin): number {
        let pm25 = 0
        while (pins.digitalReadPin(pin) != 0) {
        }
        while (pins.digitalReadPin(pin) != 1) {
        }
        pm25 = input.runningTimeMicros()
        while (pins.digitalReadPin(pin) != 0) {
        }
        pm25 = input.runningTimeMicros() - pm25
        pm25 = pm25 / 1000 - 2
        return pm25;
    }
    //% block="Left port %pin Right port %pin Tracking status is %state"
    //% subcategory="Sensor"
    //% group=DigitalPin
    export function octopus_2_Channel_Tracking(lpin: DigitalPin, rpin: DigitalPin, state: Tracking_state): boolean {
        pins.setPull(lpin, PinPullMode.PullUp)
        pins.setPull(rpin, PinPullMode.PullUp)
        let left_tracking = pins.digitalReadPin(lpin);
        let right_tracking = pins.digitalReadPin(rpin);
        if (left_tracking == 0 && right_tracking == 0 && state == 0) {
            return true;
        }
        else if (left_tracking == 1 && right_tracking == 0 && state == 1) {
            return true;
        }
        else if (left_tracking == 0 && right_tracking == 1 && state == 2) {
            return true;
        }
        else if (left_tracking == 1 && right_tracking == 1 && state == 3) {
            return true;
        }
        else {
            return false;
        }
    }
    //% block="Tilt sensor connects to %pin Set tilt direction to %state"
    //% subcategory="Sensor"
    //% group=DigitalPin
    //% state.fieldEditor="gridpicker"
    //% state.fieldOptions.columns=2
    export function octopus_Tilt_sensor(pin: DigitalPin, state: Tilt_Sensor_state): boolean {
        pins.setPull(pin, PinPullMode.PullUp)
        let tilt = pins.digitalReadPin(pin)
        if (tilt == 1 && state == 0)
            return true;
        else if (tilt == 0 && state == 1)
            return true;
        else {
            return false;
        }
    }
    //% block="connect IIC RTC1307 set %datatype |%data"
    //% subcategory="Sensor"
    //% group=RTC1307
    export function octopus_RTC_setTime(datatype: TimeType_state, data: number): void {
        switch (datatype) {
            case 0:
                RTC_setReg(DS1307_REG_SECOND, DecToHex(data % 60))
                break
            case 1:
                RTC_setReg(DS1307_REG_MINUTE, DecToHex(data % 60))
                break
            case 2:
                RTC_setReg(DS1307_REG_HOUR, DecToHex(data % 24))
                break
            case 3:
                RTC_setReg(DS1307_REG_DAY, DecToHex(data % 32))
                break
            case 4:
                RTC_setReg(DS1307_REG_MONTH, DecToHex(data % 13))
                break
            case 5:
                RTC_setReg(DS1307_REG_YEAR, DecToHex(data % 100))
                break
            default:
                break
        }
    }
    //% block="Read IIC RTC1307 value %data"
    //% subcategory="Sensor"
    //% group=RTC1307
    export function octopus_RTC_getTime(data: TimeType_state): number {
        switch (data) {
            case 0:
                return HexToDec(RTC_getReg(DS1307_REG_SECOND))
                break
            case 1:
                return HexToDec(RTC_getReg(DS1307_REG_MINUTE))
                break
            case 2:
                return HexToDec(RTC_getReg(DS1307_REG_HOUR))
                break
            case 3:
                return HexToDec(RTC_getReg(DS1307_REG_DAY))
                break
            case 4:
                return HexToDec(RTC_getReg(DS1307_REG_MONTH))
                break
            case 5:
                return (HexToDec(RTC_getReg(DS1307_REG_YEAR)) + 2000)
                break
            default:
                return 0
        }
    }
    //% block="weekday"
    //% subcategory="Sensor"
    //% group=RTC1307
    export function octopus_RTC_getWeekday(): number {
        // (d+2*m+3*(m+1)/5+y+y/4-y/100+y/400) mod 7
        let d = HexToDec(RTC_getReg(DS1307_REG_DAY))
        let m = HexToDec(RTC_getReg(DS1307_REG_MONTH))
        let y = (HexToDec(RTC_getReg(DS1307_REG_YEAR)) + 2000)
        if (m < 3) {
            y = y - 1
            m = m + 12
        }
        let w = d
            + 2 * m
            + Math.idiv(3 * (m + 1), 5)
            + y
            + Math.idiv(y, 4)
            - Math.idiv(y, 100)
            + Math.idiv(y, 400)
            + 1
        return w % 7
    }
    //% block="Photo Interrupter connects to %pin Status is %state"
    //% subcategory="Sensor"
    //% group=DigitalPin
    //% state.fieldEditor="gridpicker"
    //% state.fieldOptions.columns=2
    export function octopus_Photo_Interrupter(pin: DigitalPin, state: Photo_Sensor_state): boolean {
        let temp = pins.digitalReadPin(pin)
        if (temp == 1 && state == 0)
            return true;
        else if (temp == 0 && state == 1)
            return true;
        else {
            return false;
        }
    }
    //% block="Crash sensor connects to %pin Status is %state"
    //% subcategory="Sensor"
    //% group=DigitalPin
    //% state.fieldEditor="gridpicker"
    //% state.fieldOptions.columns=2
    export function octopus_Crash(pin: DigitalPin, state: Button_state): boolean {
        pins.setPull(pin, PinPullMode.PullUp)
        let temp = pins.digitalReadPin(pin)
        if (temp == 1 && state == 0)
            return true;
        else if (temp == 0 && state == 1)
            return true;
        else {
            return false;
        }
    }
    //% block="Vibration sensor connects to %pin Status is %state"
    //% subcategory="Sensor"
    //% group=DigitalPin
    //% state.fieldEditor="gridpicker"
    //% state.fieldOptions.columns=2
    export function octopus_Vibration(pin: DigitalPin, state: Vibration_Sensor_state): boolean {
        let temp = pins.digitalReadPin(pin)
        if (temp == 1 && state == 0)
            return true;
        else if (temp == 0 && state == 1)
            return true;
        else {
            return false;
        }
    }
    //% block="DHT11 sensor connects to %pin Set unit in %state"
    //% subcategory="Sensor"
    //% group=DigitalPin
    export function octopus_DHT11(pin: DigitalPin, state: DHT11_state): number {
        pins.digitalWritePin(pin, 0)
        basic.pause(18)
        let i = pins.digitalReadPin(pin)
        pins.setPull(pin, PinPullMode.PullUp);

        while (pins.digitalReadPin(pin) == 1);
        while (pins.digitalReadPin(pin) == 0);
        while (pins.digitalReadPin(pin) == 1);

        let value = 0;
        let counter = 0;
        let error = 0;

        for (let i = 0; i <= 32 - 1; i++) {
            while (pins.digitalReadPin(pin) == 0) {
                //check if the wait is too long, 1000 is arbituary
                counter++;
                if (counter == 1000) {
                    error = 1;
                }
            }
            counter = 0
            while (pins.digitalReadPin(pin) == 1) {
                counter += 1;
            }
            if (counter > 3) {
                value = value + (1 << (31 - i));
                //check if the wait is too long, 1000 is arbituary
                if (counter >= 1000) {
                    error = 2;
                }
            }
        }
        if (error == 1) {
            return 1001;
        }
        else if (error == 2) {
            return 1002;
        }
        else {
            switch (state) {
                case 0:
                    return (value & 0x0000ff00) >> 8
                    break;
                case 1:
                    return ((value & 0x0000ff00) >> 8) * 9 / 5 + 32
                    break;
                case 2:
                    return value >> 24
                    break;
                default:
                    return 0;
            }
        }

    }
	//% block="Read Rain/Steam sensor value (0~100) to %pin"
    //% subcategory="Sensor"
    //% group=AnalogPin
    export function octopus_Rain(pin: AnalogPin): number {
		let value = Math.map(pins.analogReadPin(pin), 0, 1023, 0, 100)
        return value
		
    }
	//% block="Read Soil Moisture sensor value (0~100) to %pin"
    //% subcategory="Sensor"
    //% group=AnalogPin
    export function octopus_Soil_Moisture(pin: AnalogPin): number {
        let value = Math.map(pins.analogReadPin(pin), 0, 1023, 0, 100)
        return value
    }
	//% block="Read Light Intensity value (0~100) to %pin"
	//% subcategory="Sensor"
    //% group=AnalogPin
    export function octopus_light_sensor(pin: AnalogPin): number {
        let voltage = 0;
        let lightintensity = 0;
        voltage = pins.map(
            pins.analogReadPin(pin),
            0,
            1023,
            0,
            100
        );
        lightintensity = voltage;
        return Math.round(lightintensity)
    }
	//% block="Read Noise sensor noise (dB) to %pin"
	//% subcategory="Sensor"
    //% group=AnalogPin
    export function octopus_ReadNoise(pin: AnalogPin): number {
        let level = 0
        let voltage = 0
        let noise = 0
        let h = 0
        let l = 0
        let sumh = 0
        let suml = 0
        for (let i = 0; i < 1000; i++) {
            level = level + pins.analogReadPin(pin)
        }
        level = level / 1000
        for (let i = 0; i < 1000; i++) {
            voltage = pins.analogReadPin(pin)
            if (voltage >= level) {
                h += 1
                sumh = sumh + voltage
            } else {
                l += 1
                suml = suml + voltage
            }
        }
        if (h == 0) {
            sumh = level
        } else {
            sumh = sumh / h
        }
        if (l == 0) {
            suml = level
        } else {
            suml = suml / l
        }
        noise = sumh - suml
        if (noise <= 4) {
            noise = pins.map(
                noise,
                0,
                4,
                30,
                50
            )
        } else if (noise <= 8) {
            noise = pins.map(
                noise,
                4,
                8,
                50,
                55
            )
        } else if (noise <= 14) {
            noise = pins.map(
                noise,
                9,
                14,
                55,
                60
            )
        } else if (noise <= 32) {
            noise = pins.map(
                noise,
                15,
                32,
                60,
                70
            )
        } else if (noise <= 60) {
            noise = pins.map(
                noise,
                33,
                60,
                70,
                75
            )
        } else if (noise <= 100) {
            noise = pins.map(
                noise,
                61,
                100,
                75,
                80
            )
        } else if (noise <= 150) {
            noise = pins.map(
                noise,
                101,
                150,
                80,
                85
            )
        } else if (noise <= 231) {
            noise = pins.map(
                noise,
                151,
                231,
                85,
                90
            )
        } else {
            noise = pins.map(
                noise,
                231,
                1023,
                90,
                120
            )
        }
        noise = Math.round(noise)
        return Math.round(noise)
    }
    //% block="PIR sensor connects to %pin Set object to %state"
    //% subcategory="Sensor"
    //% group=DigitalPin
    //% state.fieldEditor="gridpicker"
    //% state.fieldOptions.columns=2
    export function octopus_PIR(pin: DigitalPin, state: PIR_state): boolean {
        let temp = pins.digitalReadPin(pin)
        if (temp == 1 && state == 0)
            return true;
        else if (temp == 0 && state == 1)
            return true;
        else {
            return false;
        }
    }
	//% block="Read TMP36 sensor to %pin Set unit in %state"
	//% subcategory="Sensor"
    //% group=AnalogPin
	//% state.fieldEditor="gridpicker"
    //% state.fieldOptions.columns=2
    export function octopus_tmp36(pin: AnalogPin,state: tmp36_state): number {
        let voltage = 0;
        let Temperature = 0;
        voltage = pins.map(
            pins.analogReadPin(pin),
            0,
            1023,
            0,
            3100
        );
        Temperature = (voltage - 500) / 10;

        switch (state) {
            case 0:
                return Math.round(Temperature)
                break;
            case 1:
                return Math.round(Temperature * 9 / 5 + 32)
                break;
            default:
                return 0
        }
    }
	//% block="Read Wind sensor speed(m/s) to %pin"
	//% subcategory="Sensor"
    //% group=AnalogPin
    export function octopus_WindSpeed(pin: AnalogPin): number {
        let voltage = 0;
        let windspeed = 0;
        voltage = pins.map(
            pins.analogReadPin(pin),
            0,
            1023,
            0,
            3100
        );
        windspeed = voltage / 40;
        return Math.round(windspeed)
    }
	//% block="Read Dust sensor value to LED in %vLED out in %vo"
	//% subcategory="Sensor"
    //% group=DoublePin
    export function octopus_ReadDust(vLED: DigitalPin, vo: AnalogPin): number {
        let voltage = 0;
        let dust = 0;
        pins.digitalWritePin(vLED, 0);
        control.waitMicros(160);
        voltage = pins.analogReadPin(vo);
        control.waitMicros(100);
        pins.digitalWritePin(vLED, 1);
        voltage = pins.map(
            voltage,
            0,
            1023,
            0,
            3100 / 2 * 3
        );
        dust = (voltage - 380) * 5 / 29;
        if (dust < 0) {
            dust = 0
        }
        return Math.round(dust)

    }
	


    /***************************************************************************************************************************************/
}
