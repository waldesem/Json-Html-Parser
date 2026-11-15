# Json-Html-Parser

Json-Html-Parser is a Vue-based web application and Chromium extension that converts JSON data to HTML.

## Installation

1. Clone the repository

```bash
git clone https://github.com/waldesem/Json-Html-Parser.git
```

2. Install dependencies

```bash
cd Json-Html-Parser
bun i
```

## Build the extension

1. Build the project

```bash
npm run build
```

2. Open `chrome://extensions`, enable **Developer mode** and click **Load unpacked**, selecting the `dist` folder

Clicking the extension icon opens a popup with the **Открыть приложение** button. The button opens the main page (`index.html`) in a new tab.

## License

Json-Html-Parser is licensed under the MIT License.
