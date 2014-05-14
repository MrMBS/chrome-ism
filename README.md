# Chrome ISM (BETA)
Implementation Switch Management via chrome extension. NOTE: In beta. Will not interact with usable data until the settings API is released to production.

## Installation
Using Chrome, [click here](https://github.com/mindbody/chrome-ism/blob/master/chrome-ism.crx?raw=true) to download the extension, then navigate to the extensions pane (`chrome://extensions`) and drag and drop the `chrome-ism.crx` file onto the page.

## Usage
Toggle the implementation switch window either by clicking the icon or pressing `ctrl+i`. From here you can view all switches, see their state on your current tab, and toggle them on/off locally. 

### Caveat: Local Settings
Toggling switches on and off locally is accomplished using cookies. This has a known problem which is that these cookies won't be transfered to internal calls. So for example, if you're testing an ASP page which makes some calls behind the scenes (not through the browser) to a C# controller, these cookies won't be transfered and the switch will return to its non-overridden state. There are plans in the future to support forwarding these override settings through internal system barriers, but they are not currently implemented, so for now we'll just have to suffer through it.

Additionally, cookie overrides have no affect on production environments (preview/clients). Allowing them such control would be a security hole, so there are no plans to allow such behavior.