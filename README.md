# Printer backend API

This is the backend for the printer project.

## Routing

This part explains how to use the applacition with HTTP REST API requests

#### <b>[POST] /api/printer/</b>
```
Checks if the printer is registered to the system
    - If it is registered, checks for the currently happening event and returns details about it.
    - If not registers to the system and sends back data about the registration.
Required parameters:
    id
    identifier
Returns: 
    Printer object including currently happening events array (should be max of len 1)
```

#### <b>[POST] /api/event/create/</b>
```
Creates an event in the database

Required parameters:
    title*
    startDate
    endDate
```

## Printer setup

The project uses Raspbian running on RPi 3 B+, Huawei E3372 Modem and Brother QL series printer connected via USB.

## Requirements

```
Python3.5+

brother_ql
qrcode[pil]
pillow 
websocket-client
```

The project requires [BROTHER_QL library](https://github.com/pklaus/brother_ql), websocket-client, qrcode[pil]and pillow libraries to be installed.\
Run the following command to install all the dependencies on RPi:

```
python3 -m pip install brother_ql qrcode[pil] pillow websocket-client
```

If used elsewhere simply use the default pip:

```
pip install brother_ql qrcode[pil] pillow websocket-client
```

## Installation
Clone the [Printer repository](https://github.com/rimvydaszilinskas/printer) to your RaspberryPi /home/pi/printer directory.

To do so cd into /home/pi directory and call the following command:
```
git clone https://github.com/rimvydaszilinskas/printer.git
```

## Startup on boot

To start app on bootup we use rc.local. To set it up edit file /etc/rc.local

```
sudo nano /etc/rc.local
```

And add the following line at the bottom of the file:

```
sudo python3 /home/pi/printer/main.py &
```

## Network setup

Currently uses wifi.

## Manual project setup

### Changing template

Simply upload an image in /home/pi/printer/templates folder and name it <b>test.png</b>. Currently the application is searching for the ./templates/test.png to print the ticket

### Setting up printer

Printer identifier has to be changed manually.

```
sudo nano /home/pi/printer/main.py
```

Find variable called <b>PRINTER_IDENTIFIER</b> and assign a new value to it.

```python
PRINTER_IDENTIFIER = "printer id"
```

Note: the id should be without slashes/spaces/dashes

### Connecting to event

For now the printer does not identify itself, therefore it needs to have 
some preset data hardcoded. Edit the main file to the requirements:

```
sudo nano /home/pi/printer/main.py
```

Find the field called <b>PROJECT_IDENTIFIER</b> and assign to the required event UUID.

```python
PROJECT_IDENTIFIER = "ceb26cac1fa2499cb782fbe26c6c72cf"
```

### Templating
To change the location and size the text go to the <b>main.py</b> file

```
sudo nano main.py
```

Find <b>text</b> tuple and change location to a tuple of (x,y) coordinates, underneath will be the <b>font_size</b> variable to change.

```python
text = (
    {
        "text":"full_name",
        "fill":(0, 0, 0),
        "location":(<x>, <y>),
        "font_size":<font-size>
    },
    {
        "text":"company_name",
        "fill":(0, 0, 0),
        "location":(<x>, <y>),
        "font_size":<font-size>
    }
)
```

<b>\<x\></b>, <b>\<y\></b> and <b>\<font-size\></b> has to be changed to integer numbers.

### Paper change

You will need to change paper and it might be not the right size as was set at first. There are 4 main parameters to check for <b>red</b> and <b>label</b>, <b>printer_identifier</b> and <b>printer</b>. If set wrong the printer will just blink red light and no warning will be shown on the app.

#### red

```
bool
default=True
```

Sets a flag that the image should be rendered in red, black and white. If the paper does not support red or vice versa the printer will just start blinking red light.

#### label

```
string
default="54"
```

Sets the size the image should be rendered, wrong label size will also end up blinking the red light on the printer.

#### printer_identifier

```
string
default="/dev/usb/lp0"
```

The device USB address. For most linux based systems it will be /dev/usb/lp0

#### printer

```
string
default="QL-810W"
```

It is just the model of the printer used.

