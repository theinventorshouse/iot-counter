# iot-counter

Proyecto desarrollado para probar las capcidades del modulo ESP8266 conectado a webSocket para contar con un sistema conectado a internet 24/7.
El contador manda la información en tiempo real a un servidor en internet el cual amacena e informa en tiempo real al cliente web.


**Video demo:** [youtu.be/WBVFUqo8ZCo](https://youtu.be/WBVFUqo8ZCo)

**Demo Web:** [dbug.mx:8000](http://dbug.mx:8000/)

![Web site ScreenShot](https://github.com/theinventorshouse/iot-counter/blob/master/doc/ScreenShot.png)

El sistema cunte con tres parter principales las cuales:

- Hardware: Conformado por el modulo ESP8266 y los sensores
- Servidor Web: Escrito en Node.js utilizando varias dependencias descritas en el archivo [package.json](https://github.com/theinventorshouse/iot-counter/blob/master/server-socket/package.json) en el direcotrio **server-socket**
- Cliente Web

## Instalación

```sh
$ git clone https://github.com/theinventorshouse/iot-counter.git
$ cd iot-counter
```

### Levantar Servidor local

```sh
$ cd server-socket
$ npm install
$ npm start
```

### Carga de firmware

Para cargar el firmware debes de abrir el proyecto **hardware-counter** que se encuentre en la carpeta del mismo nombre en tu Arduino IDE (con el plugin de ESP instalado)
**Importante:** Recuerda incluir los datos necesarios para hacer las pruebes en tu red (SSID, Password, IPServer)

### Configuracion por defecto

	Hardware Socket: PORT 3000
	Website: PORT 8000

## Costo
Costo de construcción aprox. (Precios en dolares):

- Modulo ESP8266 V.12 $9.95
- PCB $1.00
- 2x Sensor dr Ir + Ir Led $2.20

Costo de mantenimiento del servidor:
El servidor corre en una instancia micro de [digitalocean.com](https://www.digitalocean.com/?refcode=e43f79fbc45c) la cual soporta aporx 4000 Sockets.

- Digitalocean Micro $5.00 Dolares por mes.

## Autores:

- Andres Sabas [@sabas1080](https://github.com/sabas1080)
- Iddar Olivares [@iddar](https://github.com/iddar)

*Creado: Julio 2015*
