class ttBezier {
    static animations = []
    static add({
        name,
        containerId,
        childId,
        childOrigin='top-left',
        degree=3,
        points=[],
        duration=500,
        easing='',
        loop=true,
        hideOnAnimationEnd=false,
        run=false,
    }) {
        const exist = ttBezier.animations.find((animation) => animation.name === name)
        const container = document.getElementById(containerId)
        const child = document.getElementById(childId)
        child.style.position = 'absolute'
        if (exist || !container || !child || points.length <= degree ) {
            console.error('Init error, either duplicated name, or container/child don\'t exist!')
        } else {
            const containerSize = {
                width: container.clientHeight,
                height: container.clientWidth,
            }
            const childSize = {
                width: child.clientHeight,
                height: child.clientWidth,
            }
            const unNormalizedPoint = {x: points[0].x * containerSize.width, y: points[0].y * containerSize.height }
            const centeredPoint = ttBezier.updateOffset(unNormalizedPoint.x, unNormalizedPoint.y, childSize.width, childSize.height, childOrigin)
            child.style.left = centeredPoint.x
            child.style.bottom = centeredPoint.y
            console.log(child.style.left, child.style.bottom, name, points[0])
            ttBezier.animations.push({
                name,
                containerId,
                childId,
                container,
                containerSize,
                child,
                childSize,
                childOrigin,
                degree,
                points,
                duration,
                start: run ? performance.now() : null,
                easing,
                loop,
                hideOnAnimationEnd,
                run,
            })
            if (run) {
                ttBezier.animate = window.requestAnimationFrame(animate);
            }
        }
    }
    static animate = null
    static start(name) {
        ttBezier.animations.forEach(animation => {
            if (animation.name === name) {
                animation.run = true
                animation.child.style.display = 'block'
                animation.start = performance.now()
            }
        })
        console.log('star,t', name)
        ttBezier.animate = window.requestAnimationFrame(animate);
    }

