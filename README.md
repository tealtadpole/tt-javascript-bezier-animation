# Javascript Bezier animation library

Bezier animation library in Javascript. You can use this library to make any animation within a container with relative/absolute position.

You can view live example here:
https://web.tealtadpole.me/tt-javascript-bezier-animation/

## Blog article:
https://tealtadpole.me/index.php/2021/11/16/javascript-bezier-animation-library

## Usage:
1. Import the library/class
2. ```javascript ttBezier.add(options); ``` - add the animation into the library with configuration
3. ```javascript ttBezier.start(name); ``` - start the animation with name
4. ```javascript ttBezier.stop(name); ``` - stop the animation with name

## Options:
<table cellspacing=0>
    <thead>
        <tr>
            <th>option</th>
            <th>type</th>
            <th>description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>name</td>
            <td>string</td>
            <td>Animation name</td>
        </tr>
        <tr>
            <td>containerId</td>
            <td>string</td>
            <td>Animation container DOM id</td>
        </tr>
        <tr>
            <td>childId</td>
            <td>string</td>
            <td>Animated element DOM id</td>
        </tr>
        <tr>
            <td>childOrigin</td>
            <td>string</td>
            <td>Center animated element <a href="#childOrigin">origin</a></td>
        </tr>
        <tr>
            <td>degree</td>
            <td>number</td>
            <td>Bezier degree, starting from 1 (linear line)</td>
        </tr>
        <tr>
            <td>points</td>
            <td>Array [{x: __ , y: __ }]</td>
            <td>Array of points</td>
        </tr>
        <tr>
            <td>duration</td>
            <td>number (int milliseconds)</td>
            <td>Animation duration</td>
        </tr>
        <tr>
            <td>easing</td>
            <td>string</td>
            <td><a href="#easing">Easing type</a></td>
        </tr>
        <tr>
            <td>loop</td>
            <td>boolean</td>
            <td>Looped animation</td>
        </tr>
        <tr>
            <td>hideOnAnimatioNEnd</td>
            <td>boolean</td>
            <td>Hide the child when the animation ends (with <span class="code">display=none</span>)</td>
        </tr>
        <tr>
            <td>run</td>
            <td>boolean</td>
            <td>Run the animation immediately</td>
        </tr>
    </tbody>
</table>

## childOrigin list:
<p>Possible <span class="code">childOrigin</span> as follows:</p>
<ul>
    <li>top-left</li>
    <li>top</li>
    <li>top-right</li>
    <li>left</li>
    <li>center</li>
    <li>right</li>
    <li>bottom-left</li>
    <li>bottom</li>
    <li>bottom-right</li>
</ul>

## Easing
Taken from: https://easings.net/

<ul>
    <li>easeInSine</li>
    <li>easeOutSine</li>
    <li>easeInOutSine</li>
    <li>easeInQuad</li>
    <li>easeOutQuad</li>
    <li>easeInOutQuad</li>
    <li>easeInCubic</li>
    <li>easeOutCubic</li>
    <li>easeInOutCubic</li>
    <li>easeInQuart</li>
    <li>easeOutQuart</li>
    <li>easeInOutQuart</li>
    <li>easeInQuint</li>
    <li>easeOutQuint</li>
    <li>easeInOutQuint</li>
    <li>easeInExpo</li>
    <li>easeOutExpo</li>
    <li>easeInOutExpo</li>
    <li>easeInCirc</li>
    <li>easeOutCirc</li>
    <li>easeInOutCirc</li>
    <li>easeInBack</li>
    <li>easeOutBack</li>
    <li>easeInOutBack</li>
    <li>easeInElastic</li>
    <li>easeOutElastic</li>
    <li>easeInOutElastic</li>
    <li>easeInBounce</li>
    <li>easeOutBounce</li>
</ul>

## Bezier functions:
[de Casteljau's algorithm approach](https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm)

```javascript
static bezier(degree, points, t) {
    const newPoints = []
    for (let i=0; i &lt; degree; i++) {
        let newPoint = ttBezier.linearFunction(points[i].x, points[i+1].x, points[i].y, points[i+1].y, t)
        newPoints.push(newPoint)
    }
    if (newPoints.length === 1) {
        return newPoints[0]
    } else {
        return ttBezier.bezier(degree - 1, newPoints, t)
    }
}

static linearFunction(x1, x2, y1, y2, t) {
    let x = (1 - t) * x1 + t * x2
    let y = (1 - t) * y1 + t * y2
    return { x, y } 
}
```

-tt-