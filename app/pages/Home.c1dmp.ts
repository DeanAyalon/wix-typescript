// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

// Custom multi-tag selectors for TypeScript
const _w = <T = $w.Element>(selector: Selectors) => $w(selector as WixElementSelector) as T
type Selectors = '#box1, #box2'

$w.onReady(function () {
    // Write your JavaScript here

    // To select an element by ID use: $w('#elementID')

    // Click 'Preview' to run your code
});