    static stop(name = null) {
        if (name) {
            const stopThis = ttBezier.animations.find(animation => animation.name === name)
            if (stopThis) stopThis.run = false   
        } else {
            ttBezier.animate = null
        }
        window.cancelAnimationFrame(ttBezier.requestId);
    }
    static bezier(degree, points, t) {
        const newPoints = []
        for (let i=0; i<degree; i++) {
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
    static updateOffset(originalX, originalY, width, height, childOrigin) {
        let x = originalX
        let y = originalY
        switch (childOrigin) {
            case 'bottom-left':
                break;
            case 'bottom-right':
                x -= width
                break;
            case 'top-left':
                y -= height
                break;
            case 'top-right':
                x -= width
                y -= height
                break;
            case 'top':
                x -= (width/2)
                y -= height
                break;
            case 'left':
                y -= (height/2)
                break;
            case 'right':
                x -= width
                y -= (height/2)
                break;
            case 'bottom':
                x -= (width/2)
                break;
            case 'center':
                x -= (width/2)
                y -= (height/2)
                break;
        }
        return { x, y }
    }
    static easing(t, easingMethod) {
        let easedT = t
        const { PI, sin, cos, pow, sqrt } = Math
        const c1 = 1.70158;
        const c2 = c1 * 1.525;
        const c3 = c1 + 1;
        const c4 = (2 * PI) / 3;
        const c5 = (2 * PI) / 4.5;
        const n1 = 7.5625;
        const d1 = 2.75;
        switch (easingMethod.toLowerCase()) {
            case 'easeinsine':
                easedT = 1 - cos((t * PI) / 2);
                break;
            case 'easeoutsine':
                easedT = sin((t * PI) / 2);
                break;
            case 'easeinoutsine':
                easedT = -(cos(PI * t) - 1) / 2;
                break;
            case 'easeinquad':
                easetT = t * t;
                break;
            case 'easeoutquad':
                easedT = 1 - (1 - t) * (1 - t);
                break;
            case 'easeinoutquad':
                easedT = t < 0.5 ? 2 * t * t : 1 - pow(-2 * t + 2, 2) / 2;
                break;
            case 'easeincubic':
                easedT = t * t * t;
                break;
            case 'easeoutcubic':
                easedT = 1 - pow(1 - t, 3);
                break;
            case 'easeinoutcubic':
                easedT = t < 0.5 ? 4 * t * t * t : 1 - pow(-2 * t + 2, 3) / 2;
                break;
            case 'easeinquart':
                easedT = t * t * t * t;
                break;
            case 'easeoutquart':
                easedT = 1 - pow(1 - t, 4);
                break;
            case 'easeinoutquart':
                easedT = t < 0.5 ? 8 * t * t * t * t : 1 - pow(-2 * t + 2, 4) / 2;
                break;
            case 'easeinquint':
                easedT =  t * t * t * t * t;
                break;
            case 'easeoutquint':
                easedT =  1 - pow(1 - t, 5);
                break;
            case 'easeinoutquint':
                easedT = t < 0.5 ? 16 * t * t * t * t * t : 1 - pow(-2 * t + 2, 5) / 2;
                break;
            case 'easeinexpo':
                easedT = t === 0 ? 0 : pow(2, 10 * t - 10);
                break;
            case 'easeoutexpo':
                easedT = t === 1 ? 1 : 1 - pow(2, -10 * t);
                break;
            case 'easeinoutexpo':
                easedT = t === 0
                ? 0
                : t === 1
                ? 1
                : t < 0.5 ? pow(2, 20 * t - 10) / 2
                : (2 - pow(2, -20 * t + 10)) / 2;
                break;
            case 'easeincirc':
                easedT = 1 - sqrt(1 - pow(t, 2));
                break;
            case 'easeoutcirc':
                easedT = sqrt(1 - pow(t - 1, 2));
                break;
            case 'easeinoutcirc':
                easedT = t < 0.5
                ? (1 - sqrt(1 - pow(2 * t, 2))) / 2
                : (sqrt(1 - pow(-2 * t + 2, 2)) + 1) / 2;
                break;
            case 'easeinback':
                easedT = c3 * t * t * t - c1 * t * t;
                break;
            case 'easeoutback':
                easedT = 1 + c3 * pow(t - 1, 3) + c1 * pow(t - 1, 2);
                break;
            case 'easeinoutback':
                easedT = t < 0.5
                ? (pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
                : (pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
                break;
            case 'easeinelastic':
                easedT = t === 0
                ? 0
                : t === 1
                ? 1
                : -pow(2, 10 * t - 10) * sin((t * 10 - 10.75) * c4);
                break;
            case 'easeoutelastic':
                easedT = t === 0
                ? 0
                : t === 1
                ? 1
                : pow(2, -10 * t) * sin((t * 10 - 0.75) * c4) + 1;
                break;
            case 'easeinoutelastic':
                
                easedT = t === 0
                ? 0
                : t === 1
                ? 1
                : t < 0.5
                ? -(pow(2, 20 * t - 10) * sin((20 * t - 11.125) * c5)) / 2
                : (pow(2, -20 * t + 10) * sin((20 * t - 11.125) * c5)) / 2 + 1;
                break;
            case 'easeinbounce':
                const t2 = 1 - t
                let t3 = null
                if (t2 < 1 / d1) {
                    t3 = n1 * t2 * t2;
                } else if (t2 < 2 / d1) {
                    t3 = n1 * (t2 -= 1.5 / d1) * t2 + 0.75;
                } else if (t < 2.5 / d1) {
                    t3 = n1 * (t2 -= 2.25 / d1) * t2 + 0.9375;
                } else {
                    t3 = n1 * (t2 -= 2.625 / d1) * t2 + 0.984375;
                }
                easedT = 1 - t3
                break;
            case 'easeoutbounce':
                if (t < 1 / d1) {
                    easedT = n1 * t * t;
                } else if (t < 2 / d1) {
                    easedT = n1 * (t -= 1.5 / d1) * t + 0.75;
                } else if (t < 2.5 / d1) {
                    easedT = n1 * (t -= 2.25 / d1) * t + 0.9375;
                } else {
                    easedT = n1 * (t -= 2.625 / d1) * t + 0.984375;
                }
                break;
        }
        return easedT
    }
}

function animate(timestamp) {
    if (ttBezier.animate) {
        ttBezier.animations.forEach(animation => {
            if (animation.run) {
                let t = (timestamp - animation.start) / animation.duration
                if (t >= 1) {
                    if (animation.loop) {
                        animation.start = performance.now()
                        t = 0
                    } else {
                        animation.run = false
                        if (animation.hideOnAnimationEnd) {
                            animation.child.style.display = 'none'
                        } else {
                            t = 1
                        }
                    }
                }
                t = ttBezier.easing(t, animation.easing)
                
                 
                if (animation.run || t === 1) {
                    // double check to optimize performance
                    // also redraw last position if needed
                    const point = ttBezier.bezier(animation.degree, animation.points, t)
                    const unNormalizedPoint = {x: point?.x * animation.containerSize.width, y: point?.y * animation.containerSize.height }
                    const centeredPoint = ttBezier.updateOffset(unNormalizedPoint.x, unNormalizedPoint.y, animation.childSize.width, animation.childSize.height, animation.childOrigin)
                    animation.child.style.left =  centeredPoint.x
                    animation.child.style.bottom =  centeredPoint.y
                }
            }
        })
        requestAnimationFrame(animate);
    }
}
