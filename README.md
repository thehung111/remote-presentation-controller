Remote Presentation Controller
==============================

Simple Remote Presentation Controller for Reveal.js using Node.js.
Presenter can use their mobile devices to control the slides via the controller web interface.

<img src="http://www.ngo-hung.com/files/images/RemotePresenter.png" />
[Blog Link](http://www.ngo-hung.com/blog/2012/07/16/remote-controller-for-reveal-js-presentation)

## Install

1) Install node.js

2) Run

node app.js

3) Preloaded with 2 sample presentations:

- [http://localhost:3000/demo](http://localhost:3000/demo) : Demo presentation from <http://lab.hakim.se/reveal-js>
- <http://localhost:3000/myppt>

Open another browser window to open the remote controller:

<http://localhost:3000/controller>

Users can issue up, down, left, right commands to navigate through the slides.

To remote control, just use the dropdown to select which presentation to control, then select one of the slides. 


## Note

- config/index.js: configure the list of presentations and its initial slides
- routes/index.js: server logic
- views/controller.ejs: controller client logic
- views/layout.ejs: most of the logic for a normal presentations 
- views/demo.ejs: actual html for 'Demo Presentation'
- views/myppt.ejs: html for 'My Presentation'



