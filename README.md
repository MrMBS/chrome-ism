# Chrome ISM
Implementation Switch Management via chrome extension. NOTE: Only works on environments set up to use the new implementation switches API.

## Installation
Using Chrome, [click here](https://github.com/mindbody/chrome-ism/blob/master/chrome-ism.crx?raw=true) to download the extension, then navigate to the extensions pane (`chrome://extensions`) and drag and drop the `chrome-ism.crx` file onto the page.

## Usage
Toggle the implementation switch window either by clicking the icon or pressing `ctrl+i`. From here you can view all switches, see their state on your current tab, and toggle them on/off locally. 

### Caveat: Local Settings
Toggling switches on and off locally is accomplished using cookies. This has a known problem which is that these cookies won't be transferred to internal calls. So for example, if you're testing an ASP page which makes some calls behind the scenes (not through the browser) to a C# controller, these cookies won't be transferred and the switch will return to its non-overridden state. There are plans in the future to support forwarding these override settings through internal system barriers, but they are not currently implemented, so for now we'll just have to suffer through it.

Additionally, cookie overrides have no affect on production environments (preview/clients). Allowing them such control would be a security hole, so there are no plans to permit such behavior.

## Command Reference
A major goal of this extension is to have everything be accomplishable via keyboard commands (I hate mice), so here is a handy reference of all available shortcuts.

| Command            | Description                                   |
|:------------------ |:--------------------------------------------- |
| `ctrl+i`           | open the extension                            |
| `ctrl+f`           | search for a switch by name**                 |
| `ctrl+c`           | copy switch name to clipboard                 |
| `up/down`*         | navigate switch list                          |
| `right/left/enter`*| toggle switch on/off                          |
| `i`                | display switch info                           |
| `?`                | show/hide command reference                   |

\* vim navigation (h,j,k,l) can be substituted for the arrow keys (left,down,right,up).  
** you can also use regexes (`/example/i`) which will search the switch's name and description.

## Contributing
First, [fork this repo](https://github.com/mindbody/chrome-ism/fork) and [install node.js](http://nodejs.org/dist/v0.10.28/x64/node-v0.10.28-x64.msi).

```
npm install -g grunt-cli
npm install -g mocha

cd <location of cloned repo>
grunt
```

This will run the grunt watch task which will compile your .less ([LESS](http://lesscss.org/)) and .hbs ([handlebars](http://handlebarsjs.com/)) templates as well as lint your js code using [jshint](http://www.jshint.com/). So long as your code passes linting and all unit tests, feel free to push it up to your fork and submit a pull request and I'll make it a priority to spot check it and merge it in.

All new code should have accompanying unit tests, barring DOM / AJAX / glue logic.
